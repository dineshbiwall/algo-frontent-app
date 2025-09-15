"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { UserAuthForm } from "./components/user-auth-form";

export default function SignIn() {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight">Login</CardTitle>
        <CardDescription>
          Enter your email and password below to <br />
          log into your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserAuthForm />
      </CardContent>
      <CardFooter>
        <CardDescription>
          If you don't have an account,{" "}
          <Link
            href="/auth/register"
            className="hover:text-primary underline underline-offset-4"
          >
            Register
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
