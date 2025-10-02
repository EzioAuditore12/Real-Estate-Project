import { H1, P } from "@/components/ui/typography";
import { loginManager } from "./actions/login-manager.action";
import { loginTenant } from "./actions/login-tenant.action";
import { LoginForm } from "./components/form";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <H1 className="text-3xl font-bold tracking-tight">Welcome back</H1>
          <P className="text-muted-foreground">
            Sign in to your account to continue
          </P>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <LoginForm
              tenantLoginFormAction={loginTenant}
              managerLoginFormAction={loginManager}
            />
          </CardContent>
        </Card>

        <div className="text-center">
          <P className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              Sign up here
            </Link>
          </P>
        </div>
      </div>
    </div>
  );
}
