"use client";

import { useRef } from "react";
import { AppStore, makeStore } from "../store";
import { File, Folder, workspace } from "../supabase/supabase.types";

export type appFoldersType = Folder & {
  files: File[] | [];
};

export type appWorkspacesType = workspace & {
  folders: appFoldersType[] | [];
};

export interface AppState {
  workspaces: appWorkspacesType[] | [];
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return {};
}
