"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Category {
  label: string
  icon: React.ReactNode
  id: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onChange: (category: string | null) => void
}

export function CategoryFilter({ categories, selectedCategory, onChange }: CategoryFilterProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const checkScroll = () => {
    const container = containerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      checkScroll()
      container.addEventListener("scroll", checkScroll)
      window.addEventListener("resize", checkScroll)

      return () => {
        container.removeEventListener("scroll", checkScroll)
        window.removeEventListener("resize", checkScroll)
      }
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current
    if (container) {
      const scrollAmount = 320
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  return (
    <div className="relative">
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-md border"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={containerRef}
        className="flex items-center gap-8 overflow-x-auto py-4 px-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onChange(selectedCategory === category.id ? null : category.id)}
            className={cn(
              "flex flex-col items-center gap-2 min-w-[56px] transition-opacity",
              selectedCategory === category.id ? "opacity-100" : "opacity-60",
            )}
          >
            <div className="relative">
              {category.icon}
              {selectedCategory === category.id && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-black rounded-full" />
              )}
            </div>
            <span className="text-xs whitespace-nowrap">{category.label}</span>
          </button>
        ))}
      </div>

      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-md border"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
