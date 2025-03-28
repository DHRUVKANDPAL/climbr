import React from "react";
import { cn } from "@/lib/utils";

const Logo = () => {
  return (
    <div
      className={cn(
        "text-3xl font-semibold text-violet-600 dark:text-violet-400",
      )}
    >
      Climb<span className="font-semibold text-violet-700">R</span>
    </div>
  );
};

export default Logo;
