"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RootLayout = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    if (window !== undefined) {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "user") {
        router.push("/user");
      } else {
        router.push("/login");
      }
    }
  }, [router]);
  return children;
};

export default RootLayout;
