import { MAX_FOLDERS_FREE_PLAN } from "@/lib/constants";
import { useAppState } from "@/lib/providers/state-provider";
import { Subscription } from "@/lib/supabase/supabase.types";
import { useState } from "react";

interface PlanUsageProps {
  foldersLength: number;
  susbcription: Subscription | null;
}

const PlanUsage = ({ foldersLength, susbcription }: PlanUsageProps) => {
  const { workspaceId, state } = useAppState();
  const [usagePercentage, setUsagePercentage] = useState(
    foldersLength / MAX_FOLDERS_FREE_PLAN,
  );
  return <div>PlanUsage</div>;
};

export default PlanUsage;
