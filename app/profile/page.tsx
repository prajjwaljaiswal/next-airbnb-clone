"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Camera, User, Shield, Bell, CreditCard, LogOut } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  bio: string
  image: string
  createdAt: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    bio: "",
  })
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user/profile")
        const data = await response.json()

        if (data.success) {
          setProfile(data.user)
          setFormData({
            name: data.user.name,
            phone: data.user.phone,
            address: data.user.address,
            bio: data.user.bio,
          })
        } else {
          toast({
            title: "Error",
            description: "Failed to load profile",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while loading profile",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setProfile(data.user)
        setIsEditing(false)
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        })
      } else {
        toast({
          title: "Update failed",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An error occurred while updating your profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-40 bg-gradient-to-r from-rose-400 to-rose-600">
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white">
                    <AvatarImage src={profile?.image || "/placeholder.svg"} alt={profile?.name || "User"} />
                    <AvatarFallback>{profile?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                    <Camera className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{profile?.name}</h1>
                  <p className="text-gray-600">Member since {new Date(profile?.createdAt || "").getFullYear()}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save changes"}
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit profile</Button>
                  )}
                </div>
              </div>

              <Tabs defaultValue="profile" className="mt-6">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Security</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="payments" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Payments</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" value={profile?.email} disabled className="bg-gray-100" />
                          <p className="text-xs text-gray-500">Email cannot be changed</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Your phone number"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Your address"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself"
                          rows={4}
                        />
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                          <p className="mt-1">{profile?.name}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Email</h3>
                          <p className="mt-1">{profile?.email}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                          <p className="mt-1">{profile?.phone || "Not provided"}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Address</h3>
                          <p className="mt-1">{profile?.address || "Not provided"}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                        <p className="mt-1">{profile?.bio || "No bio provided"}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="security">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Password</h3>
                      <Button variant="outline">Change password</Button>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Two-factor authentication</h3>
                      <p className="text-gray-600 mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Account</h3>
                      <Button variant="destructive" onClick={logout} className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications">
                  <div className="space-y-6">
                    <p className="text-gray-600">Manage your notification preferences.</p>
                    <p className="text-gray-500">This feature is coming soon.</p>
                  </div>
                </TabsContent>

                <TabsContent value="payments">
                  <div className="space-y-6">
                    <p className="text-gray-600">Manage your payment methods and view transaction history.</p>
                    <p className="text-gray-500">This feature is coming soon.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
