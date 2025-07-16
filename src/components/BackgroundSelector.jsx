import React, { useState, useRef, useEffect } from 'react';

const BackgroundSelector = ({ 
  backgroundColor, 
  onBackgroundColorChange, 
  className = '' 
}) => {
  const [customColor, setCustomColor] = useState(backgroundColor || '#F5F5F5');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const colorGridRef = useRef(null);
  
  const predefinedColors = [
    { name: 'Light Gray', value: '#F5F5F5' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Dark Gray', value: '#1F1F1F' },
    { name: 'Black', value: '#000000' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Red', value: '#EF4444' }
  ];

  const handleColorChange = (color) => {
    setCustomColor(color);
    onBackgroundColorChange(color);
  };

  const handleKeyDown = (event, index) => {
    let newIndex = index;
    
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (index + 1) % predefinedColors.length;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = index === 0 ? predefinedColors.length - 1 : index - 1;
        break;
      case 'ArrowDown':
        event.preventDefault();
        newIndex = Math.min(index + 4, predefinedColors.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        newIndex = Math.max(index - 4, 0);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleColorChange(predefinedColors[index].value);
        return;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = predefinedColors.length - 1;
        break;
      default:
        return;
    }
    
    setFocusedIndex(newIndex);
    
    // Focus the new button
    const buttons = colorGridRef.current?.querySelectorAll('.premium-color-swatch');
    if (buttons && buttons[newIndex]) {
      buttons[newIndex].focus();
    }
  };

  const getSelectedIndex = () => {
    return predefinedColors.findIndex(color => color.value === backgroundColor);
  };

  useEffect(() => {
    const selectedIndex = getSelectedIndex();
    if (selectedIndex !== -1) {
      setFocusedIndex(selectedIndex);
    }
  }, [backgroundColor]);

  const generateColorDescription = (color) => {
    // Enhanced color descriptions for better accessibility
    const colorDescriptions = {
      '#F5F5F5': 'Light gray background',
      '#FFFFFF': 'White background',
      '#1F1F1F': 'Dark gray background',
      '#000000': 'Black background',
      '#3B82F6': 'Blue background',
      '#10B981': 'Green background',
      '#8B5CF6': 'Purple background',
      '#EF4444': 'Red background'
    };
    return colorDescriptions[color.value] || `${color.name} background`;
  };

  return (
    <div className={`premium-background-selector ${className}`}>
      <div>
        <h3 
          className="premium-label" 
          id="background-color-label"
        >
          Background Color
        </h3>
        <div className="premium-color-controls">
          {/* Predefined colors with accessibility improvements */}
          <div 
            className="premium-color-grid"
            ref={colorGridRef}
            role="radiogroup"
            aria-labelledby="background-color-label"
            aria-describedby="color-selection-help"
          >
            {predefinedColors.map((color, index) => {
              const isSelected = backgroundColor === color.value;
              const isFocused = index === focusedIndex;
              
              return (
                <button
                  key={color.value}
                  onClick={() => handleColorChange(color.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`premium-color-swatch ${
                    isSelected ? 'premium-color-swatch-selected' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={generateColorDescription(color)}
                  tabIndex={isFocused ? 0 : -1}
                  aria-describedby={isSelected ? 'selected-color-feedback' : undefined}
                >
                  {/* Visual indicator for selected state */}
                  {isSelected && (
                    <span 
                      className="premium-color-swatch-checkmark"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Hidden helper text for screen readers */}
          <div 
            id="color-selection-help" 
            className="sr-only"
          >
            Use arrow keys to navigate between colors, Enter or Space to select
          </div>
          
          {/* Selected color feedback */}
          <div 
            id="selected-color-feedback" 
            className="sr-only" 
            aria-live="polite"
          >
            {backgroundColor && `Selected background color: ${predefinedColors.find(c => c.value === backgroundColor)?.name || 'Custom'}`}
          </div>
          
          {/* Custom color picker with improved accessibility */}
          <div className="premium-custom-color">
            <label htmlFor="color-picker" className="sr-only">
              Custom color picker
            </label>
            <input
              id="color-picker"
              type="color"
              value={customColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="premium-color-picker"
              aria-label="Choose custom background color"
            />
            <label htmlFor="color-input" className="sr-only">
              Custom color hex value
            </label>
            <input
              id="color-input"
              type="text"
              value={customColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="premium-color-input"
              placeholder="#F5F5F5"
              aria-label="Enter custom color hex value"
              pattern="^#[0-9A-Fa-f]{6}$"
              title="Enter a valid hex color code (e.g., #F5F5F5)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSelector;