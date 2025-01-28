import React from "react";
import "./globals.css";
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
