"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { useAuth } from "@/lib/auth"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Log in to Airbnb</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg font-medium"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </motion.button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-rose-500 hover:underline text-sm">
                Forgot password?
              </Link>
            </div>

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-gray-600 mb-4">Don't have an account?</p>
              <Button variant="outline" className="w-full" onClick={() => router.push("/register")}>
                Sign up
              </Button>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            By logging in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
