"use client";

import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";
import { useTheme } from "../../App";

const Toaster = ({ ...props }: ToasterProps) => {
  const { actualTheme } = useTheme();

  return (
    <Sonner
      theme={actualTheme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      position="bottom-right"
      {...props}
    />
  );
};

export { Toaster };
