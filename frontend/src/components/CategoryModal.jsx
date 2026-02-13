import { X } from "lucide-react";

const CategoryModal = ({
  isOpen,
  onClose,
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50 bg-white sticky top-0 z-10">
          <h3 className="font-bold text-lg text-gray-900">Select Category</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable List */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50/50">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                onClose();
              }}
              className={`px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all border ${
                activeCategory === cat
                  ? "bg-black text-white border-black shadow-lg shadow-black/10 ring-1 ring-black ring-offset-2"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
