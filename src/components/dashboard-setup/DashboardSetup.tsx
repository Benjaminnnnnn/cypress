import React from "react";
import { AuthUser } from "@supabase/supabase-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: {} | null;
}

const DashboardSetup = ({ subscription, user }: DashboardSetupProps) => {
  return (
    <Card className="h-screen w-[800px] sm:h-auto">
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started. You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <form onSubmit={() => {}}> */}
        {/*   <div className="flex flex-col gap-4">kk</div> */}
        {/* </form> */}
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
