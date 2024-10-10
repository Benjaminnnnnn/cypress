import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    workspaceId: string;
  };
};

const WorkspaceLayout = ({ children, params }: Props) => {
  return (
    <main className="flex h-screen w-screen overflow-hidden">
      <Sidebar params={params}></Sidebar>
      {children}
      <div className="dark:border-Neutrals-12/70 relative w-full overflow-scroll border-l-[1px]"></div>
    </main>
  );
};

export default WorkspaceLayout;
