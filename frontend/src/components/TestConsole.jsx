import { useState } from "react";
import axios from "axios";

const TestConsole = ({ targetUrl }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    try {
      // Note: This might fail if the target API doesn't allow CORS.
      // In a real production app, you'd proxy this request through YOUR backend.
      const res = await axios.get(targetUrl);
      setResponse(res.data);
    } catch (err) {
      setError(err.message + (err.response ? `: ${err.response.status}` : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-sm font-mono truncate">
          {targetUrl}
        </span>
        <button
          onClick={handleTest}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Endpoint"}
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-xs font-mono mb-2">
          Error: {error}
        </div>
      )}

      {response && (
        <pre className="text-green-400 text-xs font-mono overflow-auto max-h-40 bg-black p-2 rounded">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestConsole;
