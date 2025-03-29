import React from "react";
import { cn } from "@/lib/utils";

const Logo = () => {
  return (
    <div
      className={cn(
        "text-3xl font-semibold text-indigo-600 dark:text-indigo-400",
      )}
    >
      Climb<span className="font-bold text-indigo-700">R</span>
    </div>
  );
};

export default Logo;
