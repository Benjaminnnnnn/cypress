import React from "react";

type Props = {
  children: React.ReactNode;
};

const Template = ({ children }: Props) => {
  return <div className="flex h-screen justify-center p-6">{children}</div>;
};

export default Template;
