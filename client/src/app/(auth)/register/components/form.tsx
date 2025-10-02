"use client";

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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerationFormValidator,
  type registerFromInputs,
} from "../validators";
import { useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Mail, Lock, Users } from "lucide-react";

interface RegisterFormProps extends ComponentProps<"form"> {
  registerTenantFormAction: (data: Omit<registerFromInputs, "role">) => void;
  registerManagerFormAction: (data: Omit<registerFromInputs, "role">) => void;
}

export function RegisterForm({
  className,
  registerManagerFormAction,
  registerTenantFormAction,
  ...props
}: RegisterFormProps) {
  const form = useForm<registerFromInputs>({
    resolver: zodResolver(registerationFormValidator),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "TENANT",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: registerFromInputs) => {
    const { role, ...credentials } = data;

    startTransition(() => {
      role === "TENANT"
        ? registerTenantFormAction(credentials)
        : registerManagerFormAction(credentials);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Enter your full name"
                    className="pl-10 h-11"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                This will be displayed as your public name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    className="pl-10 h-11"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                We'll use this to send you important updates
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Create a strong password"
                    type="password"
                    className="pl-10 h-11"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                Must be 8-16 characters with uppercase, lowercase, number, and
                symbol
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <FormLabel className="text-sm font-medium">
                  Account Type
                </FormLabel>
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <FormControl>
                      <RadioGroupItem value="TENANT" />
                    </FormControl>
                    <div className="grid gap-1.5">
                      <FormLabel className="font-normal cursor-pointer">
                        Tenant
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Looking for properties
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <FormControl>
                      <RadioGroupItem value="MANAGER" />
                    </FormControl>
                    <div className="grid gap-1.5">
                      <FormLabel className="font-normal cursor-pointer">
                        Manager
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Managing properties
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription className="text-xs">
                This determines what features you'll have access to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-11 text-sm font-medium"
          disabled={isPending}
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
