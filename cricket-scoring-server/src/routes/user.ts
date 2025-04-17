import express, { Request, Response } from "express";
import { signinSchema, signupSchema } from "../types";
import authMiddleware from "../middleware";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('JWT_SECRET environment variable is not set');
  process.exit(1);
}

// extended Request interface to include `userId` from authMiddleware
interface AuthenticatedRequest extends Request {
  userId?: string;
}

router.get(
  "/me",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await User.findById(req.userId, "firstName");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json({ name: user.firstName });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ message: result.error.errors[0].message });
      return;
    }

    const existingUser = await User.findOne(
      { username: req.body.username },
      "_id"
    );

    if (existingUser) {
      res.status(409).json({ message: "username already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      username: req.body.username,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "5h",
    });

    res.json({ message: "User signed up successfully!", token });
  } catch (error) {
    console.error('Signup error:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    // Check if JWT_SECRET is set
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ message: result.error.errors[0].message });
      return;
    }

    const user = await User.findOne({ username: req.body.username });
    
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "5h",
    });

    res.json({ message: "User signed in successfully!", token });
  } catch (error) {
    console.error('Signin error:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

export default router;
