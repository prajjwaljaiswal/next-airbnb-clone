import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // In a real app, you would send a password reset email
    // This is a mock implementation
    if (email) {
      // Mock successful request
      return NextResponse.json(
        {
          success: true,
          message: "Password reset link has been sent to your email",
        },
        { status: 200 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Email is required",
      },
      { status: 400 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 },
    )
  }
}
