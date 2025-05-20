"use client"

import * as React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  image?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  forgotPassword: (email: string) => Promise<boolean>
  resetPassword: (token: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("token", data.token)
        toast({
          title: "Login successful",
          description: "Welcome back!",
        })
        return true
      } else {
        toast({
          title: "Login failed",
          description: data.message,
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("token", data.token)
        toast({
          title: "Registration successful",
          description: "Welcome to Airbnb!",
        })
        return true
      } else {
        toast({
          title: "Registration failed",
          description: data.message,
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Password reset email sent",
          description: data.message,
        })
        return true
      } else {
        toast({
          title: "Request failed",
          description: data.message,
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Request failed",
        description: "An error occurred while processing your request",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Password reset successful",
          description: data.message,
        })
        return true
      } else {
        toast({
          title: "Password reset failed",
          description: data.message,
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: "An error occurred while resetting your password",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  }

  return React.createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
