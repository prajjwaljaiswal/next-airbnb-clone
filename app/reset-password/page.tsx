"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { useAuth } from "@/lib/auth"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [token, setToken] = useState<string | null>(null)
  const { resetPassword } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenParam = searchParams.get("token")
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      // No token provided, redirect to forgot password page
      router.push("/forgot-password")
    }
  }, [searchParams, router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !token) {
      return
    }

    setIsLoading(true)

    try {
      const success = await resetPassword(token, password)
      if (success) {
        setIsSubmitted(true)
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
            {isSubmitted ? (
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Password reset successful</h1>
                <p className="text-gray-600 mb-6">
                  Your password has been reset successfully. You can now log in with your new password.
                </p>
                <Button variant="outline" className="w-full" onClick={() => router.push("/login")}>
                  Go to login
                </Button>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-6">Create new password</h1>
                <p className="text-gray-600 mb-6">
                  Your new password must be different from previously used passwords.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a new password"
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
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg font-medium"
                    disabled={isLoading || !token}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? "Resetting..." : "Reset password"}
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
