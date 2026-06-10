import { NextResponse } from "next/server";
import { getCategories, saveCategory } from "@/lib/db";
import { isAuthorized } from "@/lib/auth";

export async function GET() {
  try {
    const list = await getCategories();
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    console.error("GET categories error:", error);
    return NextResponse.json(
      { error: "Kategoriler yüklenirken hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json(
        { error: "Kategori kodu ve kategori ismi alanları zorunludur." },
        { status: 400 }
      );
    }

    const cleanedId = id.toLowerCase().trim().replace(/[^a-z0-9-]/g, "");
    if (!cleanedId) {
      return NextResponse.json(
        { error: "Geçersiz kategori kodu. Sadece harf, rakam ve tire (-) içerebilir." },
        { status: 400 }
      );
    }

    const created = await saveCategory({ id: cleanedId, name: name.trim() });
    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error("POST category error:", error);
    return NextResponse.json(
      { error: "Kategori kaydedilirken hata oluştu." },
      { status: 500 }
    );
  }
}
