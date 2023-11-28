"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();
  const [sumbitError, setSubmitError] = useState("");
  return <div>LoginPage</div>;
};

export default LoginPage;
