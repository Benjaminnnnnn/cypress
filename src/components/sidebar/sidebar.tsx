import { getFolders, getUserSubscriptionStatus } from "@/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  const { data: foldersData, error: foldersError } = await getFolders(
    params.workspaceId,
  );

  // error
  if (subscriptionError || foldersError) {
    redirect("/dashboard");
  }

  return <div>Sidebar</div>;
};

export default Sidebar;
