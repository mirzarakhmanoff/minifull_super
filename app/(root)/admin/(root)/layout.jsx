"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Language } from "../components/Language/Language";
import { Account } from "../components/Account/Account";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

const RootLayout = ({ children }) => {
  const router = useRouter();
  const [isauth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const verifyUser = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Token not found");
          }

          await axiosInstance.get("http://localhost:8080/api/users/admin/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setIsAuth(true);
        } catch (error) {
          router.push("/login");
        }
      };

      verifyUser();
    }
  }, [router]);

  return isauth ? (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        style={{
          width: "250px",
          backgroundColor: "#f4f4f4",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
        }}
      />

      <div style={{ marginLeft: "260px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            position: "fixed",
            top: "20px",
            right: "20px",
          }}
        >
          <div style={{ marginRight: "10px" }}>
            <Language />
          </div>
          <div>
            <Account />
          </div>
        </div>

        <main
          style={{
            padding: "20px",
            marginTop: "60px",
            width: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  ) : null;
};

export default RootLayout;
