import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="w-full bg-transparent dark:bg-zinc-900 shadow-sm sticky top-0 z-50  ">
      <Navbar />
    </div>
  );
};

export default Header;
