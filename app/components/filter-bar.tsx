"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Home,
  Building2,
  Warehouse,
  TreePine,
  Palmtree,
  Mountain,
  Building,
  Hotel,
  Wifi,
  Car,
  PocketIcon as Pool,
  Tv,
  Utensils,
  Dog,
  X,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useMobile } from "@/hooks/use-mobile"

export type FilterOptions = {
  propertyType: string[]
  priceRange: [number, number]
  amenities: string[]
  instantBook: boolean
}

const propertyTypes = [
  { name: "House", icon: Home },
  { name: "Apartment", icon: Building2 },
  { name: "Loft", icon: Warehouse },
  { name: "Cabin", icon: TreePine },
  { name: "Beach", icon: Palmtree },
  { name: "Mountain", icon: Mountain },
  { name: "Condo", icon: Building },
  { name: "Hotel", icon: Hotel },
]

const amenities = [
  { name: "Wifi", icon: Wifi },
  { name: "Free parking", icon: Car },
  { name: "Pool", icon: Pool },
  { name: "TV", icon: Tv },
  { name: "Kitchen", icon: Utensils },
  { name: "Pets allowed", icon: Dog },
]

const initialFilters: FilterOptions = {
  propertyType: [],
  priceRange: [50, 1000],
  amenities: [],
  instantBook: false,
}

