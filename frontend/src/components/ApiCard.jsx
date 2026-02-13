import {
  ExternalLink,
  Globe,
  Check,
  X,
  Lock,
  Unlock,
  Code,
  Bookmark,
} from "lucide-react";

const ApiCard = ({ api, onShowCode, isBookmarked, onToggleBookmark }) => {
  // Helper to get favicon URL
  const getFaviconUrl = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch (e) {
      return null;
    }
  };

  const isFree =
    !api.authType || api.authType === "No Auth" || api.authType === "";
  const hasCors = api.cors === "yes" || api.cors === "Yes";

  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
      {/* 1. TOP SECTION */}
      <div className="flex items-start justify-between mb-3">
        {/* Logo */}
        <div className="w-10 h-10 rounded-lg bg-gray-50 p-1.5 flex items-center justify-center border border-gray-100 group-hover:bg-white group-hover:border-blue-100 transition-colors">
          <img
            src={getFaviconUrl(api.url)}
            alt={`${api.name} logo`}
            className="w-full h-full object-contain opacity-90 group-hover:scale-110 transition-transform"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          <Globe className="w-5 h-5 text-gray-400 hidden" />
        </div>

        {/* ACTIONS: Auth Badge + Bookmark */}
        <div className="flex items-center gap-2">
          {/* Auth Badge */}
          <div
            className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
              isFree
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-gray-50 text-gray-600 border-gray-200"
            }`}
          >
            {isFree ? <Unlock size={9} /> : <Lock size={9} />}
            {api.authType || "Free"}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleBookmark(); // Call the toggle function
            }}
            className={`p-1.5 rounded-md transition-all duration-200 border ${
              isBookmarked
                ? "bg-yellow-50 border-yellow-200 text-yellow-600"
                : "bg-white border-gray-200 text-gray-400 hover:text-yellow-500 hover:border-yellow-200"
            }`}
            title={isBookmarked ? "Remove from bookmarks" : "Save for later"}
          >
            <Bookmark
              size={14}
              className={isBookmarked ? "fill-yellow-600" : ""}
            />
          </button>
        </div>
      </div>

      {/* 2. CONTENT */}
      <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
        {api.name}
      </h3>
      <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
        {api.description}
      </p>

      {/* 3. SPECS ROW */}
      <div className="flex items-center gap-3 border-t border-b border-gray-50 py-2 mb-3 text-[10px] font-semibold text-gray-500">
        <div
          className="flex items-center gap-1.5"
          title="Cross-Origin Resource Sharing"
        >
          {hasCors ? (
            <Check size={12} className="text-green-500" />
          ) : (
            <X size={12} className="text-orange-500" />
          )}
          <span className={hasCors ? "text-gray-700" : "text-gray-400"}>
            CORS
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Check size={12} className="text-green-500" />
          <span className="text-gray-700">HTTPS</span>
        </div>
      </div>

      {/* 4. FOOTER */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md uppercase tracking-wide truncate max-w-[80px]">
          {api.category}
        </span>

        <div className="flex items-center gap-2">
          {/* Code Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onShowCode();
            }}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="View Code Snippet"
          >
            <Code size={16} />
          </button>

          {/* Try It Link */}
          <a
            href={api.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors pl-1"
          >
            Try It
            <ExternalLink
              size={12}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiCard;
