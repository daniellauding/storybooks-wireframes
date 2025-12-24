# Wireframe App - AI Development Guidelines

## 🎯 Core Architecture

This Next.js app is built on **Storybook Wireframe Components** as the foundation. Every UI element MUST use components from our storybook at `../wireframe-storybook/src/components/`.

## 📋 Component Usage Rules

### 1. ALWAYS Import from Storybook
```typescript
// ✅ CORRECT - Import from our converted storybook components
import { Button } from '@/components/storybook/Button';
import { Card, CardHeader, CardContent } from '@/components/storybook/Card';
import { Header } from '@/components/storybook/Header';

// ❌ WRONG - Never use raw HTML or custom components
<button className="...">Click me</button>
<div className="card">Content</div>
```

### 2. Available Storybook Components
Core wireframe components that MUST be used:
- **Layout**: Header, Hero, Container, Grid, Stack
- **Navigation**: Navigation, Breadcrumbs, Menu, Pagination
- **Cards & Content**: Card, WireframeGrid, UserCard, TravelCard
- **Forms**: Input, Button, Checkbox, Select, RadioGroup, Toggle
- **Data Display**: Table, PlaceholderTable, PlaceholderChart
- **Feedback**: Modal, Toast, Spinner, Skeleton, Progress
- **Typography**: Label, Link, Badge, Chip
- **Media**: Avatar, Icon, Placeholder
- **Interactive**: Accordion, Tabs, Dropdown, Tooltip, Rating

### 3. Component Conversion Pattern
When converting styled-components to inline styles:
```typescript
// Original storybook component uses styled-components
const StyledButton = styled.button`...`;

// Our conversion uses inline styles with tokens
const buttonStyles = {
  fontFamily: tokens.typography.fontFamily.sketch,
  borderRadius: '255px 15px 225px 15px',
  transform: `rotate(${rotation}deg)`,
  ...
};
```

## 🎨 Design System

### Color Variables (from globals.css)
```css
--surface-color: #fafafa;
--border-color: #e5e7eb; 
--text-primary: #1a1a1a;
--text-secondary: #6b7280;
--accent: #007bff;
--error: #dc3545;
```

### Typography
- Primary font: `Kalam, cursive` (sketch-like)
- Wireframe aesthetic with random rotations
- Irregular borders using `border-radius: 255px 15px 225px 15px`

### Interactive States
- Hover: `translateY(-2px)` + rotation change
- Active: `translateY(0)` + shadow reduction
- Random rotation for sketch effect: `Math.random() * 2 - 1`

## 📁 File Structure

```
/wireframe-app/
├── app/                           # Next.js 13+ app directory
│   ├── page.tsx                   # Home page using storybook components
│   ├── [client]/                  # Dynamic client routes  
│   └── globals.css                # CSS variables for storybook components
├── components/
│   ├── storybook/                 # Converted storybook components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Header.tsx
│   │   └── ...
│   └── wireframes/                # Page-specific wireframe layouts
└── lib/
    ├── tokens.ts                  # Design tokens from storybook
    └── data.ts                    # Mock data
```

## 🔧 Development Rules

### Page Creation
1. **ALWAYS** start with storybook components
2. Import Header, Card, Button etc. from `@/components/storybook/`
3. Use `'use client'` directive when needed for interactivity
4. Apply wireframe styling with CSS variables and tokens

### Component Structure
```typescript
'use client';

import { Header } from '@/components/storybook/Header';
import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';

export default function ExamplePage() {
  const navigation = [
    { id: 'home', label: 'Home', href: '/' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Header 
        logo="🎨 App Name"
        navigation={navigation}
        variant="default"
      />
      
      <main style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <Card variant="elevated" padding="lg">
          <CardContent>
            <h1 style={{ fontFamily: 'Kalam, cursive' }}>Page Title</h1>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
```

### State Management
- Use React hooks (useState, useEffect) for client-side state
- Convert async server components to client components when needed
- Load data in useEffect for storybook component compatibility

## 🚀 Deployment Guidelines

### Before Deploying
1. Run `npm run build` to check for TypeScript errors
2. Verify all pages use storybook components
3. Test wireframe aesthetic (rotations, borders, fonts)
4. Check CSS variables are properly loaded

### Common Issues
- Missing `'use client'` directive for interactive components
- Importing wrong components (not from storybook)
- CSS variables not loading (check globals.css)
- TypeScript errors from missing props

## 📝 AI Generation Rules

When creating new pages or components:

1. **Start with this checklist:**
   - [ ] Import required storybook components
   - [ ] Add `'use client'` if interactive
   - [ ] Use CSS variables for colors
   - [ ] Apply wireframe styling (rotations, irregular borders)
   - [ ] Use Kalam font family
   - [ ] Test component in storybook if possible

2. **Never create custom UI components** - always adapt existing storybook components

3. **Follow existing patterns** from working pages like BookingStartWireframe.tsx

4. **Update this CLAUDE.md** when adding new patterns or rules

## 🔍 Example URLs
- Home: `http://localhost:3000/` (client list)
- Client: `http://localhost:3000/stadkjakten` (project list) 
- Project: `http://localhost:3000/stadkjakten/booking-flow` (flow list)
- Flow: `http://localhost:3000/stadkjakten/booking-flow/flows/booking-start` (wireframe)

## 🎭 Storybook Integration
- Storybook runs on: `http://localhost:6006`
- Components should match storybook stories
- Use storybook for component development and testing
- Reference storybook props and variants when implementing

---

**Remember**: This app is a showcase of wireframe components. Every element should feel hand-drawn and sketch-like, using the complete storybook component library as building blocks.