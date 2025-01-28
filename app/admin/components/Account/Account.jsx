"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react"; // Import relevant icons
import { signOut } from "next-auth/react";

export function Account() {
  const handleProfileClick = () => {
    console.log("Navigating to Profile...");
  };

  const handleLogOut = async () => {
    console.log("Logging out...");
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <User className="w-5 h-5" /> Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 rounded-md shadow-lg bg-white">
        <DropdownMenuLabel className="font-semibold text-gray-700">
          Account Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 border-t-2 border-gray-300" />

        {/* Profile Option */}
        <DropdownMenuItem
          onClick={handleProfileClick}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
        >
          <User className="w-5 h-5 text-blue-500" />
          Profile
        </DropdownMenuItem>

        {/* Log Out Option */}
        <DropdownMenuItem
          onClick={handleLogOut}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
