"use client";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Language } from "../components/Language/Language";
import { Account } from "../components/Account/Account";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RootLayout = ({ children }) => {
  return (
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
  );
};

export default RootLayout;
