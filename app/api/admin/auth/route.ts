import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const correctPassword = process.env.ADMIN_PASSWORD || "beduk123";

    if (password === correctPassword) {
      // Return the token (we can just use the password itself as a simple bearer token)
      return NextResponse.json({ success: true, token: password });
    } else {
      return NextResponse.json(
        { error: "Geçersiz şifre." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Admin Auth error:", error);
    return NextResponse.json(
      { error: "Giriş yapılırken bir hata oluştu." },
      { status: 500 }
    );
  }
}
