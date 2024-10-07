import { AppState } from "@/lib/providers/state-provider";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState = {
  workspaces: [],
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {},
});
