import html2canvas from 'html2canvas';

export const exportFormats = {
  PNG: 'png',
  JPG: 'jpg'
};

export const defaultExportSettings = {
  format: exportFormats.PNG,
  width: 1920,
  backgroundColor: '#F5F5F5',
  padding: 64,
  shadow: false,
  quality: 1.0
};

export async function exportCodeAsImage(elementId, settings = {}) {
  const finalSettings = { ...defaultExportSettings, ...settings };
  
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Configure html2canvas options
    const options = {
      backgroundColor: finalSettings.backgroundColor,
      scale: 2, // High DPI for quality
      useCORS: true,
      allowTaint: true,
      width: finalSettings.width,
      height: null, // Auto height
      scrollX: 0,
      scrollY: 0,
      windowWidth: finalSettings.width,
      windowHeight: window.innerHeight,
      onclone: (clonedDoc) => {
        // Ensure all styles are preserved in the cloned document
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.margin = `${finalSettings.padding}px`;
          clonedElement.style.transform = 'none';
          clonedElement.style.position = 'static';
        }
      }
    };

    // Generate canvas
    const canvas = await html2canvas(element, options);
    
    // Convert to blob
    const format = finalSettings.format === exportFormats.JPG ? 'image/jpeg' : 'image/png';
    const quality = finalSettings.format === exportFormats.JPG ? finalSettings.quality : undefined;
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to generate image'));
        }
      }, format, quality);
    });
    
  } catch (error) {
    console.error('Export error:', error);
    throw error;
  }
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateFilename(language, format) {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  return `code-snippet-${language}-${timestamp}.${format}`;
}