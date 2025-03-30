"use client";

import React, { useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from './Logo';
import DarkModeToggle from './DarkModeToggle';

// Navigation links with section IDs
const NAV_LINKS = [
  { name: "Home", sectionId: "hero" },
  { name: "Features", sectionId: "features" },
  { name: "Pricing", sectionId: "pricing" },
  { name: "Testimonials", sectionId: "testimonials" },
  // { name: "About", sectionId: "about" }, // Keep this even if section isn't created yet
  { name: "Contact", sectionId: "cta" }
];

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Function to handle smooth scrolling
  const scrollToSection = (sectionId:any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      setIsSheetOpen(false);
    }
  };
  
  return (
    <header className="w-full bg-white dark:bg-zinc-900 shadow-sm fixed top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.sectionId}>
                <button
                  onClick={() => scrollToSection(link.sectionId)}
                  className={`${navigationMenuTriggerStyle()} text-zinc-700 dark:text-zinc-200 bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900`}
                >
                  {link.name}
                </button>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Mobile Navigation */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <DarkModeToggle />
          
          {/* Mobile Menu Sheet */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6 text-zinc-700 dark:text-zinc-200" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-white dark:bg-zinc-900">
              <div className="mt-8 space-y-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.sectionId}
                    onClick={() => scrollToSection(link.sectionId)}
                    className="block w-full text-left py-2 text-lg text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;