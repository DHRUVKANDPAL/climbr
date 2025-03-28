import React from 'react'
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Logo from './Logo'
import DarkModeToggle from './DarkModeToggle'
import Link from 'next/link'

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Explore", href: "/explore" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
]

const Navbar = () => {
  return (
    <header className="w-full bg-white dark:bg-zinc-900 shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={`${navigationMenuTriggerStyle()} text-zinc-700 dark:text-zinc-200 bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900`}
                  >
                    {link.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Mobile Menu Sheet */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6 text-zinc-700 dark:text-zinc-200" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-white dark:bg-zinc-900">
              <div className="mt-8 space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="block py-2 text-lg text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

export default Navbar