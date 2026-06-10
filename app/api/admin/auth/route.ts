import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const correctUsername = process.env.ADMIN_USERNAME || "admin";
    const correctPassword = process.env.ADMIN_PASSWORD || "beduk123";

    if (username === correctUsername && password === correctPassword) {
      // Return the token as base64 representation of username:password
      const token = Buffer.from(`${username}:${password}`).toString("base64");
      return NextResponse.json({ success: true, token });
    } else {
      return NextResponse.json(
        { error: "Geçersiz kullanıcı adı veya şifre." },
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
