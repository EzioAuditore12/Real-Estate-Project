import { H1, P } from "@/components/ui/typography";
import { registerManager } from "./actions/register-manager.action";
import { registerTenant } from "./actions/register-tenant.action";
import { RegisterForm } from "./components/form";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-background to-muted/20">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <H1 className="text-3xl font-bold tracking-tight">
            Create an account
          </H1>
          <P className="text-muted-foreground">
            Choose your role and fill in your information
          </P>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <RegisterForm
              registerManagerFormAction={registerManager}
              registerTenantFormAction={registerTenant}
            />
          </CardContent>
        </Card>

        <div className="text-center">
          <P className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              Sign in here
            </Link>
          </P>
        </div>
      </div>
    </div>
  );
}
