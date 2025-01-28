"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Flag, FlagOff } from "lucide-react";

export function Language() {
  const [language, setLanguage] = React.useState("English");

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const renderLanguageIcon = (lang) => {
    switch (lang) {
      case "English":
        return <Globe className="w-5 h-5 text-blue-600" />;
      case "Russian":
        return <Flag className="w-5 h-5 text-red-600" />;
      case "Uzbek":
        return <FlagOff className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 p-2 rounded-md border-none bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          {renderLanguageIcon(language)}
          {language}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 rounded-md shadow-lg bg-white border-none">
        <DropdownMenuLabel className="font-semibold text-gray-700">
          Choose Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 border-t-2 border-gray-300" />

        <DropdownMenuCheckboxItem
          checked={language === "English"}
          onCheckedChange={() => handleLanguageChange("English")}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
        >
          <Globe className="w-5 h-5 text-blue-600" />
          English
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={language === "Russian"}
          onCheckedChange={() => handleLanguageChange("Russian")}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
        >
          <Flag className="w-5 h-5 text-red-600" />
          Russian
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={language === "Uzbek"}
          onCheckedChange={() => handleLanguageChange("Uzbek")}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
        >
          <FlagOff className="w-5 h-5 text-green-600" />
          Uzbek
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
