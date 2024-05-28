"use client";

import React, { useState } from "react";
import { Employee } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "./ui/checkbox";

const EditEmployeeForm = ({
  employee,
  companyName,
}: {
  employee: Employee;
  companyName: string;
}) => {
  const router = useRouter();

  const [isForeigner, setIsForeigner] = useState<boolean>(true);
  const [isPR, setIsPR] = useState<boolean>(false);
  const [isResignedSelected, setIsResignedSelected] = useState<boolean>(false);

  const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Field cannot be empty" }),
    NRIC: z.string().trim().min(1, { message: "Field cannot be empty" }),
    dob: z.string().date(),
    nationality: z.enum(["SC", "PR", "Foreigner"]),
    citizenshipStatus: z
      .enum(["SCPR3", "SCPR1", "SCPR2", "Foreigner"])
      .optional(),
    designation: z.string().trim().min(1, { message: "Field cannot be empty" }),
    ordinaryWage: z.coerce.number().min(0),
    additionalWage: z.coerce.number().min(0),
    allowance: z.coerce.number().min(0),
    otPay: z.coerce.number().min(0),
    otHours: z.coerce.number().min(0),
    modeOfPayment: z.enum(["Cheque", "Cash", "BankDeposit"]),
    typeOfContribution: z.enum(["FG", "GG", "Foreigner"]).optional(),
    joinDate: z.string().date(),
    isResgined: z.boolean(),
    resignDate: z.string().date().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: employee?.name || "",
      NRIC: employee?.NRIC || "",
      dob: employee.dob
        ? new Date(employee.dob).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10),
      nationality: employee?.nationality || "Foreigner",
      citizenshipStatus: employee?.citizenshipStatus || "Foreigner",
      designation: employee?.designation || "",
      ordinaryWage: employee?.ordinaryWage || 0,
      additionalWage: employee?.additionalWage || 0,
      allowance: employee?.allowance || 0,
      otPay: employee?.otPay || 0,
      otHours: employee?.otHours || 0,
      modeOfPayment: employee.modeOfPayment || "BankDeposit",
      typeOfContribution: employee?.typeOfContributionRate || "Foreigner",
      joinDate: employee.joinDate
        ? new Date(employee.joinDate).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10),
      isResgined: employee?.isResigned || false,
      resignDate: employee.resignDate
        ? new Date(employee.resignDate).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dob = new Date(values.dob);
    const joinDate = new Date(values.joinDate);
    let resignDate;
    if (values?.resignDate) {
      resignDate = new Date(values?.resignDate);
    } else {
      resignDate = new Date();
    }

    const updatedEmployee: Employee = {
      name: values.name,
      dob: dob,
      NRIC: values.NRIC,
      nationality: values.nationality,
      citizenshipStatus: values.citizenshipStatus || "Foreigner",
      companyName: companyName,
      designation: values.designation,
      ordinaryWage: values.ordinaryWage,
      additionalWage: values.additionalWage,
      allowance: values.allowance,
      otPay: values.otPay,
      otHours: values.otHours,
      modeOfPayment: values.modeOfPayment,
      typeOfContributionRate: values.typeOfContribution || "Foreigner",
      joinDate: joinDate,
      isResigned: values.isResgined,
      resignDate: resignDate,
    };

    try {
      const res = await fetch(`/api/employees/${employee.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (res.ok) {
        console.log("Created Employee");
        router.push(`/dashboard/employees`);
      } else {
        const errorMessage = await res.text();
        alert(errorMessage);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleCancel() {
    router.push(`/dashboard/employees`);
  }

  return (
    <div className="p-6 flex flex-col items-center gap-6 bg-slate-50 rounded-md max-w-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex gap-6"
        >
          <div className="flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold text-[16px]">Name</Label>
                      <Input {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="NRIC"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold text-[16px]">NRIC</Label>
                      <Input {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold text-[16px]">
                        Date of Birth
                      </Label>
                      <Input {...field} type="date" value={field.value} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setIsForeigner(value == "Foreigner");
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <Label className="font-bold text-[16px]">
                        Nationality
                      </Label>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SC" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Singapore Citizen
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="PR" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Permanent Resident
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Foreigner" />
                        </FormControl>
                        <FormLabel className="font-normal">Foreigner</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isForeigner && (
              <FormField
                control={form.control}
                name="citizenshipStatus"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setIsPR(value != "SCPR3");
                        }}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <Label className="font-bold text-[16px]">
                          Citizenship Status
                        </Label>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SCPR3" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Singapore Citizen/3rd Permanent Resident
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SCPR1" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            1st Permanent Resident
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SCPR2" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            2nd Permanent Resident
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!isForeigner && isPR && (
              <FormField
                control={form.control}
                name="typeOfContribution"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <Label className="font-bold text-[16px]">
                          Type of Contribution
                        </Label>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="FG" />
                          </FormControl>
                          <FormLabel className="font-normal">FG</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="GG" />
                          </FormControl>
                          <FormLabel className="font-normal">GG</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="modeOfPayment"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <Label className="font-bold text-[16px]">
                        Mode of Payment
                      </Label>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Cheque" />
                        </FormControl>
                        <FormLabel className="font-normal">Cheque</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Cash" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="BankDeposit" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Bank Deposit
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-1">
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold text-[16px]">
                        Designation
                      </Label>
                      <Input {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex-col gap-4 md:flex-row md:gap-4 md:flex">
              <FormField
                control={form.control}
                name="ordinaryWage"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold text-[16px]">
                          Basic Pay
                        </Label>
                        <Input {...field} type="number" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalWage"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold text-[16px]">
                          Additional Pay
                        </Label>
                        <Input {...field} type="number" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allowance"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold text-[16px]">
                          Allowance
                        </Label>
                        <Input {...field} type="number" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="otPay"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold text-[16px]">
                        Overtime Pay
                      </Label>
                      <Input {...field} type="number" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otHours"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold text-[16px]">
                        Overtime Hours
                      </Label>
                      <Input {...field} type="number" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="joinDate"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold text-[16px]">Join Date</Label>
                      <Input {...field} type="date" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isResgined"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div className="flex gap-4 items-center">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value: boolean) => {
                          field.onChange(value);
                          setIsResignedSelected(value);
                        }}
                      />
                      <Label className="font-bold text-[16px]">
                        Employee Resigned
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isResignedSelected && (
              <FormField
                control={form.control}
                name="resignDate"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Label className="font-bold text-[16px]">
                          Resign Date
                        </Label>
                        <Input {...field} type="date" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex flex-col">
              <Button className="mt-4" variant="default" type="submit">
                Submit
              </Button>
              <Button
                className="mt-4"
                variant="destructive"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditEmployeeForm;
