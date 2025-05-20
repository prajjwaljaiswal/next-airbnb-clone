import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // In a real app, you would validate and store user data in a database
    // This is a mock implementation
    if (name && email && password) {
      // Check if email is already in use (mock check)
      if (email === "user@example.com") {
        return NextResponse.json(
          {
            success: false,
            message: "Email is already in use",
          },
          { status: 409 },
        )
      }

      // Mock successful registration
      return NextResponse.json(
        {
          success: true,
          user: {
            id: "new-user-123",
            name,
            email,
            image: "/placeholder.svg?height=200&width=200",
          },
          token: "mock-jwt-token",
        },
        { status: 201 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Name, email, and password are required",
      },
      { status: 400 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during registration",
      },
      { status: 500 },
    )
  }
}
