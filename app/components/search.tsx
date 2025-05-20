"use client"

import { useState } from "react"
import { SearchIcon, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMobile } from "@/hooks/use-mobile"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Search() {
  const isMobile = useMobile()
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState<string>("1")
  const [location, setLocation] = useState<string>("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearch = () => {
    // In a real app, this would navigate to search results
    console.log({
      location,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
    })
  }

  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            className="pl-10 rounded-full"
            placeholder="Where to?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button size="icon" className="rounded-full" variant="ghost">
          <MapPin className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Tabs defaultValue="stays">
        <TabsList className="mb-6">
          <TabsTrigger value="stays">Stays</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="online-experiences">Online Experiences</TabsTrigger>
        </TabsList>
        <TabsContent value="stays" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="font-medium">Location</label>
              <Input
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Check in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Check out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    initialFocus
                    disabled={(date) => {
                      // Disable dates before check-in date
                      if (checkInDate) {
                        return date < checkInDate
                      }
                      return date < new Date()
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Guests</label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue placeholder="Select guests" />
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

          <div className="flex justify-end">
            <motion.button
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
            >
              <SearchIcon className="h-4 w-4" />
              Search
            </motion.button>
          </div>
        </TabsContent>

        <TabsContent value="experiences">
          <div className="h-40 flex items-center justify-center text-gray-500">Experiences search coming soon</div>
        </TabsContent>

        <TabsContent value="online-experiences">
          <div className="h-40 flex items-center justify-center text-gray-500">
            Online experiences search coming soon
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
