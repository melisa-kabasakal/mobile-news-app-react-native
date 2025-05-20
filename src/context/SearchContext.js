import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce'; // bunu kurduğuna emin ol: npm i lodash.debounce

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({ posts: [], videos: [], writers: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (searchQuery.trim().length === 0) {
    setResults({ posts: [], videos: [], writers: [] });
    return; // erken çık
  }

  const debouncedFetch = debounce(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://192.168.1.100:3001/search-all?q=${encodeURIComponent(searchQuery)}`
      );
      setResults(res.data);
    } catch (err) {
      console.error('Search error:', err.message);
      setResults({ posts: [], videos: [], writers: [] });
    } finally {
      setLoading(false);
    }
  }, 400);

  debouncedFetch();
  return () => debouncedFetch.cancel();
}, [searchQuery]);


  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, results, loading }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
