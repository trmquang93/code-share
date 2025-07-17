import React from 'react';

const PositionSelector = ({ 
  selectedPosition = 'bottom-right', 
  onPositionChange,
  className = '' 
}) => {
  const positions = [
    'top-left', 'top-center', 'top-right',
    'middle-left', 'middle-center', 'middle-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ];

  const getPositionLabel = (position) => {
    const labels = {
      'top-left': 'Top Left',
      'top-center': 'Top Center',
      'top-right': 'Top Right',
      'middle-left': 'Middle Left',
      'middle-center': 'Center',
      'middle-right': 'Middle Right',
      'bottom-left': 'Bottom Left',
      'bottom-center': 'Bottom Center',
      'bottom-right': 'Bottom Right'
    };
    return labels[position] || position;
  };

  return (
    <div className={`premium-position-selector ${className}`}>
      <label className="premium-label">
        Watermark Position
      </label>
      <div 
        className="premium-position-grid"
        role="radiogroup"
        aria-label="Watermark position selector"
      >
        {positions.map((position) => (
          <button
            key={position}
            onClick={() => onPositionChange(position)}
            className={`premium-position-option ${selectedPosition === position ? 'premium-position-option-selected' : ''}`}
            role="radio"
            aria-checked={selectedPosition === position}
            aria-label={getPositionLabel(position)}
            title={getPositionLabel(position)}
          >
            <div className="premium-position-dot">
              {selectedPosition === position && (
                <div className="premium-position-indicator" />
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="premium-position-preview">
        <span className="premium-position-label">
          {getPositionLabel(selectedPosition)}
        </span>
      </div>
    </div>
  );
};

export default PositionSelector;