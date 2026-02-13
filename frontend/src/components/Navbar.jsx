import { Search, Bookmark } from "lucide-react";

const Navbar = ({
  search,
  setSearch,
  apiCount,
  savedCount,
  showSavedOnly,
  setShowSavedOnly,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* Logo / Title */}
        <div className="flex flex-col shrink-0">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            APIVault
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-blue-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#1976D2"
                  d="M10.825 20.975q-1.575-.05-2.987-.375t-2.488-.863T3.638 18.5T3 17q0 .8.638 1.5t1.712 1.238t2.488.862t2.987.375m-1.25-5.125q-.575-.075-1.2-.187t-1.225-.275T6 15t-1-.475q.45.25 1 .475t1.15.388t1.225.275t1.2.187M12 9q2.2 0 4.463-.638T19 7.026q-.275-.725-2.512-1.375T12 5q-2.275 0-4.462.638T5 7.025q.375.725 2.613 1.35T12 9m-9 8V7q0-.825.713-1.55T5.65 4.175t2.863-.862T12 3t3.488.313t2.862.862t1.938 1.275T21 7t-.712 1.55t-1.938 1.275t-2.863.863T12 11q-2.125 0-3.925-.375T5 9.525v2.525q.85.775 2.062 1.2t2.513.6q.425.05.688.35t.262.725q0 .4-.275.688t-.675.237q-1.175-.125-2.425-.462T5 14.525V17q.3.575 1.8 1.088t4.05.762q.425.05.688.375t.262.75t-.275.725t-.7.275q-1.575-.05-2.987-.375t-2.488-.863T3.638 18.5T3 17m13.5 4q-1.875 0-3.187-1.312T12 16.5t1.313-3.187T16.5 12t3.188 1.313T21 16.5q0 .65-.187 1.25T20.3 18.9l2 2q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-2-2q-.55.325-1.15.513T16.5 21m0-2q1.05 0 1.775-.725T19 16.5t-.725-1.775T16.5 14t-1.775.725T14 16.5t.725 1.775T16.5 19"
                />
              </svg>
              {apiCount}
            </span>
          </h1>
          <span className="text-xs text-gray-400 hidden sm:block">
            Open source API collection
          </span>
        </div>

        {/* Middle: Search Bar */}
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search 1400+ APIs..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 focus:outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Right: Actions (Saved Button) */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Icon (optional) */}
          <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Search size={20} />
          </button>

          {/* MY SAVED BUTTON */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border transition-all ${
              showSavedOnly
                ? "bg-yellow-50 text-yellow-700 border-yellow-200 ring-2 ring-yellow-100/50"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Bookmark
              size={16}
              className={showSavedOnly ? "fill-yellow-700" : ""}
            />
            <span className="hidden sm:inline">Saved</span>
            <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-md text-[10px] ml-1">
              {savedCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
