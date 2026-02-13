import { Search, Filter, ChevronDown } from "lucide-react";

const Navbar = ({ search, setSearch, apiCount, category, onCategoryClick }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* Logo / Title */}
        <div className="flex flex-col shrink-0">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            API Directory
            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200">
              {apiCount}
            </span>
          </h1>
          <span className="text-xs text-gray-400 hidden sm:block">
            Free developer resources
          </span>
        </div>

        {/* Search & Filter Group */}
        <div className="flex items-center gap-3 w-full max-w-xl justify-end">
          {/* Search Bar */}
          <div className="relative w-full max-w-sm hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search APIs..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 focus:outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Categories Button (Moved Here) */}
          <button
            onClick={onCategoryClick}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black text-white text-sm font-bold shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all active:scale-95 shrink-0"
          >
            <Filter size={14} />
            <span className="hidden md:inline">
              {category === "All" ? "Categories" : category}
            </span>
            <span className="md:hidden">Filter</span>
            <ChevronDown size={14} className="opacity-70" />
          </button>
        </div>
      </div>

      {/* Mobile Search (Visible only on small screens) */}
      <div className="px-6 pb-4 sm:hidden">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search APIs..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 focus:outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
