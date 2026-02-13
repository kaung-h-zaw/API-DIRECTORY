import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

const CodeModal = ({ api, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!api) return null;

  // Generate Snippet based on API details
  const snippet = `// Fetch data from ${api.name}
const url = '${api.url}';

try {
  const response = await fetch(url${api.authType === "apiKey" ? ",\n  {\n    headers: {\n      'Authorization': 'YOUR_API_KEY'\n    }\n  }" : ""});
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">How to use {api.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">
            Copy this JavaScript snippet to start using this API in your
            project.
          </p>

          {/* Code Block */}
          <div className="relative group">
            <div className="absolute top-3 right-3">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              >
                {copied ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
            <pre className="bg-[#1e1e1e] text-gray-300 p-5 rounded-xl text-sm font-mono overflow-x-auto border border-gray-800">
              <code>{snippet}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Close
          </button>
          <a
            href={api.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-200"
          >
            Visit Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
