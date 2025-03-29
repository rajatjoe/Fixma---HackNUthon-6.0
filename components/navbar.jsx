"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10 transition-colors duration-300">
                <Menu className="h-5 w-5 text-primary" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] border-r border-primary/10">
              <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  href="/" 
                  onClick={() => setIsOpen(false)} 
                  className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:text-primary"
                >
                  Home
                </Link>
                <Link 
                  href="/test-cases" 
                  onClick={() => setIsOpen(false)} 
                  className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:text-primary"
                >
                  Test Cases
                </Link>
                <Link 
                  href="/functionality-testing" 
                  onClick={() => setIsOpen(false)} 
                  className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:text-primary"
                >
                  Functionality Testing
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent group-hover:from-primary/80 group-hover:to-primary transition-all duration-300">
              FIXMA
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium transition-all duration-300 hover:text-primary relative group">
            Home
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link href="/test-cases" className="text-sm font-medium transition-all duration-300 hover:text-primary relative group">
            Test Cases
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link href="/functionality-testing" className="text-sm font-medium transition-all duration-300 hover:text-primary relative group">
            Functionality Testing
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center hover:bg-primary/10 transition-colors duration-300"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-primary" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-primary" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {/* <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 relative overflow-hidden group px-6 py-2 font-semibold"
          >
            <span className="relative z-10 text-primary-foreground group-hover:text-white transition-colors duration-300">
              Sign In
            </span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/80 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </Button> */}
        </div>
      </div>
    </header>
  )
}