export function FilterBar({ onFilterChange }: { onFilterChange: (filters: FilterOptions) => void }) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [tempFilters, setTempFilters] = useState<FilterOptions>(initialFilters)
  const isMobile = useMobile()

  // Update active filters count
  useEffect(() => {
    const active = []
    if (filters.propertyType.length > 0) active.push("Property type")
    if (
      filters.priceRange[0] !== initialFilters.priceRange[0] ||
      filters.priceRange[1] !== initialFilters.priceRange[1]
    )
      active.push("Price")
    if (filters.amenities.length > 0) active.push("Amenities")
    if (filters.instantBook) active.push("Instant Book")
    setActiveFilters(active)
  }, [filters])

  // Apply filters to parent component
  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handlePropertyTypeClick = (type: string) => {
    setTempFilters((prev) => {
      if (prev.propertyType.includes(type)) {
        return { ...prev, propertyType: prev.propertyType.filter((t) => t !== type) }
      } else {
        return { ...prev, propertyType: [...prev.propertyType, type] }
      }
    })
  }

  const handleAmenityClick = (amenity: string) => {
    setTempFilters((prev) => {
      if (prev.amenities.includes(amenity)) {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== amenity) }
      } else {
        return { ...prev, amenities: [...prev.amenities, amenity] }
      }
    })
  }

  const handlePriceChange = (value: number[]) => {
    setTempFilters((prev) => ({ ...prev, priceRange: [value[0], value[1]] }))
  }

  const handleInstantBookChange = (checked: boolean) => {
    setTempFilters((prev) => ({ ...prev, instantBook: checked }))
  }

  const applyFilters = () => {
    setFilters(tempFilters)
  }

  const clearFilters = () => {
    setTempFilters(initialFilters)
    setFilters(initialFilters)
  }

  const removeFilter = (filter: string) => {
    if (filter === "Property type") {
      setFilters((prev) => ({ ...prev, propertyType: [] }))
      setTempFilters((prev) => ({ ...prev, propertyType: [] }))
    } else if (filter === "Price") {
      setFilters((prev) => ({ ...prev, priceRange: initialFilters.priceRange }))
      setTempFilters((prev) => ({ ...prev, priceRange: initialFilters.priceRange }))
    } else if (filter === "Amenities") {
      setFilters((prev) => ({ ...prev, amenities: [] }))
      setTempFilters((prev) => ({ ...prev, amenities: [] }))
    } else if (filter === "Instant Book") {
      setFilters((prev) => ({ ...prev, instantBook: false }))
      setTempFilters((prev) => ({ ...prev, instantBook: false }))
    }
  }

  // Mobile filter sheet
  if (isMobile) {
    return (
      <div className="flex items-center justify-between py-4 overflow-x-auto">
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                Filters
                {activeFilters.length > 0 && <Badge className="ml-2 bg-black text-white">{activeFilters.length}</Badge>}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
              <SheetHeader className="text-left">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>

              <div className="overflow-y-auto h-[calc(100%-10rem)] py-4">
                {/* Property Type */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">Property Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {propertyTypes.map((type) => {
                      const isSelected = tempFilters.propertyType.includes(type.name)
                      return (
                        <Button
                          key={type.name}
                          variant={isSelected ? "default" : "outline"}
                          className={`h-24 flex flex-col justify-center items-center ${
                            isSelected ? "bg-black text-white" : ""
                          }`}
                          onClick={() => handlePropertyTypeClick(type.name)}
                        >
                          <type.icon className="h-6 w-6 mb-2" />
                          <span>{type.name}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={tempFilters.priceRange}
                      min={0}
                      max={2000}
                      step={10}
                      onValueChange={handlePriceChange}
                    />
                    <div className="flex justify-between mt-4">
                      <div className="border rounded p-3 w-[48%]">
                        <p className="text-xs text-gray-500">min price</p>
                        <p className="font-medium">${tempFilters.priceRange[0]}</p>
                      </div>
                      <div className="border rounded p-3 w-[48%]">
                        <p className="text-xs text-gray-500">max price</p>
                        <p className="font-medium">${tempFilters.priceRange[1]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {amenities.map((amenity) => {
                      const isSelected = tempFilters.amenities.includes(amenity.name)
                      return (
                        <Button
                          key={amenity.name}
                          variant={isSelected ? "default" : "outline"}
                          className={`justify-start ${isSelected ? "bg-black text-white" : ""}`}
                          onClick={() => handleAmenityClick(amenity.name)}
                        >
                          <amenity.icon className="h-4 w-4 mr-2" />
                          <span>{amenity.name}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Instant Book */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Instant Book</h3>
                    <p className="text-sm text-gray-500">Book without waiting for host approval</p>
                  </div>
                  <Switch checked={tempFilters.instantBook} onCheckedChange={handleInstantBookChange} />
                </div>
              </div>

              <SheetFooter className="flex-row justify-between border-t pt-4">
                <Button variant="link" onClick={clearFilters}>
                  Clear all
                </Button>
                <SheetClose asChild>
                  <Button onClick={applyFilters}>Show results</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Active filter badges */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="outline" className="rounded-full flex items-center gap-1 whitespace-nowrap">
                {filter}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter(filter)}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Desktop filter bar
  return (
    <div className="py-4">
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {/* Property type filters */}
        <div className="flex gap-2">
          {propertyTypes.map((type) => {
            const isSelected = filters.propertyType.includes(type.name)
            return (
              <Button
                key={type.name}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`rounded-full flex items-center gap-2 whitespace-nowrap ${
                  isSelected ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  if (isSelected) {
                    setFilters({
                      ...filters,
                      propertyType: filters.propertyType.filter((t) => t !== type.name),
                    })
                  } else {
                    setFilters({
                      ...filters,
                      propertyType: [...filters.propertyType, type.name],
                    })
                  }
                }}
              >
                <type.icon className="h-4 w-4" />
                <span>{type.name}</span>
              </Button>
            )
          })}
        </div>

        {/* Price filter */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={
                filters.priceRange[0] !== initialFilters.priceRange[0] ||
                filters.priceRange[1] !== initialFilters.priceRange[1]
                  ? "default"
                  : "outline"
              }
              size="sm"
              className={`rounded-full ${
                filters.priceRange[0] !== initialFilters.priceRange[0] ||
                filters.priceRange[1] !== initialFilters.priceRange[1]
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              Price
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Price Range</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <Slider
                defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                min={0}
                max={2000}
                step={10}
                onValueChange={(value) => {
                  setTempFilters({ ...tempFilters, priceRange: [value[0], value[1]] })
                }}
              />
              <div className="flex justify-between mt-6">
                <div className="border rounded p-3 w-[48%]">
                  <p className="text-xs text-gray-500">min price</p>
                  <p className="font-medium">${tempFilters.priceRange[0]}</p>
                </div>
                <div className="border rounded p-3 w-[48%]">
                  <p className="text-xs text-gray-500">max price</p>
                  <p className="font-medium">${tempFilters.priceRange[1]}</p>
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  onClick={() => {
                    setFilters({ ...filters, priceRange: tempFilters.priceRange })
                  }}
                >
                  Apply
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Amenities filter */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={filters.amenities.length > 0 ? "default" : "outline"}
              size="sm"
              className={`rounded-full ${filters.amenities.length > 0 ? "bg-black text-white" : ""}`}
            >
              Amenities
              {filters.amenities.length > 0 && (
                <Badge className="ml-2 bg-white text-black">{filters.amenities.length}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Amenities</SheetTitle>
            </SheetHeader>
            <div className="py-6 grid grid-cols-2 gap-3">
              {amenities.map((amenity) => {
                const isSelected = tempFilters.amenities.includes(amenity.name)
                return (
                  <Button
                    key={amenity.name}
                    variant={isSelected ? "default" : "outline"}
                    className={`justify-start ${isSelected ? "bg-black text-white" : ""}`}
                    onClick={() => handleAmenityClick(amenity.name)}
                  >
                    <amenity.icon className="h-4 w-4 mr-2" />
                    <span>{amenity.name}</span>
                  </Button>
                )
              })}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  onClick={() => {
                    setFilters({ ...filters, amenities: tempFilters.amenities })
                  }}
                >
                  Apply
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Instant Book filter */}
        <Button
          variant={filters.instantBook ? "default" : "outline"}
          size="sm"
          className={`rounded-full ${filters.instantBook ? "bg-black text-white" : ""}`}
          onClick={() => {
            setFilters({ ...filters, instantBook: !filters.instantBook })
          }}
        >
          Instant Book
        </Button>

        {/* Clear filters */}
        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>
    </div>
  )
}
