"use client";

import { useState, useEffect } from "react";
import { 
  Lock, 
  Unlock, 
  LogOut, 
  MessageCircle, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Loader2, 
  RefreshCw, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Submission {
  id: string | number;
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  status: string; // 'Bekliyor' or 'Dönüş Yapıldı'
  createdAt: string;
}

const categoriesMap: Record<string, string> = {
  "pvc": "PVC Kapı ve Pencere Sistemleri",
  "cam-balkon": "Cam Balkon Sistemleri",
  "giyotin": "Giyotin Cam Sistemleri",
  "pergola": "Kış Bahçesi & Bioklimatik Pergola",
  "diger": "Diğer / Genel Soru",
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Check if token already exists in session/localStorage
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setIsLoggedIn(true);
      fetchSubmissions(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsAuthenticating(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        setIsLoggedIn(true);
        fetchSubmissions(data.token);
      } else {
        setAuthError(data.error || "Şifre doğrulanamadı.");
      }
    } catch {
      setAuthError("Giriş yaparken bağlantı hatası oluştu.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsLoggedIn(false);
    setSubmissions([]);
    setPassword("");
  };

  const fetchSubmissions = async (token?: string) => {
    const activeToken = token || localStorage.getItem("admin_token");
    if (!activeToken) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/submissions", {
        headers: {
          "Authorization": `Bearer ${activeToken}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(data.data);
      } else {
        setError(data.error || "Veriler alınamadı.");
        if (res.status === 401) {
          handleLogout();
        }
      }
    } catch {
      setError("Başvurular yüklenirken bağlantı hatası oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string | number, currentStatus: string) => {
    const activeToken = localStorage.getItem("admin_token");
    if (!activeToken) return;

    const newStatus = currentStatus === "Bekliyor" ? "Dönüş Yapıldı" : "Bekliyor";

    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
        );
      } else {
        alert("Durum güncellenirken hata oluştu.");
      }
    } catch {
      alert("Durum güncellenirken bağlantı hatası oluştu.");
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Bu başvuruyu silmek istediğinize emin misiniz?")) return;

    const activeToken = localStorage.getItem("admin_token");
    if (!activeToken) return;

    try {
      const res = await fetch(`/api/admin/submissions?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${activeToken}`,
        },
      });

      if (res.ok) {
        setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
      } else {
        alert("Başvuru silinirken hata oluştu.");
      }
    } catch {
      alert("Başvuru silinirken bağlantı hatası oluştu.");
    }
  };

  // WhatsApp reply link helper
  const getWhatsAppLink = (submission: Submission) => {
    const cleanPhone = submission.phone.replace(/\D/g, "");
    let waPhone = cleanPhone;
    if (waPhone.startsWith("0")) {
      waPhone = "90" + waPhone.substring(1);
    } else if (!waPhone.startsWith("90") && waPhone.length === 10) {
      waPhone = "90" + waPhone;
    }

    const catName = categoriesMap[submission.category] || "ürünlerimiz";
    const text = `Merhaba ${submission.name}, 

Bedük Group web sitemizden yapmış olduğunuz "${catName}" hakkındaki teklif talebinizi aldık. Projenizle ilgili detayları görüşmek için sizinle iletişime geçmek istedik. 

Nasıl yardımcı olabiliriz?`;

    return `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
  };

  // Format date helper
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  // Filter logic
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.phone.includes(searchTerm) ||
      (sub.email && sub.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      sub.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || sub.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate stats
  const totalCount = submissions.length;
  const pendingCount = submissions.filter((sub) => sub.status === "Bekliyor").length;
  const repliedCount = submissions.filter((sub) => sub.status === "Dönüş Yapıldı").length;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        {/* Decorative background gradients */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-brand-blue/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-accent/10 blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-accent rounded-t-3xl" />
          
          <div className="text-center space-y-3 mb-8">
            <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue flex items-center justify-center rounded-2xl mx-auto border border-brand-blue/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display font-black text-2xl tracking-tight text-white">
              Yönetici Paneli Girişi
            </h1>
            <p className="text-xs text-slate-400">
              Teklif ve bayilik başvurularını yönetmek için şifrenizi girin.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex flex-col space-y-2">
              <label htmlFor="pass" className="text-xs font-semibold uppercase tracking-wider text-slate-450">
                Şifre
              </label>
              <input
                id="pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3.5 rounded-xl text-sm bg-slate-950/80 text-white border border-slate-800 focus:border-brand-blue outline-none transition-colors font-mono"
              />
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl font-display text-sm font-semibold tracking-wider text-slate-900 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isAuthenticating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>KONTROL EDİLİYOR...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>GİRİŞ YAP</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-display font-black text-lg tracking-tight bg-gradient-to-r from-brand-blue to-brand-accent bg-clip-text text-transparent">
            BEDÜK GROUP
          </span>
          <span className="text-xs uppercase bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-md font-semibold">
            Admin
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => fetchSubmissions()}
            disabled={isLoading}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors disabled:opacity-50"
            title="Yenile"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Çıkış Yap</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        {/* Welcome Section */}
        <div className="text-left space-y-1">
          <h2 className="font-display font-black text-3xl tracking-tight text-white">Başvuru Takip Paneli</h2>
          <p className="text-sm text-slate-400">Gelen bayi ve teklif başvuru taleplerini buradan yönetebilirsiniz.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-bl-[80px]" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Toplam Başvuru</span>
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                <Search className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-display font-extrabold text-white">{isLoading ? "..." : totalCount}</span>
              <span className="text-xs text-slate-500 block mt-1">Sistemdeki tüm kayıtlar</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-[80px]" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Bekleyen Talepler</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-display font-extrabold text-white">{isLoading ? "..." : pendingCount}</span>
              <span className="text-xs text-slate-500 block mt-1">Dönüş yapılması bekleyenler</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/5 to-transparent rounded-bl-[80px]" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Yanıtlanan Talepler</span>
              <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-display font-extrabold text-white">{isLoading ? "..." : repliedCount}</span>
              <span className="text-xs text-slate-500 block mt-1">WhatsApp veya telefon ile görüşülenler</span>
            </div>
          </div>
        </div>

        {/* Filters Controls */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center">
          {/* Search bar */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="İsim, telefon, e-posta veya mesaj içeriğinde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-850 focus:border-brand-blue rounded-xl text-sm outline-none transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full md:w-[200px] px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-300 focus:border-brand-blue"
            >
              <option value="all">Tüm Ürünler</option>
              {Object.entries(categoriesMap).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-[150px] px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-300 focus:border-brand-blue"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="Bekliyor">Bekliyor</option>
              <option value="Dönüş Yapıldı">Dönüş Yapıldı</option>
            </select>
          </div>
        </div>

        {/* Submissions List Container */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                <span className="text-sm text-slate-400">Veriler yükleniyor, lütfen bekleyin...</span>
              </div>
            ) : error ? (
              <div className="text-center py-16 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-400">
                <p className="text-sm font-medium">{error}</p>
                <button
                  onClick={() => fetchSubmissions()}
                  className="mt-3 text-xs font-bold underline hover:no-underline"
                >
                  Tekrar Dene
                </button>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-slate-900/20 border border-slate-850 rounded-2xl text-slate-500 text-sm"
              >
                Aradığınız kriterlere uygun başvuru bulunamadı.
              </motion.div>
            ) : (
              filteredSubmissions.map((sub) => (
                <motion.div
                  key={sub.id}
                  layoutId={String(sub.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-slate-900/40 border transition-colors ${
                    sub.status === "Bekliyor" 
                      ? "border-slate-800 hover:border-amber-500/20" 
                      : "border-slate-900/60 opacity-80"
                  } rounded-2xl p-6 flex flex-col lg:flex-row justify-between gap-6 relative`}
                >
                  {/* Left Column - Submission Details */}
                  <div className="space-y-4 lg:flex-1 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-brand-blue/10 text-brand-blue border border-brand-blue/10">
                        {categoriesMap[sub.category] || sub.category}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center space-x-1 ${
                        sub.status === "Bekliyor"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/10"
                          : "bg-green-500/10 text-green-400 border border-green-500/10"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          sub.status === "Bekliyor" ? "bg-amber-400 animate-pulse" : "bg-green-400"
                        }`} />
                        <span>{sub.status}</span>
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <span>{sub.name}</span>
                      </h3>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
                        <a 
                          href={`tel:${sub.phone}`} 
                          className="flex items-center space-x-2 hover:text-brand-blue transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{sub.phone}</span>
                        </a>
                        {sub.email && (
                          <a 
                            href={`mailto:${sub.email}`} 
                            className="flex items-center space-x-2 hover:text-brand-blue transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{sub.email}</span>
                          </a>
                        )}
                        <span className="flex items-center space-x-2 text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(sub.createdAt)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-900/80">
                      <p className="text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                        {sub.message}
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Actions */}
                  <div className="flex sm:flex-row lg:flex-col items-stretch lg:justify-center gap-3 lg:w-[200px] flex-shrink-0">
                    <a
                      href={getWhatsAppLink(sub)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        // Automatically mark as replied if they click WhatsApp
                        if (sub.status === "Bekliyor") {
                          handleUpdateStatus(sub.id, "Bekliyor");
                        }
                      }}
                      className="flex-1 lg:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl text-xs tracking-wider transition-colors shadow-lg shadow-green-600/10 text-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WHATSAPP YANIT</span>
                    </a>

                    <button
                      onClick={() => handleUpdateStatus(sub.id, sub.status)}
                      className={`flex-1 lg:flex-none flex items-center justify-center space-x-2 px-4 py-3 font-semibold rounded-xl text-xs tracking-wider border transition-colors ${
                        sub.status === "Bekliyor"
                          ? "bg-slate-900 hover:bg-slate-800 text-slate-350 border-slate-850"
                          : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {sub.status === "Bekliyor" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>DÖNÜŞ YAPILDI İŞARETLE</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" />
                          <span>BEKLİYOR İŞARETLE</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="flex items-center justify-center p-3 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 bg-opacity-10 hover:bg-opacity-100 border border-red-500/20 rounded-xl transition-all"
                      title="Başvuruyu Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sm:inline lg:hidden ml-2 font-semibold text-xs">SİL</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
