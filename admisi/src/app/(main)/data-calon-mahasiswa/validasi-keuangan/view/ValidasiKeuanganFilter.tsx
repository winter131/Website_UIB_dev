// components/KeuanganFilter.tsx
import {
  Search,
  Calendar,
  Users,
  GraduationCap,
  Building2,
  BanknoteIcon,
  RefreshCw,
  Filter as FilterIcon,
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Check,
  Sparkles,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterProps {
  onFilterChange: (filters: FilterValues) => void;
  totalResults?: number;
}

export interface FilterValues {
  periode: string;
  gelombang: string;
  jenjang: string;
  programStudi: string;
  status: string;
  jalurUjian: string;
  waktuKuliah: string;
  searchTerm: string;
  minTagihan?: number;
  maxTagihan?: number;
  startDate?: string;
  endDate?: string;
}

export default function KeuanganFilter({
  onFilterChange,
  totalResults = 0,
}: FilterProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const [suggestions] = useState([
    "Filbert Kingslim",
    "nicowicaksono",
    "PUTRA ANDIKA NAINGGOLAN",
    "Arsitektur",
    "Gizi",
    "Sistem Informasi",
  ]);

  const [filters, setFilters] = useState<FilterValues>({
    periode: "2026 - Genjil",
    gelombang: "Gelombang 01",
    jenjang: "S1",
    programStudi: "",
    status: "",
    jalurUjian: "",
    waktuKuliah: "",
    searchTerm: "",
    minTagihan: undefined,
    maxTagihan: undefined,
    startDate: "",
    endDate: "",
  });

  // Hitung jumlah filter aktif
  useEffect(() => {
    let count = 0;
    Object.entries(filters).forEach(([key, value]) => {
      if (key !== "periode" && key !== "gelombang" && key !== "jenjang") {
        if (value && value.toString().trim() !== "") {
          count++;
        }
      }
    });
    setActiveFilterCount(count);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterValues, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      periode: "2026 - Genjil",
      gelombang: "Gelombang 01",
      jenjang: "S1",
      programStudi: "",
      status: "",
      jalurUjian: "",
      waktuKuliah: "",
      searchTerm: "",
      minTagihan: undefined,
      maxTagihan: undefined,
      startDate: "",
      endDate: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);

    // Animation feedback
    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
      resetBtn.classList.add("animate-pulse");
      setTimeout(() => resetBtn.classList.remove("animate-pulse"), 1000);
    }
  };

  const handleQuickFilter = (type: string, value: string) => {
    handleFilterChange(type as keyof FilterValues, value);
  };

  // Opsi dropdown dengan ikon
  const periodeOptions = [
    { value: "2026 - Genjil", label: "2026 - Genjil", color: "text-blue-600" },
    { value: "2025 - Genjil", label: "2025 - Genjil", color: "text-blue-500" },
    { value: "2025 - Gasal", label: "2025 - Gasal", color: "text-blue-400" },
    { value: "2024 - Genjil", label: "2024 - Genjil", color: "text-gray-500" },
    { value: "2024 - Gasal", label: "2024 - Gasal", color: "text-gray-400" },
  ];

  const gelombangOptions = [
    { value: "Gelombang 01", label: "Gelombang 01", badge: "🏁" },
    { value: "Gelombang 02", label: "Gelombang 02", badge: "🎯" },
    { value: "Gelombang 03", label: "Gelombang 03", badge: "🚀" },
    { value: "Gelombang 04", label: "Gelombang 04", badge: "🏆" },
    { value: "Gelombang 05", label: "Gelombang 05", badge: "⭐" },
  ];

  const jenjangOptions = [
    { value: "S1", label: "S1 - Sarjana", icon: "🎓" },
    { value: "S2", label: "S2 - Magister", icon: "📚" },
    { value: "S3", label: "S3 - Doktoral", icon: "👨‍🏫" },
    { value: "D3", label: "D3 - Diploma", icon: "📄" },
    { value: "D4", label: "D4 - Terapan", icon: "🔧" },
  ];

  const programStudiOptions = [
    { value: "Arsitektur", label: "Arsitektur", color: "bg-purple-500" },
    { value: "Gizi", label: "Gizi", color: "bg-emerald-500" },
    {
      value: "Sistem Informasi",
      label: "Sistem Informasi",
      color: "bg-blue-500",
    },
    {
      value: "Teknik Informatika",
      label: "Teknik Informatika",
      color: "bg-indigo-500",
    },
    { value: "Akuntansi", label: "Akuntansi", color: "bg-green-500" },
    { value: "Manajemen", label: "Manajemen", color: "bg-teal-500" },
    { value: "Hukum", label: "Hukum", color: "bg-red-500" },
    { value: "Kedokteran", label: "Kedokteran", color: "bg-pink-500" },
    { value: "Psikologi", label: "Psikologi", color: "bg-yellow-500" },
    { value: "Teknik Sipil", label: "Teknik Sipil", color: "bg-orange-500" },
  ];

  const statusOptions = [
    {
      value: "Disetujui",
      label: "Disetujui",
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      value: "Menunggu",
      label: "Menunggu",
      color: "bg-amber-100 text-amber-800",
    },
    { value: "Ditolak", label: "Ditolak", color: "bg-red-100 text-red-800" },
    {
      value: "Belum Lengkap",
      label: "Belum Lengkap",
      color: "bg-gray-100 text-gray-800",
    },
    {
      value: "Butuh Revisi",
      label: "Butuh Revisi",
      color: "bg-blue-100 text-blue-800",
    },
  ];

  const jalurUjianOptions = [
    { value: "Online", label: "Online", icon: "🌐" },
    { value: "Offline", label: "Offline", icon: "🏢" },
    { value: "Mandiri", label: "Mandiri", icon: "🎯" },
    { value: "SNBP", label: "SNBP", icon: "📘" },
    { value: "SNBT", label: "SNBT", icon: "📗" },
  ];

  const waktuKuliahOptions = [
    { value: "pagi", label: "Pagi", icon: "☀️", color: "bg-yellow-100" },
    { value: "siang", label: "Siang", icon: "⛅", color: "bg-orange-100" },
    { value: "sore", label: "Sore", icon: "🌇", color: "bg-pink-100" },
    { value: "malam", label: "Malam", icon: "🌙", color: "bg-indigo-100" },
    { value: "weekend", label: "Weekend", icon: "📅", color: "bg-purple-100" },
  ];

  // Quick filter presets
  const quickFilters = [
    { label: "Status Menunggu", type: "status", value: "Menunggu" },
    { label: "Online", type: "jalurUjian", value: "Online" },
    { label: "Pagi", type: "waktuKuliah", value: "pagi" },
    { label: "Sudah Lunas", type: "status", value: "Disetujui" },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden">
      {/* Header dengan gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <FilterIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Filter Pencarian Keuangan Mahasiswa
              </h2>
              <p className="text-blue-100">
                Temukan data dengan cepat dan presisi
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-white text-sm font-medium">
                {activeFilterCount} filter aktif
              </span>
            </div>
            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
            >
              {isAdvancedOpen ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Sederhanakan
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-4 h-4" />
                  Filter Lanjutan
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Filter Chips */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">
              Filter Cepat:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter, index) => (
              <button
                key={index}
                onClick={() => handleQuickFilter(filter.type, filter.value)}
                className="px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-sm flex items-center gap-1.5 group"
              >
                {filter.label}
                <ChevronDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar Premium */}
        <div className="relative mb-8" ref={searchRef}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl -z-10"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
            <input
              type="text"
              placeholder="🔍 Cari nama, NIM, atau program studi..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-blue-200/50 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-lg placeholder:text-gray-400 transition-all duration-300"
            />
            {filters.searchTerm && (
              <button
                onClick={() => handleFilterChange("searchTerm", "")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleFilterChange("searchTerm", suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600">
                      {suggestion}
                    </span>
                    <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Basic Filters - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Periode Card */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <label className="font-medium text-gray-800">
                Periode Akademik
              </label>
            </div>
            <div className="relative">
              <select
                value={filters.periode}
                onChange={(e) => handleFilterChange("periode", e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none shadow-sm hover:shadow transition-shadow"
              >
                {periodeOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className={option.color}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Gelombang Card */}
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-4 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <label className="font-medium text-gray-800">Gelombang</label>
            </div>
            <div className="relative">
              <select
                value={filters.gelombang}
                onChange={(e) =>
                  handleFilterChange("gelombang", e.target.value)
                }
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none shadow-sm hover:shadow transition-shadow"
              >
                {gelombangOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    <span className="mr-2">{option.badge}</span>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Jenjang Card */}
          <div className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-4 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
              </div>
              <label className="font-medium text-gray-800">Jenjang</label>
            </div>
            <div className="relative">
              <select
                value={filters.jenjang}
                onChange={(e) => handleFilterChange("jenjang", e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none shadow-sm hover:shadow transition-shadow"
              >
                <option value="">Semua Jenjang</option>
                {jenjangOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Advanced Filters dengan Animasi */}
        <AnimatePresence>
          {isAdvancedOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 pt-8 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Program Studi */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-medium text-gray-800">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    Program Studi
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {programStudiOptions.slice(0, 4).map((prodi) => (
                      <button
                        key={prodi.value}
                        onClick={() =>
                          handleFilterChange(
                            "programStudi",
                            filters.programStudi === prodi.value
                              ? ""
                              : prodi.value
                          )
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          filters.programStudi === prodi.value
                            ? `${prodi.color} text-white shadow-md`
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {prodi.label}
                      </button>
                    ))}
                  </div>
                  <select
                    value={filters.programStudi}
                    onChange={(e) =>
                      handleFilterChange("programStudi", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Semua Program Studi</option>
                    {programStudiOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-medium text-gray-800">
                    <BanknoteIcon className="w-4 h-4 text-emerald-600" />
                    Status Keuangan
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => (
                      <button
                        key={status.value}
                        onClick={() =>
                          handleFilterChange(
                            "status",
                            filters.status === status.value ? "" : status.value
                          )
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                          filters.status === status.value
                            ? `${status.color} border-2 border-current shadow-sm`
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {filters.status === status.value && (
                          <Check className="w-3 h-3" />
                        )}
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Jalur Ujian */}
                <div className="space-y-3">
                  <label className="font-medium text-gray-800">
                    Jalur Ujian
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {jalurUjianOptions.map((jalur) => (
                      <button
                        key={jalur.value}
                        onClick={() =>
                          handleFilterChange(
                            "jalurUjian",
                            filters.jalurUjian === jalur.value
                              ? ""
                              : jalur.value
                          )
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                          filters.jalurUjian === jalur.value
                            ? "bg-blue-100 text-blue-700 border-2 border-blue-300 shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span className="text-lg">{jalur.icon}</span>
                        {jalur.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Waktu Kuliah */}
                <div className="space-y-3">
                  <label className="font-medium text-gray-800">
                    Waktu Kuliah
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {waktuKuliahOptions.map((waktu) => (
                      <button
                        key={waktu.value}
                        onClick={() =>
                          handleFilterChange(
                            "waktuKuliah",
                            filters.waktuKuliah === waktu.value
                              ? ""
                              : waktu.value
                          )
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                          filters.waktuKuliah === waktu.value
                            ? `${waktu.color} text-gray-800 border-2 border-current shadow-sm`
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span className="text-lg">{waktu.icon}</span>
                        {waktu.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Range Filters dengan slider effect */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-4 border border-amber-100">
                  <label className="block font-medium text-gray-800 mb-3">
                    Rentang Tagihan
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Minimal"
                        value={filters.minTagihan || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            "minTagihan",
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <span className="text-gray-400">—</span>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Maksimal"
                        value={filters.maxTagihan || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            "maxTagihan",
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-teal-50 rounded-xl p-4 border border-teal-100">
                  <label className="block font-medium text-gray-800 mb-3">
                    Rentang Tanggal
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="date"
                        value={filters.startDate || ""}
                        onChange={(e) =>
                          handleFilterChange("startDate", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <span className="text-gray-400">s/d</span>
                    <div className="flex-1">
                      <input
                        type="date"
                        value={filters.endDate || ""}
                        onChange={(e) =>
                          handleFilterChange("endDate", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters dengan animasi */}
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Filter Aktif ({activeFilterCount})
                </span>
              </div>
              <button
                onClick={() => {
                  const activeFilters = Object.entries(filters).filter(
                    ([key, value]) =>
                      key !== "periode" &&
                      key !== "gelombang" &&
                      key !== "jenjang" &&
                      value &&
                      value.toString().trim() !== ""
                  );

                  if (activeFilters.length > 0) {
                    const newFilters = { ...filters };
                    activeFilters.forEach(([key]) => {
                      newFilters[key as keyof FilterValues] = "";
                    });
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                  }
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Hapus Semua
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (
                  value &&
                  value.toString().trim() !== "" &&
                  key !== "periode" &&
                  key !== "gelombang" &&
                  key !== "jenjang"
                ) {
                  const labelMap: Record<string, string> = {
                    programStudi: "Program Studi",
                    status: "Status",
                    jalurUjian: "Jalur Ujian",
                    waktuKuliah: "Waktu Kuliah",
                    searchTerm: "Pencarian",
                    minTagihan: "Tagihan Min",
                    maxTagihan: "Tagihan Max",
                    startDate: "Dari Tanggal",
                    endDate: "Sampai Tanggal",
                  };

                  return (
                    <motion.span
                      key={key}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200 shadow-sm"
                    >
                      <span className="font-semibold">
                        {labelMap[key] || key}:
                      </span>
                      {key === "searchTerm" ? (
                        <span className="italic">"{value}"</span>
                      ) : (
                        <span>{value}</span>
                      )}
                      <button
                        onClick={() =>
                          handleFilterChange(key as keyof FilterValues, "")
                        }
                        className="ml-1 p-0.5 hover:bg-blue-200 rounded-full transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  );
                }
                return null;
              })}
            </div>
          </motion.div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <span className="text-sm font-semibold text-blue-700">
                {totalResults.toLocaleString()} hasil ditemukan
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              id="reset-btn"
              onClick={handleReset}
              className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center gap-2 group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Reset Semua
            </button>
            <button
              onClick={() => onFilterChange(filters)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2 shadow-md"
            >
              <Search className="w-4 h-4" />
              Terapkan Filter
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {activeFilterCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
