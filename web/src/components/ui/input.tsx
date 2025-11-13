import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "w-full rounded-md border px-3 py-2 text-base outline-none focus:ring-1 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  );
}

export { Input };
