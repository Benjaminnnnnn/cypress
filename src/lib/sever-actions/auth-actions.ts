"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";
import { LoginFormSchema, SignUpFormSchema } from "../types";

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof LoginFormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signInWithPassword({ email, password });
  return response;
}

export async function actionSignupUser({
  email,
  password,
  confirmPassword,
}: z.infer<typeof SignUpFormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.from("profi").select("*").eq("email", email);

  if (data?.length) {
    return {
      error: { message: "User already exists", data },
    };
  }

  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });
  return response;
}
