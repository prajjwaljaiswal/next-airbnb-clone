import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real app, you would validate credentials against a database
    // This is a mock implementation
    if (email && password) {
      // Mock successful login
      if (email === "user@example.com" && password === "password") {
        return NextResponse.json(
          {
            success: true,
            user: {
              id: "user-123",
              name: "John Doe",
              email: "user@example.com",
              image: "/placeholder.svg?height=200&width=200",
            },
            token: "mock-jwt-token",
          },
          { status: 200 },
        )
      }

      // Mock failed login
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Email and password are required",
      },
      { status: 400 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 },
    )
  }
}
