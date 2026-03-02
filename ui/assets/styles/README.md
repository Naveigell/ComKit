# ComKit Color System

This directory contains the color configuration and styling system for the ComKit UI.

## 🎨 Color Palette

The application uses a sage green color palette with the following shades:

- **50**: `#DCE2BD` - Lightest (backgrounds)
- **100**: `#D4CDAB` - Light (subtle backgrounds)
- **200**: `#B6C4A2` - Medium Light (borders)
- **300**: `#93C0A4` - Medium (hover states)
- **400**: `#8E9B90` - Main (primary actions)
- **500**: `#7A8A7C` - Dark (pressed states)
- **600**: `#6B7A6D` - Darker (text)
- **700**: `#5C6A5E` - Darkest (headings)

## 📁 Files

### `colors.css`
- Contains CSS custom properties and utility classes
- Imported globally in `app.vue` using CSS @import
- Provides CSS variables for easy access

### `../../config/colors.ts`
- TypeScript color configuration
- Helper functions for programmatic color access
- Easy to modify for theme changes

## 🛠️ Usage

### In Vue Components (Tailwind Classes)
```vue
<template>
  <!-- Background colors -->
  <div class="bg-primary-400">Main background</div>
  <div class="bg-primary-50">Light background</div>
  
  <!-- Text colors -->
  <p class="text-primary-600">Primary text</p>
  <p class="text-primary-400">Main text</p>
  
  <!-- Border colors -->
  <div class="border-primary-300">Primary border</div>
  
  <!-- Focus states -->
  <input class="focus:ring-primary-400 focus:border-primary-400" />
  
  <!-- Hover states -->
  <button class="bg-primary-400 hover:bg-primary-500">Button</button>
</template>
```

### In CSS/SCSS
```css
.my-component {
  background-color: var(--color-primary-400);
  color: var(--color-primary-600);
  border-color: var(--color-primary-300);
}
```

### Importing CSS in Vue Components
```vue
<style>
/* Use relative path for CSS files */
@import '../assets/styles/colors.css';

/* Your component styles */
.my-component {
  background-color: var(--color-primary-400);
}
</style>
```

### In TypeScript
```typescript
import { colors, getColor } from '~/config/colors'

// Access colors directly
const mainColor = colors.primary[400] // '#8E9B90'

// Use helper function
const textColor = getColor('primary', 600) // '#6B7A6D'
const bgColor = getColor('sage.50') // '#DCE2BD'
```

## 🎯 Customization

To change the entire theme:

1. **Modify the color values** in `../../config/colors.ts`
2. **Update CSS variables** in `colors.css`
3. **Update Tailwind config** in `tailwind.config.js`

### Example: Changing to Blue Theme
```typescript
// In config/colors.ts
export const colors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA', // Main blue
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
  },
  // ... rest of colors
}
```

## ⚠️ Important Notes

### CSS Import Method
- **Use CSS @import** in `<style>` blocks for CSS files
- **Do NOT use JavaScript imports** for CSS files in Vue components
- This prevents module resolution errors in Vitest/Nuxt

### Path Aliases
- `@/` and `~/` both point to the project root
- Use `../assets/...` for importing CSS in style blocks from app/ directory
- Use `@/assets/...` for importing CSS from other locations
- Use `~/config/...` for TypeScript imports

## 🧪 Testing

The color system is tested with the existing test suite. Run tests to ensure changes don't break functionality:

```bash
npm run test:run
```

## 🚀 Deployment

The color system is production-ready and will work automatically when the application is built and deployed.
