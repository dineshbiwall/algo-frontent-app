import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { SignUpForm } from "./components/sign-up-form";

export default function SignUp() {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription>
          Enter your email and password to create an account. <br />
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="hover:text-primary underline underline-offset-4"
          >
            Sign In
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
