import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import ApiCard from "../components/ApiCard";
import Navbar from "../components/Navbar";
import CategoryModal from "../components/CategoryModal";
import SkeletonCard from "../components/SkeletonCard"; // Import Skeleton
import { ChevronLeft, ChevronRight } from "lucide-react";
import LoadingState from "../components/LoadingState";

const Home = () => {
  const [apis, setApis] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Popup State
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchApis = async () => {
      try {
        setLoading(true);
        // Simulate a slight delay to show off the skeleton (remove setTimeout in production)
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

  // Filter Logic
  const filteredApis = apis.filter((api) => {
    const matchesSearch = api.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || api.category === category;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApis = filteredApis.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApis.length / itemsPerPage);

  const categories = [
    "All",
    ...new Set(apis.map((api) => api.category)),
  ].sort();

  // Smart Pagination Logic
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
        category={category}
        onCategoryClick={() => setShowCategoryPopup(true)}
      />

      {/* 2. Grid Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl text-gray-800">
            {category === "All" ? "All Resources" : `${category} Tools`}
          </h2>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {loading ? "..." : `${filteredApis.length} Results`}
          </span>
        </div>

        {/* LOADING STATE: Skeleton Grid */}
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {/* DATA STATE: Actual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentApis.map((api) => (
                <ApiCard key={api._id} api={api} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-20">
                <div className="bg-white border border-gray-200 shadow-xl shadow-gray-100 rounded-full px-2 py-1.5 flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
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
                          onClick={() => setCurrentPage(pageNum)}
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
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors text-gray-600"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {currentApis.length === 0 && (
              <div className="text-center py-32 opacity-60">
                <p className="text-xl font-bold text-gray-300 mb-2">
                  No results found
                </p>
                <p className="text-sm text-gray-400">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* 3. Category Modal Component */}
      <CategoryModal
        isOpen={showCategoryPopup}
        onClose={() => setShowCategoryPopup(false)}
        categories={categories}
        activeCategory={category}
        onSelectCategory={(cat) => {
          setCategory(cat);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default Home;
