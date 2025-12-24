# Wireframe Storybook Management System

A Next.js application for organizing and displaying wireframe prototypes from your Storybook component library.

## ✨ Features

- **Hierarchical URL Structure**: `/[client]/[project]/flows/[flow]`
- **Wireframe Components**: Uses actual stencil-style components from Storybook
- **Password Protection**: Optional password protection for clients/projects
- **Netlify Ready**: Configured for seamless deployment
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🚀 Quick Start

### Running the Applications

```bash
# Start Next.js Wireframe App (Port 3000)
npm run dev

# Start Storybook Component Library (Port 6006) - in separate terminal
cd ../wireframe-storybook
npm run storybook
```

### Access Points

- **Next.js App**: http://localhost:3000
- **Storybook Library**: http://localhost:6006

## 📁 Project Structure

```
wireframe-app/
├── app/
│   ├── [client]/                 # Client pages
│   │   ├── page.tsx             # Client overview
│   │   ├── [project]/           # Project pages  
│   │   │   ├── page.tsx         # Project overview
│   │   │   └── flows/[flow]/    # Flow wireframes
│   │   │       └── page.tsx     # Individual wireframes
│   ├── experiments/             # Links to Storybook experiments
│   └── page.tsx                 # Homepage
├── components/
│   ├── wireframe/              # Adapted wireframe components
│   │   ├── Header.tsx          # Stencil-style header
│   │   ├── Hero.tsx            # Stencil-style hero
│   │   ├── Button.tsx          # Stencil-style buttons
│   │   └── SearchBox.tsx       # Stencil-style search
│   └── wireframes/             # Complete wireframe pages
│       └── BookingStartWireframe.tsx
├── lib/
│   ├── data.ts                 # Mock data and API functions
│   └── auth.ts                 # Password protection logic
└── WIREFRAME_COMPONENT_RULES.md # Component usage guidelines
```

## 🗺️ URL Examples

- `/` - Homepage with all clients
- `/stadkjakten` - Städkjakten client overview  
- `/stadkjakten/booking-flow` - Booking Flow project
- `/stadkjakten/booking-flow/flows/booking-start` - Booking start wireframe
- `/experiments` - Links to Storybook experiments

## 🎨 Wireframe Styling

Components use sketch-style aesthetics:
- Rough, hand-drawn borders with `border-radius` variations
- Slight rotations using `transform: rotate()`
- Serif fonts for handwritten feel
- Muted colors and grayscale palette
- Emphasis on structure over visual polish

## 🔐 Password Protection

Demo credentials:
- **client-2**: `demo123`
- **project-3**: `admin456`

## 📋 Component Rules

### ✅ Always Use Wireframe Components
```jsx
import { Header } from '@/components/wireframe/Header';
import { Hero } from '@/components/wireframe/Hero'; 
import { Button } from '@/components/wireframe/Button';
```

### ❌ Never Create Custom Styled Components
```jsx
// Wrong - don't create inline components
<div className="bg-blue-500 rounded-lg">Custom Component</div>
```

## 🛠️ Adding New Wireframes

1. **Create wireframe component** in `components/wireframes/`
2. **Import in flow page** at `app/[client]/[project]/flows/[flow]/page.tsx`
3. **Add to switch statement** in `renderWireframe()` function
4. **Update mock data** in `lib/data.ts` if needed

## 🌐 Deployment

Configured for Netlify with proper page reload handling:
- `netlify.toml` redirects all routes to `/`
- Next.js handles routing client-side
- Static generation for optimal performance

## 📖 Reference

- **Component Library**: http://localhost:6006 (Storybook)
- **Component Rules**: See `WIREFRAME_COMPONENT_RULES.md`
- **Original Storybook**: `../wireframe-storybook/` (preserved)

## 🎯 Current Example

**Städkjakten Booking Flow** is implemented as the first example:
- Client: Städkjakten (Swedish cleaning service marketplace)
- Project: Booking Flow  
- Flow: Booking Start (landing page with search)
- URL: `/stadkjakten/booking-flow/flows/booking-start`

The wireframe includes:
- Stencil-style header with navigation
- Hero section with call-to-action buttons
- Search functionality with suggestions
- Service selection grid
- Step-by-step process explanation
- Final call-to-action section

All using proper wireframe aesthetic with rough borders, rotations, and sketch-style appearance.