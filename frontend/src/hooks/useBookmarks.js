import { useState, useEffect } from "react";

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("devhub_bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }
  }, []);

  // Toggle Bookmark
  const toggleBookmark = (apiId) => {
    let newBookmarks;
    if (bookmarks.includes(apiId)) {
      newBookmarks = bookmarks.filter((id) => id !== apiId);
    } else {
      newBookmarks = [...bookmarks, apiId];
    }

    setBookmarks(newBookmarks);
    localStorage.setItem("devhub_bookmarks", JSON.stringify(newBookmarks));
  };

  const isBookmarked = (apiId) => bookmarks.includes(apiId);

  return { bookmarks, toggleBookmark, isBookmarked };
};

export default useBookmarks;
