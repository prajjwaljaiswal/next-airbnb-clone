"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

// Mock data for properties
const allProperties = [
  {
    id: 1,
    title: "Beachfront Villa with Ocean View",
    location: "Malibu, California",
    distance: "50 miles away",
    dates: "Nov 12-17",
    price: 350,
    rating: 4.98,
    reviews: 124,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: true,
    propertyType: "House",
    amenities: ["Wifi", "Pool", "Kitchen", "Free parking"],
    instantBook: true,
  },
  {
    id: 2,
    title: "Modern Downtown Loft",
    location: "New York, New York",
    distance: "2 miles away",
    dates: "Nov 5-10",
    price: 200,
    rating: 4.85,
    reviews: 87,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: false,
    propertyType: "Loft",
    amenities: ["Wifi", "Kitchen"],
    instantBook: false,
  },
  {
    id: 3,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    distance: "120 miles away",
    dates: "Dec 1-6",
    price: 175,
    rating: 4.92,
    reviews: 56,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: true,
    propertyType: "Cabin",
    amenities: ["Wifi", "Kitchen", "Free parking"],
    instantBook: true,
  },
  {
    id: 4,
    title: "Luxury Penthouse with City Views",
    location: "Miami, Florida",
    distance: "15 miles away",
    dates: "Nov 20-25",
    price: 400,
    rating: 4.9,
    reviews: 102,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: false,
    propertyType: "Apartment",
    amenities: ["Wifi", "Pool", "TV", "Kitchen"],
    instantBook: true,
  },
  {
    id: 5,
    title: "Charming Cottage in Wine Country",
    location: "Napa Valley, California",
    distance: "60 miles away",
    dates: "Dec 10-15",
    price: 225,
    rating: 4.95,
    reviews: 78,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: true,
    propertyType: "House",
    amenities: ["Wifi", "Kitchen", "Free parking"],
    instantBook: false,
  },
  {
    id: 6,
    title: "Historic Brownstone",
    location: "Boston, Massachusetts",
    distance: "5 miles away",
    dates: "Nov 15-20",
    price: 275,
    rating: 4.88,
    reviews: 65,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: false,
    propertyType: "Apartment",
    amenities: ["Wifi", "TV", "Kitchen"],
    instantBook: true,
  },
  {
    id: 7,
    title: "Lakefront Cabin with Private Dock",
    location: "Lake Tahoe, Nevada",
    distance: "150 miles away",
    dates: "Dec 5-10",
    price: 300,
    rating: 4.97,
    reviews: 91,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: true,
    propertyType: "Cabin",
    amenities: ["Wifi", "TV", "Kitchen", "Free parking"],
    instantBook: false,
  },
  {
    id: 8,
    title: "Desert Oasis with Pool",
    location: "Palm Springs, California",
    distance: "110 miles away",
    dates: "Nov 25-30",
    price: 250,
    rating: 4.89,
    reviews: 73,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: false,
    propertyType: "House",
    amenities: ["Pool", "TV", "Kitchen", "Free parking"],
    instantBook: true,
  },
  {
    id: 9,
    title: "Ski-in/Ski-out Mountain Condo",
    location: "Park City, Utah",
    distance: "200 miles away",
    dates: "Dec 15-20",
    price: 280,
    rating: 4.91,
    reviews: 85,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: true,
    propertyType: "Condo",
    amenities: ["Wifi", "TV", "Kitchen"],
    instantBook: true,
  },
  {
    id: 10,
    title: "Trendy Downtown Hotel Suite",
    location: "Chicago, Illinois",
    distance: "10 miles away",
    dates: "Nov 10-15",
    price: 180,
    rating: 4.87,
    reviews: 112,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: false,
    propertyType: "Hotel",
    amenities: ["Wifi", "TV"],
    instantBook: true,
  },
  {
    id: 11,
    title: "Beachside Bungalow",
    location: "San Diego, California",
    distance: "80 miles away",
    dates: "Dec 7-12",
    price: 195,
    rating: 4.93,
    reviews: 67,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: true,
    propertyType: "House",
    amenities: ["Wifi", "Kitchen", "Free parking", "Pets allowed"],
    instantBook: false,
  },
  {
    id: 12,
    title: "Urban Loft with Skyline View",
    location: "Seattle, Washington",
    distance: "5 miles away",
    dates: "Nov 18-23",
    price: 220,
    rating: 4.86,
    reviews: 94,
    images: ["/placeholder.svg?height=500&width=500"],
    superhost: false,
    propertyType: "Loft",
    amenities: ["Wifi", "TV", "Kitchen"],
    instantBook: true,
  },
]

interface PropertyGridProps {
  filters?: any
}

export function PropertyGrid({ filters }: PropertyGridProps) {
  const [filteredProperties, setFilteredProperties] = useState(allProperties)
  const [favorites, setFavorites] = useState<number[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!filters) {
      setFilteredProperties(allProperties)
      return
    }

    let result = [...allProperties]

    // Filter by property type
    if (filters.propertyType.length > 0) {
      result = result.filter((property) => filters.propertyType.includes(property.propertyType))
    }

    // Filter by price range
    result = result.filter(
      (property) => property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1],
    )

    // Filter by amenities
    if (filters.amenities.length > 0) {
      result = result.filter((property) => filters.amenities.every((amenity: any) => property.amenities.includes(amenity)))
    }

    // Filter by instant book
    if (filters.instantBook) {
      result = result.filter((property) => property.instantBook)
    }

    setFilteredProperties(result)
  }, [filters])

  // Fetch user favorites when user is logged in
  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const response = await fetch("/api/user/favorites")
          const data = await response.json()

          if (data.success) {
            setFavorites(data.favorites.map((fav: any) => fav.id))
          }
        } catch (error) {
          console.error("Error fetching favorites:", error)
        }
      }

      fetchFavorites()
    }
  }, [user])

  const toggleFavorite = async (propertyId: number, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save favorites",
        variant: "destructive",
      })
      return
    }

    try {
      if (favorites.includes(propertyId)) {
        // Remove from favorites
        await fetch(`/api/user/favorites?propertyId=${propertyId}`, {
          method: "DELETE",
        })

        setFavorites(favorites.filter((id) => id !== propertyId))
        toast({
          title: "Removed from favorites",
          description: "Property has been removed from your favorites",
        })
      } else {
        // Add to favorites
        await fetch("/api/user/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId }),
        })

        setFavorites([...favorites, propertyId])
        toast({
          title: "Added to favorites",
          description: "Property has been added to your favorites",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating favorites",
        variant: "destructive",
      })
    }
  }

  if (filteredProperties.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-medium mb-2">No properties match your filters</h3>
        <p className="text-gray-500 mb-6">Try adjusting your search by removing some filters.</p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProperties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link href={`/property/${property.id}`} className="group block">
            <div className="space-y-3">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {property.superhost && (
                  <Badge className="absolute top-3 left-3 bg-white text-black hover:bg-gray-100">Superhost</Badge>
                )}
                <button
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  onClick={(e) => toggleFavorite(property.id, e)}
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.includes(property.id) ? "fill-rose-500 text-rose-500" : "text-gray-600"}`}
                  />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{property.location}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1">{property.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500">{property.distance}</p>
                <p className="text-gray-500">{property.dates}</p>
                <p className="font-medium">
                  ${property.price} <span className="font-normal">night</span>
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
