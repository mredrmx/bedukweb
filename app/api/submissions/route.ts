import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, category, message } = body;

    // Basic validation
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Ad Soyad, Telefon ve Mesaj alanları zorunludur." },
        { status: 400 }
      );
    }

    const saved = await saveSubmission({
      name,
      phone,
      email: email || "",
      category: category || "diger",
      message,
    });

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: any) {
    console.error("Submissions POST error:", error);
    return NextResponse.json(
      { error: "Başvuru kaydedilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
