import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import ApiCard from "../components/ApiCard";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import LoadingState from "../components/LoadingState";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useBookmarks from "../hooks/useBookmarks";

const Home = () => {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filterAuth, setFilterAuth] = useState("All");
  const [filterCors, setFilterCors] = useState("All");

  // Feature States
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchApis = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/resources");
        setApis(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApis();
  }, []);

  const clearFilters = () => {
    setCategory("All");
    setFilterAuth("All");
    setFilterCors("All");
    setSearch("");
    setCurrentPage(1);
    setShowSavedOnly(false); // Also reset saved filter
  };

  // ✅ FIXED FILTER LOGIC
  const filteredApis = apis.filter((api) => {
    // 1. Saved Filter (Check this first for performance)
    if (showSavedOnly && !isBookmarked(api._id)) return false;

    // 2. Search
    const matchesSearch =
      api.name.toLowerCase().includes(search.toLowerCase()) ||
      api.description.toLowerCase().includes(search.toLowerCase());

    // 3. Category
    const matchesCategory = category === "All" || api.category === category;

    // 4. Auth
    const matchesAuth =
      filterAuth === "All" ||
      (filterAuth === "No Auth" &&
        (!api.authType || api.authType === "No Auth" || api.authType === "")) ||
      api.authType === filterAuth;

    // 5. CORS
    const matchesCors =
      filterCors === "All" ||
      api.cors?.toLowerCase() === filterCors.toLowerCase();

    // ✅ Return ALL conditions
    return matchesSearch && matchesCategory && matchesAuth && matchesCors;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApis = filteredApis.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApis.length / itemsPerPage);

  // Dynamic Categories
  const getTopCategories = () => {
    if (!apis.length) return [];
    const counts = {};
    apis.forEach((api) => {
      if (api.category) counts[api.category] = (counts[api.category] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 24)
      .map((entry) => entry[0])
      .sort();
  };

  const categories = ["All", ...getTopCategories()];

  // Pagination Helper
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans">
      {/* 1. Navbar */}
      <Navbar
        search={search}
        setSearch={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        apiCount={apis.length}
        savedCount={bookmarks.length}
        showSavedOnly={showSavedOnly}
        setShowSavedOnly={(val) => {
          setShowSavedOnly(val);
          setCurrentPage(1);
        }}
      />

      {/* 2. Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
        {/* Filter Bar */}
        <div className="mb-8 border-b border-gray-100 pb-8">
          <FilterBar
            selectedCategory={category}
            setSelectedCategory={(val) => {
              setCategory(val);
              setCurrentPage(1);
            }}
            filterAuth={filterAuth}
            setFilterAuth={(val) => {
              setFilterAuth(val);
              setCurrentPage(1);
            }}
            filterCors={filterCors}
            setFilterCors={(val) => {
              setFilterCors(val);
              setCurrentPage(1);
            }}
            clearFilters={clearFilters}
            categories={categories}
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl text-gray-800">
            {showSavedOnly
              ? "My Bookmarks"
              : category === "All"
                ? "All Resources"
                : category}
          </h2>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {loading ? "..." : `${filteredApis.length} Results`}
          </span>
        </div>

        {/* Loading & Grid */}
        {loading ? (
          <LoadingState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentApis.map((api) => (
                <ApiCard
                  key={api._id}
                  api={api}
                  onShowCode={() => setSelectedApiForCode(api)}
                  // ✅ ADDED THESE PROPS (Required for bookmarking)
                  isBookmarked={isBookmarked(api._id)}
                  onToggleBookmark={() => toggleBookmark(api._id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-20">
                <div className="bg-white border border-gray-200 shadow-xl shadow-gray-100 rounded-full px-2 py-1.5 flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((p) => p - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors text-gray-600"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-1 px-2 border-l border-r border-gray-100 h-6">
                    {getPageNumbers().map((pageNum, idx) =>
                      pageNum === "..." ? (
                        <span
                          key={idx}
                          className="text-gray-300 px-2 text-xs font-bold"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                            currentPage === pageNum
                              ? "bg-black text-white shadow-md shadow-gray-300"
                              : "text-gray-500 hover:bg-gray-50 hover:text-black"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((p) => p + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors text-gray-600"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && currentApis.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl font-bold text-gray-300 mb-2">
                  {showSavedOnly ? "No saved APIs yet" : "No results found"}
                </p>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 font-bold mt-2 hover:underline"
                >
                  {showSavedOnly ? "Browse all APIs" : "Clear filters"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
