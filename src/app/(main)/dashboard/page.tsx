import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import db from "@/lib/supabase/db";
import { workspaces } from "@/lib/supabase/schema";
import { redirect } from "next/navigation";
import DashboardSetup from "@/components/dashboard-setup/DashboardSetup";
import { getUserSubscriptionStatus } from "@/lib/supabase/queries";

type Props = {};

const Dashboard = async (props: Props) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const workspace = await db.query.workspaces.findFirst({
    where: (workspaces, { eq }) => eq(workspaces.workspaceOwner, user.id),
  });

  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus("20");

  if (!workspace) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <DashboardSetup user={user} subscription={null}></DashboardSetup>
      </div>
    );
  }

  redirect(`/dashboard/${workspace.id}`);
};

export default Dashboard;
