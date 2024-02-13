"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface EmojiPickerProps {
  children: React.ReactNode;
  getValue?: (emoji: string) => void;
}

const EmojiPicker = ({ children, getValue }: EmojiPickerProps) => {
  const router = useRouter();
  const Picker = dynamic(() => import("emoji-picker-react"));
  const handleEmojiClick = (selectedEmoji: any) => {
    if (getValue) getValue(selectedEmoji.emoji);
  };
  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
        <PopoverContent className="border-none p-0">
          <Picker onEmojiClick={handleEmojiClick}></Picker>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmojiPicker;
