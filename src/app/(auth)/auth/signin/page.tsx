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
import { signInFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (val: z.infer<typeof signInFormSchema>) => {
    const authenticated = await signIn("credentials", {
      ...val,
      redirect: false,
    });

    if (authenticated?.error) {
      toast({
        title: "Error",
        description: "Email or Password is wrong",
      });
      return;
    }

    await router.push("/");
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="border border-border p-5">
          <h1 className="font-semibold text-center text-2xl mb-2">
            Login to your account
          </h1>
          <p className="text-sm text-gray-500">
            Enter your email to access dashboard
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 space-y-5"
            >
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

              <Button className="w-full">Sign In</Button>

              <p className="text-sm">
                Don&apos;t have an account? {""}
                <Link href="/auth/signup" className="text-primary">
                  Sign Up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
