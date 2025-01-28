"use client";

import { Users, User2, FileText, LayoutDashboard, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Tree",
    icon: Users,
    link: "/tree",
  },
  {
    title: "User degree",
    icon: User2,
    link: "/degree",
  },
  {
    title: "My people",
    icon: Users,
    link: "/my-people",
  },
  {
    title: "Account",
    icon: Wallet,
    link: "/account",
  },
  {
    title: "Personal cabinet",
    icon: LayoutDashboard,
    link: "/personal",
  },
  {
    title: "Statistics",
    icon: FileText,
    link: "/stats",
  },
  {
    title: "Documents",
    icon: FileText,
    link: "/documents",
  },
];

export function Sidebar() {
  const currentPath = usePathname();

  return (
    <aside className="w-[280px] fixed h-screen bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="py-6 px-4">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 hover:animate-pulse cursor-pointer">
          MiniFull
        </h2>
      </div>

      <nav className="flex-1 py-6 px-4">
        <ul className="space-y-4">
          {menuItems.map((item, index) => {
            const isActive = currentPath === item.link;

            return (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`flex items-center px-6 py-3 text-gray-300 rounded-lg transition-all duration-300 ease-in-out
                    ${
                      isActive ? "bg-gray-600 text-white" : "hover:bg-gray-600"
                    }`}
                >
                  <item.icon
                    className={`h-5 w-5 mr-4 ${
                      isActive ? "text-rose-500" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
