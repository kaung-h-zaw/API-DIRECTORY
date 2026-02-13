import { Filter, X, ChevronDown, Grid } from "lucide-react";

const FilterBar = ({
  selectedCategory,
  setSelectedCategory, // We use this directly now
  filterAuth,
  setFilterAuth,
  filterCors,
  setFilterCors,
  clearFilters,
  categories = [], // Pass the filtered list of top categories
}) => {
  const hasFilters =
    selectedCategory !== "All" || filterAuth !== "All" || filterCors !== "All";

  // Reusable Select Component
  const Select = ({ value, onChange, options, label }) => (
    <div className="relative group min-w-[160px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-full pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all cursor-pointer shadow-sm w-full truncate"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <ChevronDown size={14} />
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Filter Group */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <span className="text-sm font-bold text-gray-900 flex items-center gap-2 mr-2">
          <Filter size={16} className="text-blue-600" />
          Filters
        </span>

        {/* 1. CATEGORY DROPDOWN (Replaced Modal Button) */}
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          label="Category"
          options={categories.map((cat) => ({
            value: cat,
            label: cat === "All" ? "All Categories" : cat,
          }))}
        />

        {/* 2. AUTH DROPDOWN */}
        <Select
          value={filterAuth}
          onChange={setFilterAuth}
          label="Auth"
          options={[
            { value: "All", label: "All Auth Types" },
            { value: "No Auth", label: "Free (No Key)" },
            { value: "apiKey", label: "API Key" },
            { value: "OAuth", label: "OAuth" },
          ]}
        />

        {/* 3. CORS DROPDOWN */}
        <Select
          value={filterCors}
          onChange={setFilterCors}
          label="CORS"
          options={[
            { value: "All", label: "CORS: Any" },
            { value: "yes", label: "CORS: Yes" },
            { value: "no", label: "CORS: No" },
            { value: "unknown", label: "CORS: Unknown" },
          ]}
        />
      </div>

      {/* Reset Button */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
        >
          <X size={14} /> Clear All
        </button>
      )}
    </div>
  );
};

export default FilterBar;
