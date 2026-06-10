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
  AlertCircle,
  Plus,
  Pencil,
  Image as ImageIcon,
  Tag,
  Hash,
  X,
  FileText,
  Eye,
  EyeOff
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

interface Product {
  id: string | number;
  category: string;
  name: string;
  description: string;
  imageUrl: string;
  specs: string[];
  brand?: string;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  // Tab control
  const [activeDashboardTab, setActiveDashboardTab] = useState<"submissions" | "products">("submissions");

  // Submissions State
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
  const [submissionsError, setSubmissionsError] = useState("");

  // Categories State
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [showAddCategoryField, setShowAddCategoryField] = useState(false);
  const [newCatId, setNewCatId] = useState("");
  const [newCatName, setNewCatName] = useState("");

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState("");

  // Search & Filters for Submissions
  const [searchTermSub, setSearchTermSub] = useState("");
  const [categoryFilterSub, setCategoryFilterSub] = useState("all");
  const [statusFilterSub, setStatusFilterSub] = useState("all");

  // Search & Filters for Products
  const [searchTermProd, setSearchTermProd] = useState("");
  const [categoryFilterProd, setCategoryFilterProd] = useState("all");

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodName, setProdName] = useState("");
  const [prodCategory, setProdCategory] = useState("pvc");
  const [prodBrand, setProdBrand] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImageUrl, setProdImageUrl] = useState("");
  const [prodSortOrder, setProdSortOrder] = useState(0);
  const [prodSpecs, setProdSpecs] = useState<string[]>([]);
  const [prodIsActive, setProdIsActive] = useState(true);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  useEffect(() => {
    // Check if token already exists in session/localStorage
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setIsLoggedIn(true);
      fetchSubmissions(savedToken);
      fetchProducts();
      fetchCategories();
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
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        setIsLoggedIn(true);
        fetchSubmissions(data.token);
        fetchProducts();
        fetchCategories();
      } else {
        setAuthError(data.error || "Giriş bilgileri doğrulanamadı.");
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
    setProducts([]);
    setCategories([]);
    setUsername("");
    setPassword("");
  };

  const fetchSubmissions = async (token?: string) => {
    const activeToken = token || localStorage.getItem("admin_token");
    if (!activeToken) return;

    setIsLoadingSubmissions(true);
    setSubmissionsError("");

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
        setSubmissionsError(data.error || "Veriler alınamadı.");
        if (res.status === 401) {
          handleLogout();
        }
      }
    } catch {
      setSubmissionsError("Başvurular yüklenirken bağlantı hatası oluştu.");
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (res.ok && data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    setProductsError("");
    const activeToken = localStorage.getItem("admin_token");

    try {
      const headers: HeadersInit = {};
      if (activeToken) {
        headers["Authorization"] = `Bearer ${activeToken}`;
      }

      const res = await fetch("/api/products", { headers });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.data);
      } else {
        setProductsError(data.error || "Ürün verileri alınamadı.");
      }
    } catch {
      setProductsError("Ürünler yüklenirken bağlantı hatası oluştu.");
    } finally {
      setIsLoadingProducts(false);
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

  const handleDeleteSubmission = async (id: string | number) => {
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

  // Product CRUD Handlers
  const openProductModal = (product: Product | null = null) => {
    setShowAddCategoryField(false);
    setNewCatId("");
    setNewCatName("");
    
    if (product) {
      setEditingProduct(product);
      setProdName(product.name);
      setProdCategory(product.category);
      setProdBrand(product.brand || "");
      setProdDesc(product.description);
      setProdImageUrl(product.imageUrl);
      setProdSortOrder(product.sortOrder || 0);
      setProdSpecs(product.specs || []);
      setProdIsActive(product.isActive !== false);
    } else {
      setEditingProduct(null);
      setProdName("");
      setProdCategory(categories[0]?.id || "pvc");
      setProdBrand("");
      setProdDesc("");
      setProdImageUrl("");
      setProdSortOrder(products.length + 1);
      setProdSpecs([]);
      setProdIsActive(true);
    }
    setIsProductModalOpen(true);
  };

  const handleSpecAdd = () => {
    setProdSpecs([...prodSpecs, ""]);
  };

  const handleSpecChange = (index: number, value: string) => {
    const updated = [...prodSpecs];
    updated[index] = value;
    setProdSpecs(updated);
  };

  const handleSpecRemove = (index: number) => {
    setProdSpecs(prodSpecs.filter((_, idx) => idx !== index));
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeToken = localStorage.getItem("admin_token");
    if (!activeToken) return;

    if (!prodName.trim() || !prodDesc.trim() || !prodImageUrl.trim()) {
      alert("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    setIsSavingProduct(true);

    const filteredSpecs = prodSpecs.filter(spec => spec.trim() !== "");

    const payload = {
      name: prodName,
      category: prodCategory,
      brand: prodBrand,
      description: prodDesc,
      imageUrl: prodImageUrl,
      specs: filteredSpecs,
      sortOrder: Number(prodSortOrder),
      isActive: prodIsActive,
    };

    try {
      const url = "/api/products";
      const method = editingProduct ? "PATCH" : "POST";
      const body = editingProduct ? { id: editingProduct.id, ...payload } : payload;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${activeToken}`,
        },
        body: JSON.stringify(body),
      });

      const resData = await res.json();

      if (res.ok) {
        setIsProductModalOpen(false);
        fetchProducts(); // reload product list
      } else {
        alert(resData.error || "Ürün kaydedilirken hata oluştu.");
      }
    } catch {
      alert("Ürün kaydedilirken bağlantı hatası oluştu.");
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleToggleProductVisibility = async (product: Product) => {
    const activeToken = localStorage.getItem("admin_token");
    if (!activeToken) return;

    const newActiveState = product.isActive === false ? true : false;

    try {
      const res = await fetch("/api/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ id: product.id, isActive: newActiveState }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, isActive: newActiveState } : p))
        );
      } else {
        alert("Görünürlük durumu güncellenirken hata oluştu.");
      }
    } catch {
      alert("Görünürlük durumu güncellenirken bağlantı hatası oluştu.");
    }
  };

  const handleDeleteProduct = async (id: string | number) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz? Sitedeki ürünler sayfasından da silinecektir.")) return;

    const activeToken = localStorage.getItem("admin_token");
    if (!activeToken) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${activeToken}`,
        },
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Ürün silinirken hata oluştu.");
      }
    } catch {
      alert("Ürün silinirken bağlantı hatası oluştu.");
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeToken = localStorage.getItem("admin_token");
    if (!activeToken) return;

    if (!newCatId.trim() || !newCatName.trim()) {
      alert("Kategori kodu ve ismi alanları doldurulmalıdır.");
      return;
    }

    setIsSavingCategory(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ id: newCatId, name: newCatName }),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        setCategories((prev) => [...prev, resData.data]);
        setProdCategory(resData.data.id); // set selected category to new one
        setNewCatId("");
        setNewCatName("");
        setShowAddCategoryField(false);
      } else {
        alert(resData.error || "Kategori eklenirken hata oluştu.");
      }
    } catch {
      alert("Kategori eklenirken bağlantı hatası oluştu.");
    } finally {
      setIsSavingCategory(false);
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

    const catObj = categories.find((c) => c.id === submission.category);
    const catName = catObj ? catObj.name : "ürünlerimiz";
    
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

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchTermSub.toLowerCase()) ||
      sub.phone.includes(searchTermSub) ||
      (sub.email && sub.email.toLowerCase().includes(searchTermSub.toLowerCase())) ||
      sub.message.toLowerCase().includes(searchTermSub.toLowerCase());

    const matchesCategory = categoryFilterSub === "all" || sub.category === categoryFilterSub;
    const matchesStatus = statusFilterSub === "all" || sub.status === statusFilterSub;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filter Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTermProd.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTermProd.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchTermProd.toLowerCase()));

    const matchesCategory = categoryFilterProd === "all" || p.category === categoryFilterProd;

    return matchesSearch && matchesCategory;
  });

  // Calculate Submissions Stats
  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter((sub) => sub.status === "Bekliyor").length;
  const repliedSubmissions = submissions.filter((sub) => sub.status === "Dönüş Yapıldı").length;

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
          className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative animate-fade-in"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-accent rounded-t-3xl" />
          
          <div className="text-center space-y-3 mb-8">
            <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue flex items-center justify-center rounded-2xl mx-auto border border-brand-blue/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display font-black text-2xl tracking-tight text-white">
              Yönetici Paneli Girişi
            </h1>
            <p className="text-xs text-slate-455 font-sans">
              Teklifleri, başvuruları, kategorileri ve sitedeki ürünleri yönetmek için bilgilerinizi girin.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex flex-col space-y-2">
              <label htmlFor="user" className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
                Kullanıcı Adı
              </label>
              <input
                id="user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Yönetici kullanıcı adı"
                required
                className="w-full px-4 py-3.5 rounded-xl text-sm bg-slate-950/80 text-white border border-slate-800 focus:border-brand-blue outline-none transition-colors font-sans"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="pass" className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
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
                <span className="font-sans font-medium">{authError}</span>
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
                  <span className="font-sans font-bold">KONTROL EDİLİYOR...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span className="font-sans font-bold">GİRİŞ YAP</span>
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
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-display font-black text-lg tracking-tight bg-gradient-to-r from-brand-blue to-brand-accent bg-clip-text text-transparent">
            BEDÜK GROUP
          </span>
          <span className="text-xs uppercase bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-md font-semibold">
            Admin
          </span>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center space-x-1 p-1 bg-slate-900 rounded-xl border border-slate-850">
          <button
            onClick={() => setActiveDashboardTab("submissions")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeDashboardTab === "submissions"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Başvurular</span>
          </button>
          <button
            onClick={() => setActiveDashboardTab("products")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeDashboardTab === "products"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Ürünler</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              if (activeDashboardTab === "submissions") {
                fetchSubmissions();
              } else {
                fetchProducts();
                fetchCategories();
              }
            }}
            disabled={isLoadingSubmissions || isLoadingProducts}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors disabled:opacity-50"
            title="Yenile"
          >
            <RefreshCw className={`w-4 h-4 ${(isLoadingSubmissions || isLoadingProducts) ? "animate-spin" : ""}`} />
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
        
        {/* SUBMISSIONS TAB CONTENT */}
        {activeDashboardTab === "submissions" && (
          <div className="space-y-8">
            <div className="text-left space-y-1">
              <h2 className="font-display font-black text-3xl tracking-tight text-white">Başvuru Takip Paneli</h2>
              <p className="text-sm text-slate-400">Gelen bayi ve teklif başvuru taleplerini buradan yönetebilirsiniz.</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-bl-[80px]" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Toplam Başvuru</span>
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                    <Search className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-display font-extrabold text-white">{isLoadingSubmissions ? "..." : totalSubmissions}</span>
                  <span className="text-xs text-slate-550 block mt-1">Sistemdeki tüm kayıtlar</span>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-[80px]" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Bekleyen Talepler</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-display font-extrabold text-white">{isLoadingSubmissions ? "..." : pendingSubmissions}</span>
                  <span className="text-xs text-slate-550 block mt-1">Dönüş yapılması bekleyenler</span>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/5 to-transparent rounded-bl-[80px]" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Yanıtlanan Talepler</span>
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-display font-extrabold text-white">{isLoadingSubmissions ? "..." : repliedSubmissions}</span>
                  <span className="text-xs text-slate-550 block mt-1">Müşteriyle görüşülenler</span>
                </div>
              </div>
            </div>

            {/* Submissions Filters */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="İsim, telefon, e-posta veya mesaj içeriğinde ara..."
                  value={searchTermSub}
                  onChange={(e) => setSearchTermSub(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-850 focus:border-brand-blue rounded-xl text-sm outline-none transition-colors"
                />
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto">
                <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  value={categoryFilterSub}
                  onChange={(e) => setCategoryFilterSub(e.target.value)}
                  className="w-full md:w-[200px] px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-300 focus:border-brand-blue font-sans"
                >
                  <option value="all">Tüm Kategoriler</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-auto">
                <select
                  value={statusFilterSub}
                  onChange={(e) => setStatusFilterSub(e.target.value)}
                  className="w-full md:w-[150px] px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-300 focus:border-brand-blue"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="Bekliyor">Bekliyor</option>
                  <option value="Dönüş Yapıldı">Dönüş Yapıldı</option>
                </select>
              </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {isLoadingSubmissions ? (
                  <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                    <span className="text-sm text-slate-400">Veriler yükleniyor, lütfen bekleyin...</span>
                  </div>
                ) : submissionsError ? (
                  <div className="text-center py-16 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-400">
                    <p className="text-sm font-medium">{submissionsError}</p>
                    <button onClick={() => fetchSubmissions()} className="mt-3 text-xs font-bold underline hover:no-underline">
                      Tekrar Dene
                    </button>
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-slate-900/20 border border-slate-850 rounded-2xl text-slate-500 text-sm">
                    Aradığınız kriterlere uygun başvuru bulunamadı.
                  </motion.div>
                ) : (
                  filteredSubmissions.map((sub) => {
                    const catObj = categories.find((c) => c.id === sub.category);
                    const catName = catObj ? catObj.name : sub.category;
                    return (
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
                        <div className="space-y-4 lg:flex-1 text-left">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-brand-blue/10 text-brand-blue border border-brand-blue/10">
                              {catName}
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
                              <a href={`tel:${sub.phone}`} className="flex items-center space-x-2 hover:text-brand-blue transition-colors">
                                <Phone className="w-3.5 h-3.5" />
                                <span>{sub.phone}</span>
                              </a>
                              {sub.email && (
                                <a href={`mailto:${sub.email}`} className="flex items-center space-x-2 hover:text-brand-blue transition-colors">
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

                        <div className="flex sm:flex-row lg:flex-col items-stretch lg:justify-center gap-3 lg:w-[200px] flex-shrink-0">
                          <a
                            href={getWhatsAppLink(sub)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              if (sub.status === "Bekliyor") {
                                handleUpdateStatus(sub.id, "Bekliyor");
                              }
                            }}
                            className="flex-1 lg:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl text-xs tracking-wider transition-colors shadow-lg text-center"
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
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="flex items-center justify-center p-3 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 bg-opacity-10 hover:bg-opacity-100 border border-red-500/20 rounded-xl transition-all"
                            title="Başvuruyu Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sm:inline lg:hidden ml-2 font-semibold text-xs">SİL</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB CONTENT */}
        {activeDashboardTab === "products" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-left space-y-1">
                <h2 className="font-display font-black text-3xl tracking-tight text-white">Ürün Yönetimi</h2>
                <p className="text-sm text-slate-400">Sitede sergilenen ürün modellerini, teknik özellikleri, görünürlüğü ve kategorileri yönetin.</p>
              </div>
              <button
                onClick={() => openProductModal(null)}
                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>YENİ ÜRÜN EKLE</span>
              </button>
            </div>

            {/* Products Filters */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Ürün adı, çözüm ortağı veya açıklamalarda ara..."
                  value={searchTermProd}
                  onChange={(e) => setSearchTermProd(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-850 focus:border-brand-blue rounded-xl text-sm outline-none transition-colors"
                />
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto font-sans">
                <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  value={categoryFilterProd}
                  onChange={(e) => setCategoryFilterProd(e.target.value)}
                  className="w-full md:w-[200px] px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-300 focus:border-brand-blue font-sans"
                >
                  <option value="all">Tüm Kategoriler</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {isLoadingProducts ? (
                  <div className="col-span-full text-center py-20 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                    <span className="text-sm text-slate-400">Ürünler yükleniyor, lütfen bekleyin...</span>
                  </div>
                ) : productsError ? (
                  <div className="col-span-full text-center py-16 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-400">
                    <p className="text-sm font-medium">{productsError}</p>
                    <button onClick={fetchProducts} className="mt-3 text-xs font-bold underline hover:no-underline">
                      Yeniden Yükle
                    </button>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="col-span-full text-center py-20 bg-slate-900/20 border border-slate-850 rounded-2xl text-slate-500 text-sm">
                    Sistemde kayıtlı ürün bulunamadı.
                  </div>
                ) : (
                  filteredProducts.map((prod) => {
                    const catObj = categories.find((c) => c.id === prod.category);
                    const catLabel = catObj ? catObj.name : prod.category;
                    return (
                      <motion.div
                        key={prod.id}
                        layoutId={`prod-${prod.id}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`bg-slate-900/40 border transition-all ${
                          prod.isActive === false 
                            ? "border-dashed border-slate-800/80 bg-slate-900/20 opacity-60 hover:opacity-85" 
                            : "border-slate-800 hover:border-slate-700"
                        } rounded-2xl overflow-hidden flex flex-col justify-between`}
                      >
                        <div>
                          {/* Image Preview Container */}
                          <div className="relative h-48 w-full bg-slate-950 flex items-center justify-center p-4 border-b border-slate-900">
                            {prod.imageUrl ? (
                              <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-slate-600">
                                <ImageIcon className="w-12 h-12 mb-2" />
                                <span className="text-xs">Görsel Yok</span>
                              </div>
                            )}
                            <div className="absolute top-3 right-3 flex items-center space-x-1.5">
                              <span className="text-[10px] uppercase font-bold tracking-wider bg-slate-900 bg-opacity-80 backdrop-blur-sm text-slate-350 border border-slate-850 px-2 py-0.5 rounded">
                                Sıra: {prod.sortOrder || 0}
                              </span>
                              {prod.isActive === false && (
                                <span className="text-[10px] uppercase font-bold tracking-wider bg-red-950/80 backdrop-blur-sm text-red-400 border border-red-900/50 px-2 py-0.5 rounded">
                                  Gizli
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Info Box */}
                          <div className="p-5 space-y-4">
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase font-black tracking-widest text-brand-blue block">
                                {catLabel}
                              </span>
                              <h3 className="text-lg font-bold text-white leading-tight">
                                {prod.name}
                              </h3>
                              {prod.brand && (
                                <span className="text-xs font-medium text-brand-accent">
                                  Çözüm Ortağı: {prod.brand}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-3">
                              {prod.description}
                            </p>

                            <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-semibold tracking-wider uppercase pt-2 border-t border-slate-850/50">
                              <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                              <span>{prod.specs?.length || 0} Teknik Özellik Tanımlı</span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="p-5 pt-0 flex items-center gap-2">
                          <button
                            onClick={() => openProductModal(prod)}
                            className="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-200 text-xs font-bold transition-all"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>DÜZENLE</span>
                          </button>
                          
                          {/* Visibility toggle button */}
                          <button
                            onClick={() => handleToggleProductVisibility(prod)}
                            className={`p-2.5 rounded-xl border transition-all ${
                              prod.isActive !== false
                                ? "border-emerald-950/20 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                                : "border-slate-800 bg-slate-900/60 text-slate-500 hover:bg-slate-750 hover:text-white"
                            }`}
                            title={prod.isActive !== false ? "Ürünü Sitede Gizle" : "Ürünü Sitede Göster"}
                          >
                            {prod.isActive !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-2.5 rounded-xl border border-red-950/20 hover:border-red-900 bg-red-950/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            title="Ürünü Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>

      {/* PRODUCT ADD / EDIT DIALOG MODAL */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col relative max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-850 flex items-center justify-between">
                <h3 className="font-display font-extrabold text-xl text-white">
                  {editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="overflow-y-auto flex-1">
                <form onSubmit={handleProductSubmit} className="p-6 space-y-5 text-left">
                  
                  {/* Category Field with "+" button */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Kategori <span className="text-red-400">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowAddCategoryField(!showAddCategoryField)}
                          className="flex items-center space-x-0.5 text-xs font-bold text-brand-accent hover:text-cyan-400 transition-colors"
                          title="Yeni Kategori Tanımla"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Kategori Ekle</span>
                        </button>
                      </div>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-200 focus:border-brand-blue font-sans"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Sıralama Önceliği
                      </label>
                      <input
                        type="number"
                        value={prodSortOrder}
                        onChange={(e) => setProdSortOrder(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-200 focus:border-brand-blue"
                        placeholder="Örn: 1 (Sitede en başta gösterilir)"
                      />
                    </div>
                  </div>

                  {/* Add Category Sub-form */}
                  {showAddCategoryField && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-slate-950 rounded-xl border border-brand-blue/20 space-y-4"
                    >
                      <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">Yeni Kategori Tanımla</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Kategori Kodu (Küçük harf & İngilizce)</label>
                          <input
                            type="text"
                            value={newCatId}
                            onChange={(e) => setNewCatId(e.target.value)}
                            placeholder="Örn: kepenk"
                            className="px-3 py-2 bg-slate-900 border border-slate-855 rounded-lg text-xs outline-none text-white focus:border-brand-blue"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Kategori Adı</label>
                          <input
                            type="text"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            placeholder="Örn: Otomatik Kepenk Sistemleri"
                            className="px-3 py-2 bg-slate-900 border border-slate-855 rounded-lg text-xs outline-none text-white focus:border-brand-blue"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddCategoryField(false)}
                          className="px-3 py-2 rounded-lg border border-slate-800 text-[10px] font-bold text-slate-400 hover:bg-slate-900"
                        >
                          VAZGEÇ
                        </button>
                        <button
                          type="button"
                          onClick={handleAddCategory}
                          disabled={isSavingCategory}
                          className="px-3 py-2 rounded-lg bg-brand-blue text-[10px] font-bold text-white hover:bg-brand-blue/80 disabled:opacity-50"
                        >
                          {isSavingCategory ? "KAYDEDİLİYOR..." : "KATEGORİ KAYDET"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Name and Brand */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Ürün Adı <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-200 focus:border-brand-blue"
                        placeholder="Örn: İnova 76"
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Çözüm Ortağı / Marka
                      </label>
                      <input
                        type="text"
                        value={prodBrand}
                        onChange={(e) => setProdBrand(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-200 focus:border-brand-blue"
                        placeholder="Örn: ASAŞPEN, WINNICE, vb."
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Açıklama <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      rows={3}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-200 focus:border-brand-blue font-sans leading-relaxed resize-none"
                      placeholder="Ürün modeli hakkında kısa tanıtıcı açıklama yazın..."
                      required
                    />
                  </div>

                  {/* Visibility Checkbox */}
                  <div className="flex items-center space-x-2.5 p-3.5 bg-slate-950 rounded-xl border border-slate-900">
                    <input
                      type="checkbox"
                      id="isActiveBox"
                      checked={prodIsActive}
                      onChange={(e) => setProdIsActive(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue bg-slate-900 border-slate-800"
                    />
                    <label htmlFor="isActiveBox" className="text-xs font-bold text-slate-300 uppercase tracking-wider cursor-pointer">
                      Sitede Yayınla (Görünür Olsun)
                    </label>
                  </div>

                  {/* Image URL & Preview */}
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Görsel Bağlantısı (URL) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="url"
                        value={prodImageUrl}
                        onChange={(e) => setProdImageUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm outline-none text-slate-200 focus:border-brand-blue"
                        placeholder="https://static.wixstatic.com/media/..."
                        required
                      />
                    </div>
                    {prodImageUrl.startsWith("http") && (
                      <div className="flex items-center space-x-3 p-3 bg-slate-950 rounded-xl border border-slate-900">
                        <img src={prodImageUrl} alt="Önizleme" className="w-16 h-16 object-contain rounded border border-slate-800" />
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Görsel Önizlemesi</span>
                          <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">✓ Bağlantı Girildi</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Specs List */}
                  <div className="space-y-3 pt-3 border-t border-slate-850/50">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Teknik Detay ve Avantajlar
                      </label>
                      <button
                        type="button"
                        onClick={handleSpecAdd}
                        className="flex items-center space-x-1 text-xs font-bold text-brand-accent hover:text-cyan-400 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Ekle</span>
                      </button>
                    </div>

                    {prodSpecs.length === 0 ? (
                      <p className="text-xs text-slate-500 font-sans italic">Henüz teknik özellik eklenmedi. &apos;Ekle&apos; butonuna tıklayarak liste oluşturun.</p>
                    ) : (
                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                        {prodSpecs.map((spec, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                            <input
                              type="text"
                              value={spec}
                              onChange={(e) => handleSpecChange(index, e.target.value)}
                              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs outline-none text-slate-200 focus:border-brand-blue"
                              placeholder="Örn: 76 mm Geniş Profil Yanakları"
                            />
                            <button
                              type="button"
                              onClick={() => handleSpecRemove(index)}
                              className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-950 transition-colors flex-shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit / Cancel Buttons */}
                  <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-850">
                    <button
                      type="button"
                      onClick={() => setIsProductModalOpen(false)}
                      className="px-5 py-3 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-355 text-xs font-bold transition-all"
                    >
                      İPTAL
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingProduct}
                      className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all disabled:opacity-50 shadow-md"
                    >
                      {isSavingProduct ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>KAYDEDİLİYOR...</span>
                        </>
                      ) : (
                        <span>KAYDET</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
