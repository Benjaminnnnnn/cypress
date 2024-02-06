import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    workspaceId: string;
  };
};

const DashboardPageLayout = ({ children, params }: Props) => {
  return <main className="flex h-screen overflow-hidden">{children}</main>;
};

export default DashboardPageLayout;
