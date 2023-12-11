import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  //   const requestUrl = new URL(req.url);
  //   const code = requestUrl.searchParams.get("code");
  const code = req.nextUrl.searchParams.get("code");

  if (code) {
    console.log("code is ", code);
    const supabase = createRouteHandlerClient({
      cookies,
    });
    await supabase.auth.exchangeCodeForSession(code);
    // return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
    return NextResponse.redirect(`${req.nextUrl.origin}/dashboard`);
  } else {
    return NextResponse.redirect(`${req.nextUrl.origin}/signup`);
  }
}
