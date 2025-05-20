"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { useAuth } from "@/lib/auth"
import { motion } from "framer-motion"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { forgotPassword } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await forgotPassword(email)
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
                <h1 className="text-2xl font-bold mb-4">Check your email</h1>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
                  instructions to reset your password.
                </p>
                <Button variant="outline" className="w-full" onClick={() => router.push("/login")}>
                  Return to login
                </Button>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-6">Reset your password</h1>
                <p className="text-gray-600 mb-6">
                  Enter the email address associated with your account, and we'll send you a link to reset your
                  password.
                </p>

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

                  <motion.button
                    type="submit"
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg font-medium"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? "Sending..." : "Send reset link"}
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <Link href="/login" className="text-rose-500 hover:underline">
                    Back to login
                  </Link>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
