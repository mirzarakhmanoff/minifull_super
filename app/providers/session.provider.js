"use client";

import * as React from "react";

export function Provider({ children, ...props }) {
  return <React.Fragment {...props}>{children}</React.Fragment>;
}
