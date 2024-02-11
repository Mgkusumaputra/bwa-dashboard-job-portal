"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function SignUp() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (val: z.infer<typeof signUpFormSchema>) => {
    try {
      await fetch("/api/company/new-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });

      await router.push("/auth/signin");
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again",
      });

      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="border border-border p-5">
          <h1 className="font-semibold text-center text-2xl mb-2">
            Create new account
          </h1>
          <p className="text-sm text-gray-500">
            Enter your data to create new account
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="Enter your name..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="Enter your email..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <div className="absolute top-1/2 transform -translate-y-1/2 right-1 flex cursor-pointer items-center pr-3 text-gray-400">
                          {showPassword ? (
                            <FaRegEye
                              className="h-4 w-4"
                              onClick={togglePasswordVisibility}
                            />
                          ) : (
                            <FaRegEyeSlash
                              className="h-4 w-4"
                              onClick={togglePasswordVisibility}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full">Sign Up</Button>

              <p className="text-sm">
                Already have an account? {""}
                <Link href="/auth/signin" className="text-primary">
                  Sign In
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
