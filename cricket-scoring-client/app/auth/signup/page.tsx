"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { apiClient } from "@/utils/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name cannot be empty.")
    .max(30, "First name cannot exceed 30 characters."),
  lastName: z.string().max(30, "Last name cannot exceed 30 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password cannot exceed 20 characters."),
  username: z.string().email("Invalid email address.").min(5).max(50),
});

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState({ message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
  });

  // Define submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      setErrorMessage({ message: "" });
      const { firstName, lastName, username, password } = values;
      const response = await apiClient.post("/user/signup", {
        firstName,
        lastName,
        username,
        password,
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      } else {
        throw new Error("Token not received");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          setErrorMessage({ message: error.response.data.message });
        } else {
          setErrorMessage({ message: "An error occurred while registering" });
        }
      } else {
        console.error("Unexpected error:", error);
        setErrorMessage({ message: "An unexpected error occurred" });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    apiClient
      .get("/user/me")
      .then(() => router.push("/"))
      .catch(() => {
        localStorage.removeItem("token");
        setLoading(false);
      });
  }, [router]);

  if (loading) return <Loader />;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <Card className="shadow-xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="text-3xl font-bold mb-2">Join Us</CardTitle>
              <CardDescription className="text-indigo-100 text-lg">Begin your journey today</CardDescription>
            </motion.div>
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
              <motion.div 
                className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-10 px-8">
            <Form {...form}>
              <motion.form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John" 
                            {...field} 
                            className="h-12 rounded-lg border-gray-300 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Doe" 
                            {...field} 
                            className="h-12 rounded-lg border-gray-300 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="johndoe@gmail.com"
                            {...field}
                            className="h-12 rounded-lg border-gray-300 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••" 
                            {...field} 
                            className="h-12 rounded-lg border-gray-300 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200" 
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Password must be at least 6 characters long.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full h-12 mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </Form>

            {errorMessage.message && (
              <motion.div 
                className="text-red-500 font-medium text-center p-3 bg-red-50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {errorMessage.message}
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center pb-8 px-8">
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Already have an account?{" "}
              <Link 
                href="/auth/signin" 
                className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Sign in here
              </Link>
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}