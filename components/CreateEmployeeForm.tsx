"use client";
import React, { useState } from "react";
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

const CreateEmployeeForm = ({
  setIsFormVisible,
}: {
  setIsFormVisible: (isFormVisible: boolean) => void;
}) => {
  const router = useRouter();
  const [isForeigner, setIsForeigner] = useState<boolean>(true);
  const [isResignedSelected, setIsResignedSelected] = useState<boolean>(false);

  const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Field cannot be empty" }),
    NRIC: z.string().trim().min(1, { message: "Field cannot be empty" }),
    dob: z.string().date(),
    nationality: z.enum(["SC", "PR", "Foreigner"]),
    citizenshipStatus: z.enum(["sc/pr3", "pr1", "pr2"]).optional(),
    designation: z.string().trim().min(1, { message: "Field cannot be empty" }),
    basicPay: z.coerce.number().min(0),
    additionalPay: z.coerce.number().min(0),
    allowance: z.coerce.number().min(0),
    otPay: z.coerce.number().min(0).default(0),
    otHours: z.coerce.number().min(0).default(0),
    modeOfPayment: z.enum(["Cheque", "Cash", "BankDeposit"]),
    typeOfContribution: z.enum(["FF", "FG", "GG"]).optional(),
    joinDate: z.string().date(),
    isResgined: z.boolean().default(false),
    resignDate: z.string().date().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsFormVisible(false);
  }

  return (
    <div className="p-6 flex flex-col items-center gap-6 bg-slate-50 rounded-md w-4/5">
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
                      <Input {...field} type="date" />
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
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <Label className="font-bold text-[16px]">
                          Citizenship Status
                        </Label>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sc/pr3" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Singapore Citizen/3rd Permanent Resident
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="pr1" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            1st Permanent Resident
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="pr2" />
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

            {!isForeigner && (
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
                            <RadioGroupItem value="FF" />
                          </FormControl>
                          <FormLabel className="font-normal">FF</FormLabel>
                        </FormItem>

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

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="basicPay"
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
                name="additionalPay"
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
                onClick={() => setIsFormVisible(false)}
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

export default CreateEmployeeForm;
