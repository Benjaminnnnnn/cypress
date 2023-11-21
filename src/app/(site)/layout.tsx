import React from "react";

type Props = {
  children: React.ReactNode;
};

const HomePageLayout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default HomePageLayout;
