"use client";

import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type Props = {};

const Signup = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const exchangeError = useMemo(() => {
    if (!searchParams) {
      return "";
    }
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": exchangeError,
        "border-red-500/50": exchangeError,
        "text-red-700": exchangeError,
      }),
    [],
  );

  return <div>Signup</div>;
};

export default Signup;
