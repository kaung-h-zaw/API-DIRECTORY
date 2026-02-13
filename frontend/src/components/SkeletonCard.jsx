const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col h-full animate-pulse">
      {/* Icon & Badge Placeholder */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
        <div className="w-12 h-5 bg-gray-200 rounded-full"></div>
      </div>

      {/* Title Placeholder */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

      {/* Description Placeholders */}
      <div className="space-y-2 mb-6 flex-grow">
        <div className="h-3 bg-gray-100 rounded w-full"></div>
        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
        <div className="h-3 bg-gray-100 rounded w-4/6"></div>
      </div>

      {/* Footer Placeholder */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
