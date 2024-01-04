"use client";

import Loader from "@/components/global/Loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { actionSignupUser } from "@/lib/sever-actions/auth-actions";
import { SignUpFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { MailCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Logo from "../../../../public/cypresslogo.svg";

type Props = {};

const Signup = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const exchangeError = useMemo(() => {
    if (typeof window !== undefined) {
      return "";
    }

    const searchFragments = window.location.hash;
    if (!searchParams && !searchFragments) {
      return "";
    }
    // useSearchParams is unable to parse fragments redirected by Supabase sign up confirmation
    // extract fragments from URL manually and remove the '#' from the beginning
    const params = new URLSearchParams(searchFragments.substring(1));
    return (
      searchParams.get("error_description") || params.get("error_description")
    );
  }, [searchParams]);

  console.log("error", exchangeError);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": exchangeError,
        "border-red-500/50": exchangeError,
        "text-red-700": exchangeError,
      }),
    [exchangeError],
  );

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (
    signUpCredentials: z.infer<typeof SignUpFormSchema>,
  ) => {
    const { error } = await actionSignupUser(signUpCredentials);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    } else {
      setConfirmation(true);
      // router.push("/dashboard");
    }
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-6 sm:w-[400px] sm:justify-center"
      >
        <Link href="/" className="justfiy-start flex w-full items-center">
          <Image src={Logo} alt="cypress logo" width={50} height={50}></Image>
          <span className="text-4xl font-semibold first-letter:ml-2 dark:text-white">
            cypress.
          </span>
        </Link>

        <FormDescription>
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>

        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field}></Input>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>

        <FormField
          disabled={isLoading}
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        ></FormField>

        {submitError && <FormMessage>{submitError}</FormMessage>}

        {!confirmation && !exchangeError && (
          <>
            <Button type="submit" className="w-full p-6" disabled={isLoading}>
              {!isLoading ? "Create Account" : <Loader></Loader>}
            </Button>
          </>
        )}

        <span className="">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </span>

        {(confirmation || exchangeError) && (
          <>
            <Alert className={confirmationAndErrorStyles}>
              {!exchangeError && <MailCheck className="h-4 w-4"></MailCheck>}
              <AlertTitle>
                {exchangeError
                  ? "Invalid confirmation link"
                  : "Check your email"}
              </AlertTitle>
              <AlertDescription>
                {exchangeError || "An email confirmation has been sent."}
              </AlertDescription>
            </Alert>
          </>
        )}

        <Link href="http://localhost:3000/signup#error=unauthorized_client&error_code=401&error_description=Email+link+is+invalid+or+has+expire">
          <Button variant="destructive">hello</Button>
        </Link>
      </form>
    </Form>
  );
};

export default Signup;
