const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-32 min-h-[50vh]">
      {/* SVG Spinner */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 50 50"
        className="mb-6 drop-shadow-sm" // Added shadow for depth
      >
        <g fill="none" stroke="#1976D2" strokeWidth="2">
          <g>
            <rect x="10" y="10" width="30" height="6" rx="1">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
              ></animate>
            </rect>

            <circle cx="35" cy="13" r="1" fill="#2563EB">
              <animate
                attributeName="fill"
                values="#2563EB;#00ff00;#2563EB"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
              ></animate>
            </circle>
          </g>
          <g>
            <rect x="10" y="18" width="30" height="6" rx="1">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1s"
                begin="0.2s"
                repeatCount="indefinite"
              ></animate>
            </rect>
            <circle cx="35" cy="21" r="1" fill="#2563EB">
              <animate
                attributeName="fill"
                values="#2563EB;#00ff00;#2563EB"
                dur="1s"
                begin="0.2s"
                repeatCount="indefinite"
              ></animate>
            </circle>
          </g>
          <g>
            <rect x="10" y="26" width="30" height="6" rx="1">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1s"
                begin="0.4s"
                repeatCount="indefinite"
              ></animate>
            </rect>
            <circle cx="35" cy="29" r="1" fill="#2563EB">
              <animate
                attributeName="fill"
                values="#2563EB;#00ff00;#2563EB"
                dur="1s"
                begin="0.4s"
                repeatCount="indefinite"
              ></animate>
            </circle>
          </g>
          <g>
            <rect x="10" y="34" width="30" height="6" rx="1">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1s"
                begin="0.6000000000000001s"
                repeatCount="indefinite"
              ></animate>
            </rect>
            <circle cx="35" cy="37" r="1" fill="#2563EB">
              <animate
                attributeName="fill"
                values="#2563EB;#00ff00;#2563EB"
                dur="1s"
                begin="0.6000000000000001s"
                repeatCount="indefinite"
              ></animate>
            </circle>
          </g>
        </g>
      </svg>

      {/* Loading Text */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">Fetching Data...</h3>
      <p className="text-gray-500 font-medium animate-pulse">
        Gathering the best APIs for you
      </p>
    </div>
  );
};

export default LoadingState;
