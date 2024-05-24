"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";

const LoginForm = ({
  setIsSignup,
}: {
  setIsSignup: (isSignup: boolean) => void;
}) => {
  const router = useRouter();
  const formSchema = z.object({
    username: z.string().trim().min(1, { message: "Field cannot be empty" }),
    password: z.string().min(1, { message: "Field cannot be empty" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("Login Successful");
    router.push("/dashboard");
  }

  return (
    <div className="p-10 flex flex-col items-center gap-6 bg-slate-50 rounded-md min-w-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold text-[16px]">Username</Label>
                    <Input placeholder="Enter username..." {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold text-[16px]">Password</Label>
                    <Input
                      placeholder="Enter password..."
                      {...field}
                      type="password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col">
            <Button className="mt-4" variant="default" type="submit">
              Login
            </Button>
            <Button
              className="mt-4"
              variant="link"
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
