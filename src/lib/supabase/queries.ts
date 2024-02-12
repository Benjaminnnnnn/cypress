"use server";

import { logger } from "../logger/logger";
import db from "./db";
import { Subscription } from "./supabase.types";

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const subscription = await db.query.subscriptions.findFirst({
      where: (sub, { eq }) => eq(userId, sub.userId),
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
    console.log(error)
    // logger.info(error);
    return {
      data: null,
      error: `Error: {error}`,
    };
  }
};
