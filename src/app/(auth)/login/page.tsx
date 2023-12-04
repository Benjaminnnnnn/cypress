"use client";
import Loader from "@/components/global/Loader";
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
import { actionLoginUser } from "@/lib/sever-actions/auth-actions";
import { LoginFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Logo from "../../../../public/cypresslogo.svg";

type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();
  const [sumbitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSumbit = async (formData: z.infer<typeof LoginFormSchema>) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (sumbitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSumbit)}
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

        {sumbitError && <FormMessage>{sumbitError}</FormMessage>}

        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {!isLoading ? "Login" : <Loader></Loader>}
        </Button>

        <span className="">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginPage;
