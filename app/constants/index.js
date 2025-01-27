import { Users, User2, FileText, LayoutDashboard, Wallet } from "lucide-react";

export const AdminMenuItems = [
  {
    title: "Foydalanuvchilar",
    icon: Users,
    link: "/",
  },
  {
    title: "Brendlar",
    icon: User2,
    link: "/brands",
  },
  {
    title: "Mahsulotlar",
    icon: Users,
    link: "/products",
  },
  {
    title: "To'lovlar",
    icon: Wallet,
    link: "/payments",
  },
  {
    title: "Darajalar",
    icon: LayoutDashboard,
    link: "/degrees",
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
