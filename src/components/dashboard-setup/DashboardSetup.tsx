"use client";
import React, { useState } from "react";
import { AuthUser } from "@supabase/supabase-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import EmojiPicker from "../global/EmojiPicker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CreateWorkspaceFormSchema } from "@/lib/types";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { v4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Subscription } from "@/lib/supabase/supabase.types";
import { Button } from "../ui/button";
import Loader from "../global/Loader";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { logger } from "@/lib/logger/logger";
import { useToast } from "../ui/use-toast";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: Subscription | null;
}

const DashboardSetup = ({ subscription, user }: DashboardSetupProps) => {
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const [selectedEmoji, setSelectedEmoji] = useState<string>("📈");
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: "onChange",
    defaultValues: {
      logo: "",
      workspaceName: "",
    },
    resolver: zodResolver(CreateWorkspaceFormSchema),
  });

  const onSubmit = async (value: z.infer<typeof CreateWorkspaceFormSchema>) => {
    const file = value.logo?.[0];
    let filePath = null;
    const workspaceUUID = v4();

    toast({
      variant: "destructive",
      title: "Could not upload your workspace logo",
    });
    // if (file) {
    //   try {
    //     const { data, error } = await supabase.storage
    //       .from("workspace-logo")
    //       .upload(`worspaceLogo.${workspaceUUID}`, file, {
    //         cacheControl: "3600",
    //         upsert: true,
    //       });
    //     if (error) throw new Error(error.message);
    //     filePath = data.path;
    //   } catch (error) {
    //     logger.info(error);
    //     toast({
    //       variant: "destructive",
    //       title: "Could not upload your workspace logo",
    //     });
    //   }
    // }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">
                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </EmojiPicker>
              </div>

              <div className="w-full">
                <Label
                  htmlFor="workspaceName"
                  className="text-sm text-muted-foreground"
                >
                  Workspace Name
                </Label>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="Workspace Name"
                  disabled={isSubmitting}
                  {...register("workspaceName")}
                ></Input>
                <small className="text-red-600">
                  {errors?.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>

            <div>
              <Label htmlFor="logo" className="text-sm text-muted-foreground">
                Workspace Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                placeholder="Workspace Logo"
                // disabled={isSubmitting || subscription?.status !== "active"}
                {...register("logo")}
              ></Input>
              {subscription?.status !== "active" && (
                <small className=" block text-muted-foreground">
                  To customize your workspace, you need to be on a Pro Plan
                </small>
              )}
            </div>
            <div className="self-end">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? <Loader></Loader> : "Create Workspace"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
