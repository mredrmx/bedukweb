import fs from "fs/promises";
import path from "path";

export interface Submission {
  id: string | number;
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  status: string; // 'Bekliyor' or 'Dönüş Yapıldı'
  createdAt: string;
}

// Determine if we should use Postgres or JSON fallback
const isPostgres = !!process.env.POSTGRES_URL;

const JSON_FILE_PATH = path.join(process.cwd(), "submissions.json");

// Helper to ensure JSON file exists
async function ensureJsonFile() {
  try {
    await fs.access(JSON_FILE_PATH);
  } catch {
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

// Helper to ensure Postgres table exists
async function ensurePostgresTable() {
  if (!isPostgres) return;
  const { sql } = require("@vercel/postgres");
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        category VARCHAR(100),
        message TEXT,
        status VARCHAR(50) DEFAULT 'Bekliyor',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error("Error creating Postgres table:", error);
  }
}

export async function getSubmissions(): Promise<Submission[]> {
  if (isPostgres) {
    await ensurePostgresTable();
    const { sql } = require("@vercel/postgres");
    try {
      const { rows } = await sql`
        SELECT id, name, phone, email, category, message, status, created_at as "createdAt"
        FROM submissions
        ORDER BY created_at DESC
      `;
      return rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email || "",
        category: row.category || "",
        message: row.message || "",
        status: row.status || "Bekliyor",
        createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Postgres getSubmissions error, falling back to JSON:", error);
    }
  }

  // Fallback / local JSON
  await ensureJsonFile();
  const data = await fs.readFile(JSON_FILE_PATH, "utf-8");
  const parsed = JSON.parse(data);
  return parsed.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveSubmission(submission: Omit<Submission, "id" | "status" | "createdAt">): Promise<Submission> {
  const newSubmission = {
    name: submission.name,
    phone: submission.phone,
    email: submission.email,
    category: submission.category,
    message: submission.message,
    status: "Bekliyor",
  };

  if (isPostgres) {
    await ensurePostgresTable();
    const { sql } = require("@vercel/postgres");
    try {
      const { rows } = await sql`
        INSERT INTO submissions (name, phone, email, category, message, status)
        VALUES (${newSubmission.name}, ${newSubmission.phone}, ${newSubmission.email}, ${newSubmission.category}, ${newSubmission.message}, ${newSubmission.status})
        RETURNING id, name, phone, email, category, message, status, created_at as "createdAt"
      `;
      const row = rows[0];
      return {
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email || "",
        category: row.category || "",
        message: row.message || "",
        status: row.status || "Bekliyor",
        createdAt: new Date(row.createdAt).toISOString(),
      };
    } catch (error) {
      console.error("Postgres saveSubmission error, falling back to JSON:", error);
    }
  }

  // Fallback / local JSON
  await ensureJsonFile();
  const data = await fs.readFile(JSON_FILE_PATH, "utf-8");
  const list: Submission[] = JSON.parse(data);
  
  const created: Submission = {
    id: Date.now(),
    ...newSubmission,
    createdAt: new Date().toISOString(),
  };
  
  list.push(created);
  await fs.writeFile(JSON_FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  return created;
}

export async function updateSubmissionStatus(id: string | number, status: string): Promise<boolean> {
  if (isPostgres) {
    await ensurePostgresTable();
    const { sql } = require("@vercel/postgres");
    try {
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;
      if (!isNaN(numericId)) {
        await sql`
          UPDATE submissions
          SET status = ${status}
          WHERE id = ${numericId}
        `;
        return true;
      }
    } catch (error) {
      console.error("Postgres updateSubmissionStatus error, falling back to JSON:", error);
    }
  }

  // Fallback / local JSON
  await ensureJsonFile();
  const data = await fs.readFile(JSON_FILE_PATH, "utf-8");
  const list: Submission[] = JSON.parse(data);
  
  const targetIdStr = String(id);
  const index = list.findIndex((item) => String(item.id) === targetIdStr);
  if (index !== -1) {
    list[index].status = status;
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
    return true;
  }
  return false;
}

export async function deleteSubmission(id: string | number): Promise<boolean> {
  if (isPostgres) {
    await ensurePostgresTable();
    const { sql } = require("@vercel/postgres");
    try {
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;
      if (!isNaN(numericId)) {
        await sql`
          DELETE FROM submissions
          WHERE id = ${numericId}
        `;
        return true;
      }
    } catch (error) {
      console.error("Postgres deleteSubmission error, falling back to JSON:", error);
    }
  }

  // Fallback / local JSON
  await ensureJsonFile();
  const data = await fs.readFile(JSON_FILE_PATH, "utf-8");
  const list: Submission[] = JSON.parse(data);
  
  const targetIdStr = String(id);
  const newList = list.filter((item) => String(item.id) !== targetIdStr);
  if (newList.length !== list.length) {
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(newList, null, 2), "utf-8");
    return true;
  }
  return false;
}

// ==========================================
// CATEGORIES & PRODUCTS DATABASE LOGIC
// ==========================================

export interface Category {
  id: string; // e.g. "pvc"
  name: string; // e.g. "PVC Kapı ve Pencere Sistemleri"
}

export interface Product {
  id: string | number;
  category: string; // "pvc" | "cam-balkon" | "giyotin" | "pergola" | "aluminyum" or dynamic
  name: string;
  description: string;
  imageUrl: string;
  specs: string[];
  brand?: string;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
}

const CATEGORIES_JSON_FILE_PATH = path.join(process.cwd(), "categories.json");
const PRODUCTS_JSON_FILE_PATH = path.join(process.cwd(), "products.json");

const SEED_CATEGORIES: Category[] = [
  { id: "pvc", name: "PVC Kapı ve Pencere Sistemleri" },
  { id: "cam-balkon", name: "Cam Balkon Sistemleri" },
  { id: "giyotin", name: "Giyotin Cam Sistemleri" },
  { id: "pergola", name: "Kış Bahçesi & Bioklimatik Pergola" },
  { id: "aluminyum", name: "Alüminyum & Mimari" },
];

const SEED_PRODUCTS: Omit<Product, "id" | "createdAt">[] = [
  {
    category: "pvc",
    name: "İnova 76",
    description: "76 mm genişliğindeki özel tasarım profil yapısı ile yüksek ses ve ısı yalıtımı arayan konut projeleri için ideal çözümdür. Geniş yanak odacıklarıyla statik dayanımı üst düzeydedir.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_607933fb1cfd45f2b041129ba5d88d7f~mv2.jpg",
    brand: "ASAŞPEN",
    specs: ["76 mm Geniş Profil Yanakları", "Çok Odacıklı Isı/Ses Yalıtım Odaları", "Estetik Köşe Birleşim Noktaları", "10 Yıl Sistem ve Malzeme Garantisi"],
    sortOrder: 1,
    isActive: true
  },
  {
    category: "pvc",
    name: "İnova 76 Orta Contalı",
    description: "İç, dış ve orta olmak üzere 3'lü conta bariyeri ile Karadeniz'in şiddetli rüzgar ve yağmurlarına karşı %100 sızdırmazlık sunar.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_895993fb02414881828ae4131d6763f9~mv2.jpeg",
    brand: "ASAŞPEN",
    specs: ["3 Conta Bariyerli Sızdırmazlık", "Yüksek Basınçlı Rüzgar Mukavemeti", "Çift ve Üçlü Isıcam Alternatifleri", "Enerji Tasarruflu Profil Yapısı"],
    sortOrder: 2,
    isActive: true
  },
  {
    category: "pvc",
    name: "İnova Yalıtımlı Sürme",
    description: "Geniş açılımlı kapılar için tasarlanan, fırça yerine özel contalarla basarak sızdırmazlık değerlerini maksimuma çıkaran sürme seri.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_78b30133006146d19602edfaecc3bed4~mv2.jpg",
    brand: "ASAŞPEN",
    specs: ["Özel Conta Baskı Teknolojisi", "Sürtünmesiz Sessiz Kayar Raylar", "Geniş Görüş Alanlı Cam Açıklığı", "Maksimum Hava ve Su Yalıtımı"],
    sortOrder: 3,
    isActive: true
  },
  {
    category: "pvc",
    name: "Hebe-Schiebe (Kaldırmalı Sürme)",
    description: "Lüks mimari projelerde, devasa cam panellerin tek parmak hareketiyle kaldırılıp sessizce yana kaydırılmasını sağlayan üst düzey mekanizma.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_d4841e9faa2949ec95c590ed84f163c9~mv2.jpeg",
    brand: "ASAŞPEN",
    specs: ["Kaldırmalı/Sürmeli Güçlü Mekanizma", "400 kg Yük Taşıma Kapasitesi", "Eşik Yüksekliği Olmayan Tasarım", "Lüks Mimari Ayrıcalıklar"],
    sortOrder: 4,
    isActive: true
  },
  {
    category: "pvc",
    name: "Sürme Sistem 74",
    description: "Ekonomik, pratik ve yalıtım değerlerini koruyan, balkon çıkışları ve yazlık projeler için tasarlanmış sürme doğrama alternatifi.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_322bdf5027304a4a879db4d8c80e44d5~mv2.jpg",
    brand: "ASAŞPEN",
    specs: ["Ekonomik Yatırım Çözümü", "Pratik Kullanım & Çift Ray Seçeneği", "İnce Profil Profil Çerçevesi", "Asaşpen Kalite Standartları"],
    sortOrder: 5,
    isActive: true
  },
  {
    category: "cam-balkon",
    name: "Alya / Alya Plus Katlanır Cam Balkon",
    description: "Türkiye'de ilk metal park sistemli faydalı modele sahip, özel damlalıklı su tahliye profili barındıran modern tasarım. Alya Plus serisinde 4+22+2 çift cam ile kış bahçesi konforunda yalıtım sağlanır.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_0b25c429949d472bb385d8cc3473dcfb~mv2.jpg",
    brand: "WINNICE",
    specs: ["Özel Su Tahliye Sistemi", "İspanyolet Kilit Donanımı", "Metal Park Sistemli", "Isıcamlı (4+22+2) Çift Cam Desteği"],
    sortOrder: 6,
    isActive: true
  },
  {
    category: "cam-balkon",
    name: "BDK Katlanır Cam Balkon",
    description: "Fiyat/performans odaklı projeleriniz için tasarlanan BDK serisi, estetik ve sağlamlığı bütçe avantajı ile birlikte sunar. Kolay açılır kanat yapısı ve çift emniyet kilitleri mevcuttur.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_3c2154b2427f41b98960ec2acb985e38~mv2.jpg",
    brand: "BDK SİSTEM",
    specs: ["Ekonomik Yatırım Maliyeti", "Temperli Emniyet Camı (8mm)", "Çift Rulmanlı Teker Yapısı", "Estetik Profil Tasarımı"],
    sortOrder: 7,
    isActive: true
  },
  {
    category: "cam-balkon",
    name: "Slide Leon / Slide Leon Plus Sürme Cam",
    description: "Eşikli veya eşiksiz alüminyum raylar üzerinde yatay hareket eden sürme cam paneller. Balkon alanlarında yer kaybını sıfıra indirir. Slide Leon Plus modelinde çift cam ısı yalıtımı entegredir.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_b96a7cc2151d47a68ad93bc6f59bd6fb~mv2.jpg",
    brand: "WINNICE",
    specs: ["Eşikli ve Eşiksiz Alternatifleri", "Minimum Alan Kaybı", "Dahili Toz ve Rüzgar Fırçaları", "Kayar Panel İzolasyon Contaları"],
    sortOrder: 8,
    isActive: true
  },
  {
    category: "giyotin",
    name: "GioSafe Giyotin Cam Balkon",
    description: "GioSafe; dikey yönde hareket eden, uzaktan kumandalı akıllı cam balkon sistemidir. Piyasadaki mevcut sistemlerin eksikleri ve kronik arızaları ayrıntılı incelenerek; kullanıcı emniyeti ve maksimum yalıtım kriterleri eklenerek tasarlanmıştır.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_d21fe1aec7174ee1a998c3def23f63d8~mv2.jpg",
    brand: "WINNICE",
    specs: ["Krom Paslanmaz Zincir ve Dişliler", "Safety Use Çocuk Kilidi", "Estetik Korkuluk Trabzan Profili", "3 mm Çelik Makaslar", "Çift Taraflı Kollu İspanyolet"],
    sortOrder: 9,
    isActive: true
  },
  {
    category: "pergola",
    name: "Güneş Koruması",
    description: "Alüminyum tavan panellerinin yönünü uzaktan kumanda ile 45°, 90° ve 135° açılara ayarlayarak güneş ışınlarını dilediğiniz gibi kontrol edebilirsiniz.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_0cea8c5fe3eb43adb9f31cd439b1d6fd~mv2.jpg",
    brand: "WINPERAX MAGIC ROOF",
    specs: ["45°, 90°, 135° Yönlendirme Açıları", "Güneş Işınlarından Tam Koruma", "Motorlu Kumanda Altyapısı"],
    sortOrder: 10,
    isActive: true
  },
  {
    category: "pergola",
    name: "Yağışlardan Korunma",
    description: "Özel tasarlanmış tırnaklı alüminyum paneller suyu toplayarak yan taşıyıcı kolonlar içindeki gizli gider hatları ile pergolanın dışına sızdırmadan aktarır.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_703f4da83acf4572aeeaf3ebeceee4f9~mv2.jpg",
    brand: "WINPERAX MAGIC ROOF",
    specs: ["Gizli Kolon İçi Yağmur Olukları", "Kilitli Su Sızdırmaz Diş Yapısı", "Maksimum Su İzolasyonu"],
    sortOrder: 11,
    isActive: true
  },
  {
    category: "pergola",
    name: "Çevresel LED Işık",
    description: "Mimarinize entegre edilen çevresel led aydınlatma sistemi sayesinde pergola alanınız hem içeriden hem dışarıdan göz kamaştırıcı ve prestijli bir görüntü kazanır.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_2c8d1c96a0074a4da7badaf115a75c23~mv2.jpg",
    brand: "WINPERAX MAGIC ROOF",
    specs: ["Mimari LED Entegrasyon", "İç ve Dış Çevresel Estetik", "Enerji Tasarruflu LED Teknolojisi"],
    sortOrder: 12,
    isActive: true
  },
  {
    category: "pergola",
    name: "Doğal Havalandırma",
    description: "Panel açıları sayesinde yazın iç mekandaki sıcak havayı tahliye ederek ferah havalandırma sağlar, kışın ise tam kapatılarak iç ortam sıcaklığını muhafaza eder.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_b40ed0bceedc4f1eac1b44925752458c~mv2.jpg",
    brand: "WINPERAX MAGIC ROOF",
    specs: ["Isı Korunum Hesaplaması", "Sıcak/Soğuk Denge Ayarı", "İç Ortam Hava Sirkülasyonu"],
    sortOrder: 13,
    isActive: true
  },
  {
    category: "pergola",
    name: "Entegre LED Spotlar",
    description: "Paneller arasına entegre edilmiş Samsung/Osram led aydınlatmalar ile gözü yormayan, son derece şık ambiyanslar yaratırsınız.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_7b10990e4c5445aa8770e4f100f3333c~mv2.jpg",
    brand: "WINPERAX MAGIC ROOF",
    specs: ["Paneller Arası Entegre Spotlar", "Samsung / Osram LED Donanımı", "Dimmer (Işık Seviye) Desteği"],
    sortOrder: 14,
    isActive: true
  },
  {
    category: "pergola",
    name: "Mükemmel İzolasyon",
    description: "Tavan panellerinin uç kısımlarındaki tırnaklı kilit mekanizmaları sayesinde sistem tam kapatıldığında rüzgar ve kar geçişini sıfırlayan sızdırmazlık elde edilir.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_1db6b937d9f043bc978d2029f6a53a3b~mv2.jpg",
    brand: "WINPERAX MAGIC ROOF",
    specs: ["Tırnaklı Geçme Kilit Sistemi", "Kar ve Rüzgar Mukavemeti", "Hava Sızdırmaz Özel Mastik/Conta"],
    sortOrder: 15,
    isActive: true
  },
  {
    category: "aluminyum",
    name: "Alüminyum Mimari Cephe Sistemleri",
    description: "Plaza ve ticari yapılar için yüksek mukavemetli alüminyum silikon ve kapaklı cephe giydirme çözümleri.",
    imageUrl: "https://static.wixstatic.com/media/14c4c5_8b3338ede0034857a99f10b49c6a9d6b~mv2.jpg",
    brand: "BEDÜK MİMARİ",
    specs: [
      "Kapaklı ve Silikon Giydirme Cephe Sistemleri",
      "Isı yalıtımlı lüks kapı ve pencere doğramaları",
      "Ofis içi minimalist alüminyum ve cam ara bölme modülleri",
      "Geniş cam açıklıklar için yalıtımlı Hebe-Schiebe sürme kapılar",
      "Uluslararası standartlarda fırın boyalı eloksal renk çeşitleri",
      "Deprem dayanımlı ve yüksek rüzgar dirençli statik profil mukavemeti"
    ],
    sortOrder: 16,
    isActive: true
  }
];

// Ensure Categories JSON file
async function ensureCategoriesJsonFile() {
  try {
    await fs.access(CATEGORIES_JSON_FILE_PATH);
  } catch {
    await fs.writeFile(CATEGORIES_JSON_FILE_PATH, JSON.stringify(SEED_CATEGORIES, null, 2), "utf-8");
  }
}

// Ensure Products JSON file
async function ensureProductsJsonFile() {
  try {
    await fs.access(PRODUCTS_JSON_FILE_PATH);
  } catch {
    const list = SEED_PRODUCTS.map((p, index) => ({
      id: index + 1,
      ...p,
      createdAt: new Date().toISOString()
    }));
    await fs.writeFile(PRODUCTS_JSON_FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  }
}

// Ensure Postgres Categories Table
async function ensurePostgresCategoriesTable() {
  if (!isPostgres) return;
  const { sql } = require("@vercel/postgres");
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;
    
    // Seed if empty
    const { rows } = await sql`SELECT COUNT(*) as count FROM categories`;
    if (parseInt(rows[0].count, 10) === 0) {
      for (const cat of SEED_CATEGORIES) {
        await sql`
          INSERT INTO categories (id, name)
          VALUES (${cat.id}, ${cat.name})
        `;
      }
    }
  } catch (error) {
    console.error("Error creating or seeding categories table:", error);
  }
}

// Ensure Postgres Products Table
async function ensurePostgresProductsTable() {
  if (!isPostgres) return;
  const { sql } = require("@vercel/postgres");
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        specs TEXT,
        brand VARCHAR(100),
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Add is_active column if missing
    await sql`
      ALTER TABLE products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
    `;

    // Seed table if empty
    const { rows } = await sql`SELECT COUNT(*) as count FROM products`;
    if (parseInt(rows[0].count, 10) === 0) {
      for (const p of SEED_PRODUCTS) {
        await sql`
          INSERT INTO products (category, name, description, image_url, specs, brand, sort_order, is_active)
          VALUES (${p.category}, ${p.name}, ${p.description}, ${p.imageUrl}, ${JSON.stringify(p.specs)}, ${p.brand || ""}, ${p.sortOrder || 0}, TRUE)
        `;
      }
    }
  } catch (error) {
    console.error("Error creating or seeding Postgres products table:", error);
  }
}

// CATEGORIES CRUD EXPORTS
export async function getCategories(): Promise<Category[]> {
  if (isPostgres) {
    await ensurePostgresCategoriesTable();
    const { sql } = require("@vercel/postgres");
    try {
      const { rows } = await sql`
        SELECT id, name
        FROM categories
        ORDER BY name ASC
      `;
      return rows.map((row: any) => ({
        id: row.id,
        name: row.name
      }));
    } catch (error) {
      console.error("Postgres getCategories error, falling back to JSON:", error);
    }
  }

  // Fallback
  await ensureCategoriesJsonFile();
  const data = await fs.readFile(CATEGORIES_JSON_FILE_PATH, "utf-8");
  return JSON.parse(data);
}

export async function saveCategory(category: Category): Promise<Category> {
  const cleanCat = {
    id: category.id.toLowerCase().trim().replace(/[^a-z0-9-]/g, ""),
    name: category.name.trim()
  };

  if (isPostgres) {
    await ensurePostgresCategoriesTable();
    const { sql } = require("@vercel/postgres");
    try {
      await sql`
        INSERT INTO categories (id, name)
        VALUES (${cleanCat.id}, ${cleanCat.name})
        ON CONFLICT (id) DO UPDATE SET name = ${cleanCat.name}
      `;
      return cleanCat;
    } catch (error) {
      console.error("Postgres saveCategory error, falling back to JSON:", error);
    }
  }

  // Fallback
  await ensureCategoriesJsonFile();
  const data = await fs.readFile(CATEGORIES_JSON_FILE_PATH, "utf-8");
  const list: Category[] = JSON.parse(data);
  const index = list.findIndex((c) => c.id === cleanCat.id);
  if (index !== -1) {
    list[index] = cleanCat;
  } else {
    list.push(cleanCat);
  }
  await fs.writeFile(CATEGORIES_JSON_FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  return cleanCat;
}

// PRODUCTS CRUD EXPORTS
export async function getProducts(includeInactive: boolean = false): Promise<Product[]> {
  if (isPostgres) {
    await ensurePostgresProductsTable();
    const { sql } = require("@vercel/postgres");
    try {
      const { rows } = includeInactive 
        ? await sql`
            SELECT id, category, name, description, image_url as "imageUrl", specs, brand, sort_order as "sortOrder", is_active as "isActive", created_at as "createdAt"
            FROM products
            ORDER BY sort_order ASC, id ASC
          `
        : await sql`
            SELECT id, category, name, description, image_url as "imageUrl", specs, brand, sort_order as "sortOrder", is_active as "isActive", created_at as "createdAt"
            FROM products
            WHERE is_active = TRUE
            ORDER BY sort_order ASC, id ASC
          `;
      return rows.map((row: any) => {
        let specs: string[] = [];
        if (row.specs) {
          try {
            specs = typeof row.specs === "string" ? JSON.parse(row.specs) : row.specs;
          } catch {
            specs = String(row.specs).split(",").map((s: string) => s.trim());
          }
        }
        return {
          id: row.id,
          category: row.category,
          name: row.name,
          description: row.description,
          imageUrl: row.imageUrl,
          specs,
          brand: row.brand || "",
          sortOrder: row.sortOrder || 0,
          isActive: row.isActive === null ? true : !!row.isActive,
          createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),
        };
      });
    } catch (error) {
      console.error("Postgres getProducts error, falling back to JSON:", error);
    }
  }

  // Fallback / local JSON
  await ensureProductsJsonFile();
  const data = await fs.readFile(PRODUCTS_JSON_FILE_PATH, "utf-8");
  const parsed = JSON.parse(data);
  const mapped = parsed.map((p: any) => ({
    ...p,
    isActive: p.isActive !== undefined ? p.isActive : true
  }));
  const filtered = includeInactive ? mapped : mapped.filter((p: any) => p.isActive);
  return filtered.sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

export async function saveProduct(product: Omit<Product, "id" | "createdAt">): Promise<Product> {
  const newProduct = {
    category: product.category,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    specs: product.specs || [],
    brand: product.brand || "",
    sortOrder: product.sortOrder || 0,
    isActive: product.isActive !== undefined ? !!product.isActive : true,
  };

  if (isPostgres) {
    await ensurePostgresProductsTable();
    const { sql } = require("@vercel/postgres");
    try {
      const { rows } = await sql`
        INSERT INTO products (category, name, description, image_url, specs, brand, sort_order, is_active)
        VALUES (${newProduct.category}, ${newProduct.name}, ${newProduct.description}, ${newProduct.imageUrl}, ${JSON.stringify(newProduct.specs)}, ${newProduct.brand}, ${newProduct.sortOrder}, ${newProduct.isActive})
        RETURNING id, category, name, description, image_url as "imageUrl", specs, brand, sort_order as "sortOrder", is_active as "isActive", created_at as "createdAt"
      `;
      const row = rows[0];
      return {
        id: row.id,
        category: row.category,
        name: row.name,
        description: row.description,
        imageUrl: row.imageUrl,
        specs: newProduct.specs,
        brand: row.brand || "",
        sortOrder: row.sortOrder || 0,
        isActive: !!row.isActive,
        createdAt: new Date(row.createdAt).toISOString(),
      };
    } catch (error) {
      console.error("Postgres saveProduct error, falling back to JSON:", error);
    }
  }

  // Fallback / local JSON
  await ensureProductsJsonFile();
  const data = await fs.readFile(PRODUCTS_JSON_FILE_PATH, "utf-8");
  const list: Product[] = JSON.parse(data);

  const created: Product = {
    id: Date.now(),
    ...newProduct,
    createdAt: new Date().toISOString(),
  };

  list.push(created);
  await fs.writeFile(PRODUCTS_JSON_FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  return created;
}

export async function updateProduct(
  id: string | number,
  product: Partial<Omit<Product, "id" | "createdAt">>
): Promise<boolean> {
  if (isPostgres) {
    await ensurePostgresProductsTable();
    const { sql } = require("@vercel/postgres");
    try {
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;
      if (!isNaN(numericId)) {
        // Build dynamic query fields
        const currentProducts = await getProducts(true);
        const existing = currentProducts.find((p) => String(p.id) === String(id));
        if (!existing) return false;

        const merged = { ...existing, ...product };
        await sql`
          UPDATE products
          SET category = ${merged.category},
              name = ${merged.name},
              description = ${merged.description},
              image_url = ${merged.imageUrl},
              specs = ${JSON.stringify(merged.specs)},
              brand = ${merged.brand},
              sort_order = ${merged.sortOrder},
              is_active = ${merged.isActive !== undefined ? !!merged.isActive : true}
          WHERE id = ${numericId}
        `;
        return true;
      }
    } catch (error) {
      console.error("Postgres updateProduct error, falling back to JSON:", error);
    }
  }

  // Fallback / local JSON
  await ensureProductsJsonFile();
  const data = await fs.readFile(PRODUCTS_JSON_FILE_PATH, "utf-8");
  const list: Product[] = JSON.parse(data);

  const targetIdStr = String(id);
  const index = list.findIndex((item) => String(item.id) === targetIdStr);
  if (index !== -1) {
    list[index] = {
      ...list[index],
      ...product,
    };
    await fs.writeFile(PRODUCTS_JSON_FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
    return true;
  }
  return false;
}

export async function deleteProduct(id: string | number): Promise<boolean> {
  if (isPostgres) {
    await ensurePostgresProductsTable();
    const { sql } = require("@vercel/postgres");
    try {
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;
      if (!isNaN(numericId)) {
        await sql`
          DELETE FROM products
          WHERE id = ${numericId}
        `;
        return true;
      }
    } catch (error) {
      console.error("Postgres deleteProduct error, falling back to JSON:", error);
    }
  }

  // Fallback / local JSON
  await ensureProductsJsonFile();
  const data = await fs.readFile(PRODUCTS_JSON_FILE_PATH, "utf-8");
  const list: Product[] = JSON.parse(data);

  const targetIdStr = String(id);
  const newList = list.filter((item) => String(item.id) !== targetIdStr);
  if (newList.length !== list.length) {
    await fs.writeFile(PRODUCTS_JSON_FILE_PATH, JSON.stringify(newList, null, 2), "utf-8");
    return true;
  }
  return false;
}


