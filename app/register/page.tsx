"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register(email, password, phone || undefined);
    } catch (err: unknown) {
      const apiError = err as {
        detail?: string;
        email?: string[];
        password?: string[];
      };
      if (apiError.email) {
        setError(apiError.email[0]);
      } else if (apiError.password) {
        setError(apiError.password[0]);
      } else {
        setError(apiError.detail || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <Link
        href="/"
        className="relative z-10 mb-8 font-header text-3xl italic text-primary hover:text-primary/80 transition-colors"
      >
        Lahwita
      </Link>

      <div className="relative z-10 w-full max-w-sm md:max-w-4xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0 border-border/50">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center mb-4">
                    <h1 className="font-header text-3xl text-foreground">
                      Create an account
                    </h1>
                    <p className="text-foreground/60 text-balance">
                      Get started with Lahwita
                    </p>
                  </div>
                  {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                      {error}
                    </div>
                  )}
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      disabled={isLoading}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">
                      Phone{" "}
                      <span className="text-foreground/40">(optional)</span>
                    </FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 555 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isLoading}
                    />
                  </Field>
                  <Field className="mt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      className="w-full rounded-lg py-6 text-base font-medium shadow-[0_4px_0_0_hsl(var(--primary)/0.7)] hover:shadow-[0_2px_0_0_hsl(var(--primary)/0.7)] hover:translate-y-0.5 active:shadow-none active:translate-y-1 transition-all disabled:opacity-50"
                    >
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </Field>
                  <FieldDescription className="text-center mt-4">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:underline"
                    >
                      Sign in
                    </Link>
                  </FieldDescription>
                </FieldGroup>
              </form>
              <div className="bg-[#1A0E0A] relative hidden md:block">
                <Image
                  src="/login.jpg"
                  width={1920}
                  height={1080}
                  alt="Legal scales"
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center text-foreground/40">
            By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
