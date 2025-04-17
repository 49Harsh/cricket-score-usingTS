import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";

interface CustomRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      if (req.path === "/me") {
        res.status(401).json({ message: "Authentication required" });
        return;
      }
      next();
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.userId = decoded.userId;
      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      if (err instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Token expired" });
      } else if (err instanceof jwt.JsonWebTokenError) {
        if (req.path === "/me") {
          res.status(401).json({ message: "Invalid token" });
        } else {
          next();
        }
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
