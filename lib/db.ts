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
