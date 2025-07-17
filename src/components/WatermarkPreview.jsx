import React, { useRef, useEffect } from 'react';
import { renderWatermarkOnCanvas } from '../utils/watermarkUtils';

const WatermarkPreview = ({ 
  watermarkSettings, 
  backgroundColor = '#F5F5F5',
  className = '' 
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !watermarkSettings.enabled || !watermarkSettings.text.trim()) {
      // Clear canvas if watermark is disabled
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const updateWatermarkPreview = () => {
      // Get the container element to match its dimensions
      const container = document.getElementById('code-preview');
      if (!container) return;

      // Get container dimensions
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Set canvas size to match container exactly
      canvas.width = containerWidth;
      canvas.height = containerHeight;

      // Apply the same 2x scaling that the export uses for font calculations
      // This ensures the watermark preview uses the same font sizes as export
      const scaledWidth = containerWidth * 2; // Simulate html2canvas scale: 2
      const scaledHeight = containerHeight * 2;

      // Clear the canvas
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create a temporary canvas with scaled dimensions for calculations
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = scaledWidth;
      tempCanvas.height = scaledHeight;

      // Render watermark on temp canvas using export logic
      renderWatermarkOnCanvas(tempCanvas, watermarkSettings, backgroundColor);

      // Now scale down and draw on the preview canvas
      ctx.drawImage(tempCanvas, 0, 0, scaledWidth, scaledHeight, 0, 0, containerWidth, containerHeight);
    };

    // Initial render
    updateWatermarkPreview();

    // Update on resize
    const handleResize = () => {
      updateWatermarkPreview();
    };

    // Listen for container size changes
    const resizeObserver = new ResizeObserver(handleResize);
    const container = document.getElementById('code-preview');
    if (container) {
      resizeObserver.observe(container);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [watermarkSettings, backgroundColor]);

  if (!watermarkSettings.enabled || !watermarkSettings.text.trim()) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`watermark-preview-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        opacity: 1
      }}
      title="Live watermark preview - this will appear on exported images"
    />
  );
};

export default WatermarkPreview;