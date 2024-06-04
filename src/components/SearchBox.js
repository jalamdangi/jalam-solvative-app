import React, { useState, useEffect } from 'react';

function SearchBox({ searchTerm, onSearchTermChange, onSearch }) {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    onSearchTermChange(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        document.getElementById('search-input').focus();
      }
    };
    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, []); 

  return (
    <div className="search-box">
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Search places... (Ctrl+/)"
        className={focused ? 'focused' : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchBox;
