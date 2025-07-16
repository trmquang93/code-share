import React, { useState, useRef, useEffect } from 'react';
import { languages, searchLanguages } from '../data/languages';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languages);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Filter languages based on search
  useEffect(() => {
    setFilteredLanguages(searchLanguages(searchQuery));
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleLanguageSelect = (languageId) => {
    onLanguageChange(languageId);
    setIsOpen(false);
    setSearchQuery('');
  };

  const selectedLanguageObj = languages.find(lang => lang.id === selectedLanguage);

  return (
    <div className={`premium-language-selector ${className}`} ref={dropdownRef}>
      <label className="premium-label">
        Language
      </label>
      
      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`premium-language-button ${isOpen ? 'premium-language-button-active' : ''}`}
      >
        <span className="premium-language-selected">
          {selectedLanguageObj ? selectedLanguageObj.name : 'Select Language'}
        </span>
        <span className="premium-language-arrow">
          <svg className={`premium-language-arrow-icon ${isOpen ? 'premium-language-arrow-icon-open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="premium-language-dropdown">
          {/* Search input */}
          <div className="premium-language-search">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search languages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="premium-language-search-input"
            />
          </div>

          {/* Language options */}
          <div className="premium-language-options">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => handleLanguageSelect(language.id)}
                  className={`premium-language-option ${
                    selectedLanguage === language.id 
                      ? 'premium-language-option-selected' 
                      : ''
                  }`}
                >
                  {language.name}
                </button>
              ))
            ) : (
              <div className="premium-language-no-results">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;