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
import { loginFormValidator, loginInputs } from "../validators";
import { useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, Lock, Users } from "lucide-react";

interface LoginFormProps extends ComponentProps<"form"> {
  tenantLoginFormAction: (data: Omit<loginInputs, "role">) => void;
  managerLoginFormAction: (data: Omit<loginInputs, "role">) => void;
}

export function LoginForm({
  className,
  tenantLoginFormAction,
  managerLoginFormAction,
  ...props
}: LoginFormProps) {
  const form = useForm<loginInputs>({
    resolver: zodResolver(loginFormValidator),
    defaultValues: {
      email: "",
      password: "",
      role: "TENANT",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: loginInputs) => {
    const { role, ...credentials } = data;

    startTransition(() => {
      role === "TENANT"
        ? tenantLoginFormAction(credentials)
        : managerLoginFormAction(credentials);
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
                The email address you used to register
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
                    placeholder="Enter your password"
                    type="password"
                    className="pl-10 h-11"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                Your account password
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
                        Access tenant features
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
                        Access manager features
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription className="text-xs">
                Select the account type you registered with
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
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
