"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Search, Globe, User, LogOut, Heart, History, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export function Navbar() {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : "border-b"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 fill-rose-500"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.267 3.42-6.414 3.615l-.28.019-.267.006C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.298 6.083-12.989 7.707-16.034C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.573 1.655-.605 2.24l-.009.33v.206c0 2.329 1.607 3.9 3.543 3.9 1.4 0 3.044-.944 4.812-2.606l.91-.933.601-.613.603.621c1.682 1.718 3.389 2.675 4.927 2.675 1.936 0 3.543-1.571 3.543-3.9l-.008-.386c-.035-.789-.198-1.401-.636-2.496l-.2-.476c-.834-1.993-4.915-10.493-6.803-14.184l-.793-1.642C18.053 3.539 17.24 3 16 3z"></path>
          </motion.svg>
          <span className="text-rose-500 font-bold ml-2 text-xl hidden sm:inline">airbnb</span>
        </Link>

        {/* Search bar - only on desktop */}
        {!isMobile && (
          <motion.div
            className="hidden md:flex items-center border rounded-full py-2 px-4 shadow-sm hover:shadow-md transition cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium border-r pr-4">Anywhere</span>
            <span className="font-medium border-r px-4">Any week</span>
            <span className="text-gray-500 pl-4 pr-2">Add guests</span>
            <div className="bg-rose-500 p-2 rounded-full text-white">
              <Search className="h-4 w-4" />
            </div>
          </motion.div>
        )}

        {/* User menu */}
        <div className="flex items-center gap-4">
          {!isMobile && (
            <Button variant="ghost" className="hidden md:flex items-center gap-2 rounded-full">
              <span>Become a Host</span>
            </Button>
          )}

          {!isMobile && (
            <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
              <Globe className="h-5 w-5" />
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full flex items-center gap-2 border-gray-300">
                {isMobile && <Menu className="h-5 w-5" />}
                {user ? (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || "/placeholder.svg?height=32&width=32"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user.name}
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/favorites")}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/bookings")}>
                    <History className="mr-2 h-4 w-4" />
                    <span>Booking History</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => router.push("/login")}>Log in</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/register")}>Sign up</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/host")}>Host your home</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/host/experience")}>
                    Host an experience
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/help")}>Help</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  )
}
