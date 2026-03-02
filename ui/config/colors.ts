// Color Configuration for ComKit UI
// You can modify these colors to change the entire theme

export const colors = {
  // Primary Sage Green Palette
  primary: {
    50: '#DCE2BD', // Lightest
    100: '#D4CDAB', // Light
    200: '#B6C4A2', // Medium Light
    300: '#93C0A4', // Medium
    400: '#8E9B90', // Main
    500: '#7A8A7C', // Dark
    600: '#6B7A6D', // Darker
    700: '#5C6A5E', // Darkest
  },
  
  // Alternative naming (sage) for easier access
  sage: {
    50: '#DCE2BD',
    100: '#D4CDAB',
    200: '#B6C4A2',
    300: '#93C0A4',
    400: '#8E9B90',
    500: '#7A8A7C',
    600: '#6B7A6D',
    700: '#5C6A5E',
  },
  
  // Semantic Colors
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
}

// Helper function to get color value
export const getColor = (colorName: string, shade?: number | string): string => {
  const colorPath = colorName.split('.')
  let color: any = colors
  
  for (const path of colorPath) {
    color = color[path]
  }
  
  if (shade && typeof color === 'object') {
    return color[shade] || color[400] // Default to 400 if shade not found
  }
  
  return color || '#000000' // Fallback to black
}

// Export default for easier imports
export default colors
