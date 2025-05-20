"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Share, Heart, Award, User, Calendar, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "../../components/navbar"
import { Footer } from "../../components/footer"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth"

// Mock data for a single property
const property = {
  id: 1,
  title: "Beachfront Villa with Ocean View",
  description:
    "Enjoy this stunning beachfront villa with panoramic ocean views. Perfect for a relaxing getaway with family or friends. The property features a private pool, spacious living areas, and direct beach access.",
  location: "Malibu, California",
  distance: "50 miles away",
  dates: "Nov 12-17",
  price: 350,
  rating: 4.98,
  reviews: 124,
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  superhost: true,
  host: {
    name: "Catherine",
    image: "/placeholder.svg?height=100&width=100",
    joined: "2015",
    superhost: true,
    responseRate: 100,
    responseTime: "within an hour",
  },
  amenities: [
    "Ocean view",
    "Beach access",
    "Private pool",
    "Wifi",
    "Kitchen",
    "Free parking",
    "Air conditioning",
    "Washer & dryer",
  ],
  bedrooms: 4,
  beds: 5,
  baths: 3,
  guests: 8,
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState<string>("1")
  const [isFavorite, setIsFavorite] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleReserve = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to make a reservation",
        variant: "destructive",
      })
      return
    }

    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Dates required",
        description: "Please select check-in and check-out dates",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Booking successful!",
      description: `Your stay at ${property.title} has been booked.`,
    })
  }

  const toggleFavorite = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save favorites",
        variant: "destructive",
      })
      return
    }

    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? "Property has been removed from your favorites"
        : "Property has been added to your favorites",
    })
  }

  const shareProperty = (platform: string) => {
    toast({
      title: "Shared successfully",
      description: `Property has been shared via ${platform}`,
    })
    setIsShareDialogOpen(false)
  }

  // Calculate number of nights and total price
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const subtotal = property.price * nights
  const cleaningFee = 150
  const serviceFee = 250
  const total = subtotal + cleaningFee + serviceFee

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Property title and actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold">{property.title}</h1>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share this place</DialogTitle>
                    <DialogDescription>Share this amazing property with friends and family</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <Button onClick={() => shareProperty("Facebook")} className="flex items-center gap-2">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                      Facebook
                    </Button>
                    <Button onClick={() => shareProperty("Twitter")} className="flex items-center gap-2">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      Twitter
                    </Button>
                    <Button onClick={() => shareProperty("WhatsApp")} className="flex items-center gap-2">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </Button>
                    <Button onClick={() => shareProperty("Email")} className="flex items-center gap-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Email
                    </Button>
                    <Button onClick={() => shareProperty("Copy Link")} className="flex items-center gap-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy Link
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={toggleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>Save</span>
              </Button>
            </div>
          </div>

          {/* Property images */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-square">
              <Image
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover rounded-lg md:rounded-l-lg md:rounded-r-none"
              />
            </div>
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="hidden md:block relative aspect-square">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${property.title} - image ${index + 2}`}
                  fill
                  className={`object-cover ${index === 1 ? "rounded-tr-lg" : index === 3 ? "rounded-br-lg" : ""}`}
                />
              </div>
            ))}
          </motion.div>

          {/* Property details and booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Host and property info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b">
                <div>
                  <h2 className="text-xl font-bold">
                    {property.title} hosted by {property.host.name}
                  </h2>
                  <p className="text-gray-600">
                    {property.guests} guests · {property.bedrooms} bedrooms · {property.beds} beds · {property.baths}{" "}
                    baths
                  </p>
                </div>
                <Avatar className="w-14 h-14 mt-4 md:mt-0">
                  <AvatarImage src={property.host.image || "/placeholder.svg"} alt={property.host.name} />
                  <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              {/* Host highlights */}
              <div className="py-6 border-b">
                <div className="flex items-center gap-4 mb-4">
                  <Award className="h-8 w-8" />
                  <div>
                    <h3 className="font-bold">{property.host.name} is a Superhost</h3>
                    <p className="text-gray-600">Superhosts are experienced, highly rated hosts.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="h-8 w-8" />
                  <div>
                    <h3 className="font-bold">Free cancellation before Nov 7</h3>
                    <p className="text-gray-600">Cancel before check-in for a partial refund.</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="py-6 border-b">
                <p className="text-gray-800 whitespace-pre-line">{property.description}</p>
                <Button variant="link" className="px-0 mt-2">
                  Read more
                </Button>
              </div>

              {/* Amenities */}
              <div className="py-6 border-b">
                <h2 className="text-xl font-bold mb-4">What this place offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z"></path>
                        </svg>
                      </div>
                      <span>{amenity}</span>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" className="mt-6">
                  Show all amenities
                </Button>
              </div>
            </div>

            {/* Booking card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-baseline">
                      <span>
                        ${property.price} <span className="text-base font-normal">night</span>
                      </span>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        <span>{property.rating}</span>
                        <span className="mx-1">·</span>
                        <span className="underline">{property.reviews} reviews</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="border rounded-tl-lg p-3">
                        <div className="text-xs font-bold uppercase">Check-in</div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="link" className="p-0 h-auto font-normal">
                              {checkInDate ? format(checkInDate, "MMM d, yyyy") : "Add date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={checkInDate}
                              onSelect={setCheckInDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="border rounded-tr-lg p-3">
                        <div className="text-xs font-bold uppercase">Checkout</div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="link" className="p-0 h-auto font-normal">
                              {checkOutDate ? format(checkOutDate, "MMM d, yyyy") : "Add date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={checkOutDate}
                              onSelect={setCheckOutDate}
                              initialFocus
                              disabled={(date) => {
                                if (checkInDate) {
                                  return date < checkInDate
                                }
                                return date < new Date()
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="border col-span-2 rounded-b-lg p-3">
                        <div className="text-xs font-bold uppercase">Guests</div>
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger className="border-0 p-0 h-auto font-normal">
                            <SelectValue placeholder="Add guests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 guest</SelectItem>
                            <SelectItem value="2">2 guests</SelectItem>
                            <SelectItem value="3">3 guests</SelectItem>
                            <SelectItem value="4">4 guests</SelectItem>
                            <SelectItem value="5">5 guests</SelectItem>
                            <SelectItem value="6">6+ guests</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <motion.button
                      className="w-full mb-4 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReserve}
                    >
                      Reserve
                    </motion.button>
                    <p className="text-center text-sm mb-4">You won't be charged yet</p>

                    <AnimatePresence>
                      {nights > 0 && (
                        <motion.div
                          className="space-y-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="flex justify-between">
                            <span className="underline">
                              ${property.price} x {nights} nights
                            </span>
                            <span>${subtotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="underline">Cleaning fee</span>
                            <span>${cleaningFee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="underline">Service fee</span>
                            <span>${serviceFee}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <span>Total before taxes</span>
                            <span>${total}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-12 pb-6 border-b">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-xl font-bold">{property.rating}</span>
              <span className="text-xl">·</span>
              <span className="text-xl font-bold">{property.reviews} reviews</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mock reviews */}
              {[1, 2, 3, 4].map((review) => (
                <motion.div
                  key={review}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: review * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">Guest {review}</h4>
                      <p className="text-gray-500 text-sm">October 2023</p>
                    </div>
                  </div>
                  <p>
                    {review % 2 === 0
                      ? "Amazing place! The views were incredible and the host was very responsive. Would definitely stay again."
                      : "We had a wonderful time. The property was clean, spacious, and exactly as described. Great location!"}
                  </p>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" className="mt-6">
              Show all {property.reviews} reviews
            </Button>
          </div>

          {/* Location */}
          <div className="mt-12 pb-6">
            <h2 className="text-xl font-bold mb-4">Where you'll be</h2>
            <div className="aspect-[16/9] relative rounded-lg overflow-hidden mb-4">
              <Image src="/placeholder.svg?height=400&width=800" alt="Map location" fill className="object-cover" />
            </div>
            <h3 className="font-bold">{property.location}</h3>
            <p className="text-gray-600 mt-2">
              The neighborhood is quiet and peaceful, perfect for a relaxing getaway. You'll be just steps away from the
              beach and a short drive to local restaurants and shops.
            </p>
            <Button variant="link" className="px-0 mt-2">
              Show more
            </Button>
          </div>

          {/* Host info */}
          <div className="mt-12 pb-6 border-b">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={property.host.image || "/placeholder.svg"} alt={property.host.name} />
                <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">Hosted by {property.host.name}</h2>
                <p className="text-gray-600">
                  Joined in {property.host.joined} · {property.host.superhost ? "Superhost" : ""}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  <span>{property.reviews} Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>Superhost</span>
                </div>
                <p className="mt-4">
                  {property.host.name} is a Superhost with years of experience providing exceptional stays for guests.
                  Response rate: {property.host.responseRate}% Response time: {property.host.responseTime}
                </p>
              </div>

              <div>
                <p className="mb-4">
                  Hi, I'm {property.host.name}! I love sharing my beautiful properties with travelers from around the
                  world. I'm always available to help make your stay perfect and can provide local recommendations.
                </p>
                <Button variant="outline">Contact host</Button>
              </div>
            </div>
          </div>

          {/* Things to know */}
          <div className="mt-12 pb-6">
            <h2 className="text-xl font-bold mb-6">Things to know</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold mb-4">House rules</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>Check-in: After 3:00 PM</li>
                  <li>Checkout: 11:00 AM</li>
                  <li>No smoking</li>
                  <li>No pets</li>
                  <li>No parties or events</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">Safety & property</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>Carbon monoxide alarm</li>
                  <li>Smoke alarm</li>
                  <li>Security camera/recording device</li>
                  <li>Pool/hot tub without gate or lock</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">Cancellation policy</h3>
                <p className="text-gray-600">
                  Free cancellation before Nov 7. Cancel before check-in on Nov 12 for a partial refund.
                </p>
                <Button variant="link" className="px-0 mt-2">
                  Read more
                </Button>
              </div>
            </div>
          </div>

          {/* Report listing */}
          <div className="mt-8 text-center">
            <Button variant="link" className="text-gray-500 flex items-center gap-2 mx-auto">
              <Flag className="h-4 w-4" />
              <span>Report this listing</span>
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
