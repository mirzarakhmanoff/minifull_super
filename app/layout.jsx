import React from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import "./globals.css";
import { Language } from "./components/Language/Language";
import { Account } from "./components/Account/Account";
import { Provider } from "./providers/session.provider";

export default function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head></head>
      <body style={{ margin: 0, padding: 0 }}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
