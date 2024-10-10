"use server";

import { eq } from "drizzle-orm";
import { validate } from "uuid";
import { logger } from "../logger/logger";
import db from "./db";
import { folders, workspaces } from "./schema";
import { Folder, Subscription, workspace } from "./supabase.types";

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const subscription = await db.query.subscriptions.findFirst({
      where: (sub, { eq }) => eq(sub.userId, sub.userId),
    });

    if (subscription) {
      return {
        data: subscription as Subscription,
        error: null,
      };
    } else {
      return {
        data: null,
        error: null,
      };
    }
  } catch (error) {
    logger.error(error);
    return {
      data: null,
      error: `Error: ${error}`,
    };
  }
};

export const getFolders = async (workspaceId: string) => {
  const isValid = validate(workspaceId);
  if (!isValid) {
    return {
      data: null,
      error: "Workspace ID invalid",
    };
  }

  try {
    const results: Folder[] | [] = await db
      .select()
      .from(folders)
      .orderBy(folders.createdAt)
      .where(eq(folders.workspaceId, workspaceId));

    return { data: results, error: null };
  } catch (error) {
    logger.error(`Cannot fetch folders in workspace: ${workspaceId}`);
    return {
      data: null,
      error: `Cannot fetch folders in workspace`,
    };
  }
};

export const createWorkspace = async (workspace: workspace) => {
  try {
    await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    console.info(error);
    return { data: null, error: "Unable to create workspace" };
  }
};
