import { Users, User2, FileText, LayoutDashboard, Wallet } from "lucide-react";

export const AdminMenuItems = [
  {
    title: "Foydalanuvchilar",
    icon: Users,
    link: "/admin",
  },
  {
    title: "Brendlar",
    icon: User2,
    link: "/admin/brands",
  },
  {
    title: "Mahsulotlar",
    icon: Users,
    link: "/admin/products",
  },
  {
    title: "To'lovlar",
    icon: Wallet,
    link: "/admin/payments",
  },
  {
    title: "Darajalar",
    icon: LayoutDashboard,
    link: "/admin/degrees",
  },
  // {
  //   title: "Statistics",
  //   icon: FileText,
  //   link: "/admin/stats",
  // },
  // {
  //   title: "Documents",
  //   icon: FileText,
  //   link: "/admin/documents",
  // },
];
export const userMenuItems = [
  {
    title: "Tree",
    icon: Users,
    link: "/user/tree",
  },
  {
    title: "User degree",
    icon: User2,
    link: "/user/degree",
  },
  {
    title: "My people",
    icon: Users,
    link: "/user/my-people",
  },
  {
    title: "Account",
    icon: Wallet,
    link: "/user/account",
  },
  {
    title: "Personal cabinet",
    icon: LayoutDashboard,
    link: "/user/personal",
  },
  {
    title: "Statistics",
    icon: FileText,
    link: "/user/stats",
  },
  {
    title: "Documents",
    icon: FileText,
    link: "/user/documents",
  },
];
