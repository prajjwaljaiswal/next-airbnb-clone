"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Calendar, MapPin, Star } from "lucide-react"

interface Booking {
  id: string
  propertyId: number
  propertyName: string
  location: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "upcoming" | "completed" | "cancelled"
  image: string
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("upcoming")
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/user/bookings")
        const data = await response.json()

        if (data.success) {
          setBookings(data.bookings)
        } else {
          toast({
            title: "Error",
            description: "Failed to load bookings",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while loading bookings",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [user, router, toast])

  const filteredBookings = bookings.filter((booking) => booking.status === activeTab)

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
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
          <h1 className="text-2xl font-bold mb-6">Your Trips</h1>

          <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No upcoming trips</h3>
                  <p className="text-gray-500 mb-6">Time to start planning your next adventure!</p>
                  <Button onClick={() => router.push("/")}>Explore stays</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredBookings.map((booking, index) => (
                    <BookingCard key={booking.id} booking={booking} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No completed trips</h3>
                  <p className="text-gray-500 mb-6">You haven't completed any trips yet.</p>
                  <Button onClick={() => router.push("/")}>Explore stays</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredBookings.map((booking, index) => (
                    <BookingCard key={booking.id} booking={booking} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No cancelled trips</h3>
                  <p className="text-gray-500 mb-6">You haven't cancelled any trips.</p>
                  <Button onClick={() => router.push("/")}>Explore stays</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredBookings.map((booking, index) => (
                    <BookingCard key={booking.id} booking={booking} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

function BookingCard({ booking, index }: { booking: Booking; index: number }) {
  const router = useRouter()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative aspect-video md:aspect-square">
          <Image src={booking.image || "/placeholder.svg"} alt={booking.propertyName} fill className="object-cover" />
        </div>
        <div className="p-4 md:col-span-2">
          <h3 className="text-xl font-bold mb-2">{booking.propertyName}</h3>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{booking.location}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Check-in</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-600" />
                <span>{formatDate(booking.checkIn)}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check-out</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-600" />
                <span>{formatDate(booking.checkOut)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Guests</p>
              <p>
                {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total price</p>
              <p className="font-bold">${booking.totalPrice}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => router.push(`/property/${booking.propertyId}`)}>
              View property
            </Button>
            {booking.status === "upcoming" && <Button variant="destructive">Cancel reservation</Button>}
            {booking.status === "completed" && (
              <Button className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Leave a review</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
