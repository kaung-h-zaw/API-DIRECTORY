import {
  ExternalLink,
  Globe,
  Check,
  X,
  Shield,
  Lock,
  Unlock,
} from "lucide-react";

const ApiCard = ({ api }) => {
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
    <div className="group relative bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* 1. TOP SECTION: Logo & Auth Badge */}
      <div className="flex items-start justify-between mb-4">
        {/* Logo Box */}
        <div className="w-12 h-12 rounded-xl bg-gray-50 p-2 flex items-center justify-center border border-gray-100 group-hover:bg-white group-hover:border-blue-100 transition-colors">
          <img
            src={getFaviconUrl(api.url)}
            alt={`${api.name} logo`}
            className="w-8 h-8 object-contain opacity-90 group-hover:scale-110 transition-transform"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          <Globe className="w-6 h-6 text-gray-400 hidden" />
        </div>

        {/* Auth Status Badge */}
        <div
          className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide ${
            isFree
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-gray-50 text-gray-600 border-gray-200"
          }`}
        >
          {isFree ? <Unlock size={10} /> : <Lock size={10} />}
          {api.authType || "Free"}
        </div>
      </div>

      {/* 2. TITLE & DESCRIPTION */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
        {api.name}
      </h3>
      <p className="text-sm text-gray-500 mb-5 line-clamp-2 flex-grow">
        {api.description}
      </p>

      {/* 3. TECHNICAL SPECS ROW (The details you wanted) */}
      <div className="flex items-center gap-4 border-t border-b border-gray-50 py-3 mb-4 text-xs font-medium text-gray-500">
        {/* CORS Status */}
        <div
          className="flex items-center gap-1.5"
          title="Cross-Origin Resource Sharing"
        >
          {hasCors ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <X size={14} className="text-orange-500" />
          )}
          <span className={hasCors ? "text-gray-700" : "text-gray-400"}>
            CORS
          </span>
        </div>

        {/* HTTPS Status (Assumed Yes for modern list) */}
        <div className="flex items-center gap-1.5">
          <Check size={14} className="text-green-500" />
          <span className="text-gray-700">HTTPS</span>
        </div>
      </div>

      {/* 4. FOOTER: Category & Action */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md uppercase tracking-wide">
          {api.category}
        </span>

        <a
          href={api.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
        >
          Try It
          <ExternalLink
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </a>
      </div>
    </div>
  );
};

export default ApiCard;
