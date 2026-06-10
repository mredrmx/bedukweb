import { NextResponse } from "next/server";
import { getProducts, saveProduct, updateProduct, deleteProduct } from "@/lib/db";
import { isAuthorized } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const showAll = isAuthorized(request);
    const list = await getProducts(showAll);
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    console.error("GET products error:", error);
    return NextResponse.json(
      { error: "Ürünler yüklenirken hata oluştu." },
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
    const { category, name, description, imageUrl, specs, brand, sortOrder, isActive } = body;

    if (!category || !name || !description || !imageUrl) {
      return NextResponse.json(
        { error: "Kategori, isim, açıklama ve görsel alanları zorunludur." },
        { status: 400 }
      );
    }

    const created = await saveProduct({
      category,
      name,
      description,
      imageUrl,
      specs: specs || [],
      brand: brand || "",
      sortOrder: sortOrder || 0,
      isActive: isActive !== undefined ? !!isActive : true,
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error("POST product error:", error);
    return NextResponse.json(
      { error: "Ürün kaydedilirken hata oluştu." },
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Ürün ID'si belirtilmelidir." },
        { status: 400 }
      );
    }

    const updated = await updateProduct(id, updates);
    if (updated) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Güncellenecek ürün bulunamadı." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("PATCH product error:", error);
    return NextResponse.json(
      { error: "Ürün güncellenirken hata oluştu." },
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
        { error: "Silinecek ürün ID'si belirtilmelidir." },
        { status: 400 }
      );
    }

    const deleted = await deleteProduct(id);
    if (deleted) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Silinecek ürün bulunamadı." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json(
      { error: "Ürün silinirken hata oluştu." },
      { status: 500 }
    );
  }
}
