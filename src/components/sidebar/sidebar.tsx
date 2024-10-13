import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from "@/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import PlanUsage from "./plan-usage";
import WorkspaceDropdown from "./workspace-dropdown";

interface SidebarProps {
  params: {
    workspaceId: string;
  };
  className?: string;
}

const Sidebar = async ({ params, className }: SidebarProps) => {
  const supabase = createServerComponentClient({ cookies });

  // 1. check if there is a user
  // 2. check subscription status
  // 3. check folders
  // redirect to dashboard if error

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // subscription
  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  //folders
  const { data: workspaceFoldersData, error: foldersError } = await getFolders(
    params.workspaceId,
  );

  // error
  if (subscriptionError || foldersError) {
    redirect("/dashboard");
  }

  const [privateWorkspaces, collboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  return (
    <aside
      className={twMerge(
        "hidden w-[280px] shrink-0 !justify-between p-4 sm:flex sm:flex-col md:gap-4",
        className,
      )}
    >
      <WorkspaceDropdown
        privateWorkspaces={privateWorkspaces}
        sharedWorkspaces={sharedWorkspaces}
        collaboratingWorkspaces={collboratingWorkspaces}
        defaultValue={[
          ...privateWorkspaces,
          ...collboratingWorkspaces,
          ...sharedWorkspaces,
        ].find((workspace) => workspace.id === params.workspaceId)}
      ></WorkspaceDropdown>

      <PlanUsage
        foldersLength={workspaceFoldersData?.length || 0}
        susbcription={subscriptionData}
      ></PlanUsage>
    </aside>
  );
};

export default Sidebar;
