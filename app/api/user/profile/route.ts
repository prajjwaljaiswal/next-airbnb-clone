import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // In a real app, you would get the user ID from the JWT token
    // and fetch the user data from a database
    // This is a mock implementation

    // Mock successful response
    return NextResponse.json(
      {
        success: true,
        user: {
          id: "user-123",
          name: "John Doe",
          email: "user@example.com",
          phone: "+1 (555) 123-4567",
          address: "123 Main St, New York, NY 10001",
          bio: "Travel enthusiast and food lover. Always looking for new adventures!",
          image: "/placeholder.svg?height=200&width=200",
          createdAt: "2021-01-01T00:00:00.000Z",
        },
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching user profile",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, address, bio } = body

    // In a real app, you would update the user data in a database
    // This is a mock implementation

    // Mock successful update
    return NextResponse.json(
      {
        success: true,
        user: {
          id: "user-123",
          name: name || "John Doe",
          email: "user@example.com",
          phone: phone || "+1 (555) 123-4567",
          address: address || "123 Main St, New York, NY 10001",
          bio: bio || "Travel enthusiast and food lover. Always looking for new adventures!",
          image: "/placeholder.svg?height=200&width=200",
          createdAt: "2021-01-01T00:00:00.000Z",
        },
        message: "Profile updated successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while updating user profile",
      },
      { status: 500 },
    )
  }
}
