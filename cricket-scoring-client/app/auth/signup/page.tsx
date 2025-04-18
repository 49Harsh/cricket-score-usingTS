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
import { User, Mail, Lock, AlertCircle, ChevronRight, UserPlus } from "lucide-react";

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
        staggerChildren: 0.15
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2.5s" }}></div>
      </div>
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4 relative z-10"
      >
        <Card className="shadow-2xl border-0 overflow-hidden bg-white/80 backdrop-blur-md rounded-3xl">
          <CardHeader className="text-center relative bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="text-3xl font-bold mb-2">Create Account</CardTitle>
              <CardDescription className="text-teal-50 text-lg">Join our community today</CardDescription>
            </motion.div>
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
              <motion.div 
                className="h-14 w-14 rounded-2xl rotate-12 bg-white shadow-lg flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
              >
                <UserPlus className="h-7 w-7 text-teal-600" />
              </motion.div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-5 pt-12 px-8">
            <Form {...form}>
              <motion.form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex gap-4">
                  <motion.div variants={itemVariants} className="flex-1">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm uppercase tracking-wide font-medium">First Name</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-teal-500 transition-colors duration-300" />
                              <Input 
                                placeholder="John"
                                {...field} 
                                className="pl-10 py-6 rounded-xl bg-white/90 border-gray-200 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 shadow-sm transition-all group-hover:shadow-md" 
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500 flex items-center gap-1 text-sm mt-1">
                            {form.formState.errors.firstName && (
                              <AlertCircle className="h-3 w-3" />
                            )}
                            <span>{form.formState.errors.firstName?.message}</span>
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex-1">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm uppercase tracking-wide font-medium">Last Name</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-teal-500 transition-colors duration-300" />
                              <Input 
                                placeholder="Doe"
                                {...field} 
                                className="pl-10 py-6 rounded-xl bg-white/90 border-gray-200 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 shadow-sm transition-all group-hover:shadow-md" 
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500 flex items-center gap-1 text-sm mt-1">
                            {form.formState.errors.lastName && (
                              <AlertCircle className="h-3 w-3" />
                            )}
                            <span>{form.formState.errors.lastName?.message}</span>
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm uppercase tracking-wide font-medium">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-teal-500 transition-colors duration-300" />
                            <Input
                              type="email"
                              placeholder="johndoe@gmail.com"
                              {...field}
                              className="pl-10 py-6 rounded-xl bg-white/90 border-gray-200 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 shadow-sm transition-all group-hover:shadow-md"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 flex items-center gap-1 text-sm mt-1">
                          {form.formState.errors.username && (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          <span>{form.formState.errors.username?.message}</span>
                        </FormMessage>
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
                        <FormLabel className="text-gray-700 text-sm uppercase tracking-wide font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-hover:text-teal-500 transition-colors duration-300" />
                            <Input 
                              type="password" 
                              placeholder="••••••" 
                              {...field} 
                              className="pl-10 py-6 rounded-xl bg-white/90 border-gray-200 focus:border-teal-400 focus:ring focus:ring-teal-200 focus:ring-opacity-50 shadow-sm transition-all group-hover:shadow-md" 
                            />
                          </div>
                        </FormControl>
                        <div className="flex items-center gap-1 mt-1.5">
                          <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                          <FormDescription className="text-xs text-gray-500">
                            Password must be 6-20 characters long
                          </FormDescription>
                        </div>
                        <FormMessage className="text-red-500 flex items-center gap-1 text-sm mt-1">
                          {form.formState.errors.password && (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          <span>{form.formState.errors.password?.message}</span>
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="pt-2"
                >
                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 flex items-center justify-center gap-2 overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Create Account</span>
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="relative flex py-2 mt-2">
                  <div className="flex-grow border-t border-gray-200 my-auto"></div>
                  <span className="flex-shrink mx-4 text-gray-400 text-sm">Or continue with</span>
                  <div className="flex-grow border-t border-gray-200 my-auto"></div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex gap-3"
                >
                  <Button variant="outline" className="flex-1 py-5 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all group">
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="flex-1 py-5 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all group">
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="#1877F2" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="flex-1 py-5 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all group">
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#000000" />
                    </svg>
                  </Button>
                </motion.div>
              </motion.form>
            </Form>

            {errorMessage.message && (
              <motion.div 
                className="text-red-600 font-medium text-center p-4 bg-red-50 rounded-xl border border-red-100 shadow-sm flex items-center gap-2 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle className="h-4 w-4" />
                {errorMessage.message}
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center pb-8 px-8">
            <motion.p 
              className="text-gray-500 text-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span>Already have an account?</span>
              <Button 
                variant="link" 
                asChild 
                className="ml-1.5 font-semibold text-teal-600 hover:text-teal-700 p-0 h-auto"
              >
                <Link href="/auth/signin">
                  Sign in
                </Link>
              </Button>
            </motion.p>
          </CardFooter>
        </Card>
        
        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-emerald-200/30 to-transparent z-0" />
      </motion.div>
    </div>
  );
}