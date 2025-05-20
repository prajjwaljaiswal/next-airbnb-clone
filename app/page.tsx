"use client"

import { useState } from "react"
import { Search } from "./components/search"
import { PropertyGrid } from "./components/property-grid"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { FilterBar, type FilterOptions } from "./components/filter-bar"
import { CategoryFilter } from "./components/category-filter"
import {
  Warehouse,
  TreePine,
  Palmtree,
  Mountain,
  Building,
  Hotel,
  Tent,
  Castle,
  SailboatIcon as Boat,
  Landmark,
  Snowflake,
  Flame,
} from "lucide-react"

const categories = [
  { id: "amazing-views", label: "Amazing views", icon: <Mountain className="h-6 w-6" /> },
  { id: "beach", label: "Beach", icon: <Palmtree className="h-6 w-6" /> },
  { id: "cabins", label: "Cabins", icon: <TreePine className="h-6 w-6" /> },
  { id: "mansions", label: "Mansions", icon: <Castle className="h-6 w-6" /> },
  { id: "tiny-homes", label: "Tiny homes", icon: <Building className="h-6 w-6" /> },
  { id: "camping", label: "Camping", icon: <Tent className="h-6 w-6" /> },
  { id: "boats", label: "Boats", icon: <Boat className="h-6 w-6" /> },
  { id: "lakefront", label: "Lakefront", icon: <Warehouse className="h-6 w-6" /> },
  { id: "ski-in-out", label: "Ski-in/out", icon: <Snowflake className="h-6 w-6" /> },
  { id: "tropical", label: "Tropical", icon: <Palmtree className="h-6 w-6" /> },
  { id: "countryside", label: "Countryside", icon: <Mountain className="h-6 w-6" /> },
  { id: "historical", label: "Historical", icon: <Landmark className="h-6 w-6" /> },
  { id: "trending", label: "Trending", icon: <Flame className="h-6 w-6" /> },
  { id: "apartments", label: "Apartments", icon: <Building className="h-6 w-6" /> },
  { id: "hotels", label: "Hotels", icon: <Hotel className="h-6 w-6" /> },
]

export default function HomePage() {
  const [filters, setFilters] = useState<FilterOptions | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)

    // If a category is selected, update property type filter
    if (category) {
      let propertyType: string[] = []

      // Map category to property type
      switch (category) {
        case "cabins":
          propertyType = ["Cabin"]
          break
        case "beach":
          propertyType = ["Beach"]
          break
        case "apartments":
          propertyType = ["Apartment"]
          break
        case "tiny-homes":
          propertyType = ["House"]
          break
        case "hotels":
          propertyType = ["Hotel"]
          break
        default:
          propertyType = []
      }

      setFilters((prev) => ({
        ...(prev || {
          propertyType: [],
          priceRange: [50, 1000],
          amenities: [],
          instantBook: false,
        }),
        propertyType,
      }))
    } else {
      // If no category is selected, clear property type filter
      setFilters((prev) => (prev ? { ...prev, propertyType: [] } : undefined))
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-8">
          <Search />
        </section>

        <section className="container mx-auto px-4">
          <CategoryFilter categories={categories} selectedCategory={selectedCategory} onChange={handleCategoryChange} />
        </section>

        <section className="container mx-auto px-4">
          <FilterBar onFilterChange={handleFilterChange} />
        </section>

        <section className="container mx-auto px-4 py-4">
          <h2 className="text-2xl font-bold mb-6">Places to stay</h2>
          <PropertyGrid filters={filters} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
