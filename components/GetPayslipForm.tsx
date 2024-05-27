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
import { Payslip } from "@/types";

const GetPayslipForm = () => {
  const router = useRouter();
  const formSchema = z.object({
    monthYear: z.string().refine((val) => /^\d{4}-(0[1-9]|1[0-2])$/.test(val), {
      message: "Invalid month and year format",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      monthYear: new Date().toISOString().substring(0, 7),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push(`/dashboard/payslips/date/${values.monthYear}`);
  }

  return (
    <div className="p-10 flex flex-col items-center gap-6 bg-slate-50 rounded-md min-w-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="monthYear"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold text-[16px]">
                      Choose Month & Year
                    </Label>
                    <Input {...field} type="month" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col">
            <Button className="mt-4" variant="default" type="submit">
              View Payslips
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GetPayslipForm;
