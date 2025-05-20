import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // In a real app, you would get the user ID from the JWT token
    // and fetch the booking data from a database
    // This is a mock implementation

    // Mock booking data
    const bookings = [
      {
        id: "booking-1",
        propertyId: 1,
        propertyName: "Beachfront Villa with Ocean View",
        location: "Malibu, California",
        checkIn: "2023-11-12",
        checkOut: "2023-11-17",
        guests: 2,
        totalPrice: 1750,
        status: "upcoming",
        image: "/placeholder.svg?height=500&width=500",
      },
      {
        id: "booking-2",
        propertyId: 3,
        propertyName: "Cozy Mountain Cabin",
        location: "Aspen, Colorado",
        checkIn: "2023-10-05",
        checkOut: "2023-10-10",
        guests: 4,
        totalPrice: 875,
        status: "completed",
        image: "/placeholder.svg?height=500&width=500",
      },
      {
        id: "booking-3",
        propertyId: 5,
        propertyName: "Charming Cottage in Wine Country",
        location: "Napa Valley, California",
        checkIn: "2023-09-15",
        checkOut: "2023-09-20",
        guests: 2,
        totalPrice: 1125,
        status: "completed",
        image: "/placeholder.svg?height=500&width=500",
      },
    ]

    // Mock successful response
    return NextResponse.json(
      {
        success: true,
        bookings,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching booking history",
      },
      { status: 500 },
    )
  }
}
