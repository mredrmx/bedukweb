import { NextResponse } from "next/server";
import { getSubmissions, updateSubmissionStatus, deleteSubmission } from "@/lib/db";

// Helper to check if authorized
function isAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.split(" ")[1];
  const correctPassword = process.env.ADMIN_PASSWORD || "beduk123";
  return token === correctPassword;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const list = await getSubmissions();
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    console.error("Admin GET submissions error:", error);
    return NextResponse.json(
      { error: "Başvurular yüklenirken hata oluştu." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Başvuru ID ve yeni durum alanları zorunludur." },
        { status: 400 }
      );
    }

    const updated = await updateSubmissionStatus(id, status);
    if (updated) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Güncellenecek başvuru bulunamadı." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Admin PATCH submission error:", error);
    return NextResponse.json(
      { error: "Başvuru güncellenirken hata oluştu." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Silinecek başvuru ID'si belirtilmelidir." },
        { status: 400 }
      );
    }

    const deleted = await deleteSubmission(id);
    if (deleted) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Silinecek başvuru bulunamadı." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Admin DELETE submission error:", error);
    return NextResponse.json(
      { error: "Başvuru silinirken hata oluştu." },
      { status: 500 }
    );
  }
}
