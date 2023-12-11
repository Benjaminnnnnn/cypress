import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardPageLayout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default DashboardPageLayout;
