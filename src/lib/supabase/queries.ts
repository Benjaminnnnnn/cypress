"use server";

import { and, eq, notExists } from "drizzle-orm";
import { validate } from "uuid";
import { users } from "../../../migrations/schema";
import { logger } from "../logger/logger";
import db from "./db";
import { collaborators, folders, workspaces } from "./schema";
import { Folder, Subscription, Workspace } from "./supabase.types";

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const subscription = await db.query.subscriptions.findFirst({
      where: (sub, { eq }) => eq(sub.userId, userId),
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

export const createWorkspace = async (workspace: Workspace) => {
  try {
    await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    console.info(error);
    return { data: null, error: "Unable to create workspace" };
  }
};

export const getPrivateWorkspaces = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const privateWorkspaces = (await db
    .select({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
      bannerUrl: workspaces.bannerUrl,
    })
    .from(workspaces)
    .where(
      and(
        notExists(
          db
            .select()
            .from(collaborators)
            .where(eq(collaborators.workspaceId, workspaces.id)),
        ),
        eq(workspaces.workspaceOwner, userId),
      ),
    )) as Workspace[];

  return privateWorkspaces;
};

export const getCollaboratingWorkspaces = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const collboratedWorkspaces = (await db
    .select({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
      bannerUrl: workspaces.bannerUrl,
    })
    .from(users)
    .innerJoin(collaborators, eq(users.id, collaborators.userId))
    .innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id))
    .where(eq(users.id, userId))) as Workspace[];

  return collboratedWorkspaces;
};

export const getSharedWorkspaces = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const sharedWorkspaces = (await db
    .selectDistinct({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
      bannerUrl: workspaces.bannerUrl,
    })
    .from(workspaces)
    .orderBy(workspaces.createdAt)
    .innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id))
    .where(eq(workspaces.workspaceOwner, userId))) as Workspace[];

  return sharedWorkspaces;
};
