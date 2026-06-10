export function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");
    const correctUsername = process.env.ADMIN_USERNAME || "admin";
    const correctPassword = process.env.ADMIN_PASSWORD || "beduk123";
    return username === correctUsername && password === correctPassword;
  } catch {
    return false;
  }
}
