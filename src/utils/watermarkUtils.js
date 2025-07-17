// Shared watermark calculation utilities used by both preview and export
// This ensures identical positioning logic between preview and export

export function getWatermarkColor(watermarkSettings, backgroundColor) {
  if (watermarkSettings.color === 'auto') {
    // Simple brightness detection - convert hex to RGB and check brightness
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }
  if (watermarkSettings.color === 'custom') {
    return watermarkSettings.customColor;
  }
  return watermarkSettings.color;
}

export function getWatermarkFontSize(size, canvasWidth) {
  const baseSize = canvasWidth * 0.025; // 2.5% of canvas width
  switch (size) {
    case 'small': return Math.round(baseSize * 0.7);
    case 'large': return Math.round(baseSize * 1.4);
    case 'medium':
    default: return Math.round(baseSize);
  }
}

export function getWatermarkPosition(position, canvasWidth, canvasHeight, textWidth, textHeight) {
  const margin = Math.max(20, canvasWidth * 0.02); // Adaptive margin
  
  const positions = {
    'top-left': { x: margin, y: margin + textHeight },
    'top-center': { x: (canvasWidth - textWidth) / 2, y: margin + textHeight },
    'top-right': { x: canvasWidth - textWidth - margin, y: margin + textHeight },
    'middle-left': { x: margin, y: (canvasHeight + textHeight) / 2 },
    'middle-center': { x: (canvasWidth - textWidth) / 2, y: (canvasHeight + textHeight) / 2 },
    'middle-right': { x: canvasWidth - textWidth - margin, y: (canvasHeight + textHeight) / 2 },
    'bottom-left': { x: margin, y: canvasHeight - margin },
    'bottom-center': { x: (canvasWidth - textWidth) / 2, y: canvasHeight - margin },
    'bottom-right': { x: canvasWidth - textWidth - margin, y: canvasHeight - margin }
  };
  
  return positions[position] || positions['bottom-right'];
}

export function renderWatermarkOnCanvas(canvas, watermarkSettings, backgroundColor) {
  if (!watermarkSettings.enabled || !watermarkSettings.text.trim()) {
    return;
  }

  const ctx = canvas.getContext('2d');
  
  // Setup watermark text - identical to export logic
  const fontSize = getWatermarkFontSize(watermarkSettings.size, canvas.width);
  const fontWeight = watermarkSettings.fontWeight === 'bold' ? 'bold' : 
                    watermarkSettings.fontWeight === 'medium' ? '500' : 'normal';
  
  ctx.font = `${fontWeight} ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  ctx.textBaseline = 'bottom';
  
  // Measure text
  const textMetrics = ctx.measureText(watermarkSettings.text);
  const textWidth = textMetrics.width;
  const textHeight = fontSize;
  
  // Get position
  const { x, y } = getWatermarkPosition(
    watermarkSettings.position,
    canvas.width,
    canvas.height,
    textWidth,
    textHeight
  );
  
  // Set color and opacity
  const watermarkColor = getWatermarkColor(watermarkSettings, backgroundColor);
  ctx.globalAlpha = watermarkSettings.opacity;
  ctx.fillStyle = watermarkColor;
  
  // Add text shadow for better visibility - identical to export
  ctx.shadowColor = watermarkColor === '#FFFFFF' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)';
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  
  // Draw watermark
  ctx.fillText(watermarkSettings.text, x, y);
  
  // Reset shadow to avoid affecting other drawings
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}