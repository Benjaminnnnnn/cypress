import Header from "@/components/landing-page/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const HomePageLayout = ({ children }: Props) => {
  return (
    <main>
      <Header></Header>
      {children}
    </main>
  );
};

export default HomePageLayout;
