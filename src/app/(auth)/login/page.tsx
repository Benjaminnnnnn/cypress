"use client";
import { FormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import Logo from "../../../../public/cypresslogo.svg";

type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();
  const [sumbitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(form);

  const onSumbit = async (formData: z.infer<typeof FormSchema>) => {
    console.log(formData);
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
      </form>
    </Form>
  );
};

export default LoginPage;
