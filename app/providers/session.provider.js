"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";

export function Provider({ children, ...props }) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
