# Wireframe Storybook Component Rules

## 🎯 Core Principle
**Always use wireframe components from `@wireframe-storybook/src/`. Never create custom styled components directly.**

---

## 📋 Approved Wireframe Components

### Form & Input Components
- `Avatar` - User profile placeholders
- `Badge` - Status indicators and tags  
- `Button` - Action elements with rough borders
- `Chip` - Small interactive tags
- `Input` - Text input fields
- `Label` - Form labels

### Layout & Structure
- `Divider` - Section separators with sketch style
- `Dropdown` - Menu selections
- `Header` - Page headers with navigation
- `Hero` - Hero sections with rough styling
- `Placeholder` - Content placeholders
- `Placeholder Chart` - Data visualization placeholders
- `Placeholder Table` - Table structure placeholders

### Feedback & Status
- `Progress` - Progress indicators
- `Rating` - Star ratings and feedback
- `Skeleton` - Loading state placeholders
- `Slider` - Range inputs
- `Spinner` - Loading indicators  
- `Tooltip` - Contextual information

### Navigation & Interaction
- `Link` - Navigational links
- `Wireframe Navbar` - Top navigation bars
- `Wireframe Sidebar` - Side navigation panels

### Content Display
- `Icon` - Icon placeholders and symbols

---

## 🚫 Import Rules

### ✅ CORRECT - Import from wireframe storybook
```jsx
// Copy components to wireframe-app or import via relative path
import { Header } from '@/components/wireframe/Header';
import { Hero } from '@/components/wireframe/Hero';
import { Button } from '@/components/wireframe/Button';
```

### ❌ WRONG - Creating custom components
```jsx
// Never create inline styled components
const CustomHeader = () => <header className="bg-blue-500">...</header>;

// Never use Tailwind directly for main components
<div className="rounded-lg border bg-white p-6">...</div>
```

---

## 🏗️ URL Structure Rules

### Hierarchical URLs
```
/[client]/[project]/[section]/[page]
```

### Examples:
- `/stadkjakten` - Client overview
- `/stadkjakten/booking-flow` - Project overview  
- `/stadkjakten/booking-flow/flows/booking-start` - Specific flow
- `/stadkjakten/booking-flow/wireframes/search-page` - Specific wireframe

### URL Mapping:
```
Client ID: stadkjakten
Project ID: booking-flow
Flow ID: booking-start
```

---

## 🎨 Wireframe Style Guidelines

### Use Sketch-Style Components
- Rough borders with `border-radius: 12px 8px 12px 8px`
- Slight rotations with `transform: rotate()`
- Hand-drawn appearance
- Placeholder text and imagery

### Maintain Wireframe Aesthetic
- Low-fidelity appearance
- Grayscale or muted colors
- Emphasis on structure over style
- Clear information hierarchy

---

## 📁 Component Structure

### When Adapting Storybook Components:
1. **Copy** the component from `wireframe-storybook/src/components/`
2. **Simplify** for Next.js (remove styled-components if needed)
3. **Maintain** the wireframe aesthetic
4. **Preserve** the rough, sketchy styling

### Required Component Props:
```jsx
// Always support these base props
{
  className?: string;     // Allow customization
  variant?: string;       // Component variants
  size?: 'sm' | 'md' | 'lg';  // Sizing options
  children?: ReactNode;   // Content
}
```

---

## 🔧 Implementation Guidelines

### 1. Client Projects
Each client should have:
- Overview page: `/[client]`
- Project listing with wireframes
- Password protection if needed

### 2. Project Flows  
Each project should have:
- Flow overview: `/[client]/[project]`
- Individual flow pages: `/[client]/[project]/flows/[flowId]`
- Full-page wireframe rendering

### 3. Wireframe Display
- Full viewport wireframes
- Device frame options (mobile/desktop)
- Clean, minimal interface around wireframes

---

## 📋 Mandatory Checklist

Before creating any wireframe page:

- [ ] Uses wireframe components from storybook
- [ ] Follows hierarchical URL structure  
- [ ] Maintains sketch/wireframe aesthetic
- [ ] No custom Tailwind components for main elements
- [ ] Responsive design implemented
- [ ] Proper navigation breadcrumbs
- [ ] Device frame options available

---

## 🎯 Example Implementation

```jsx
// ✅ CORRECT Implementation
import { Header } from '@/components/wireframe/Header';
import { Hero } from '@/components/wireframe/Hero';
import { Button } from '@/components/wireframe/Button';

const BookingStartWireframe = () => {
  return (
    <div className="wireframe-container">
      <Header 
        logo="Städkjakten"
        navigation={navItems}
        showSearch={false}
      />
      <Hero
        title="Hitta den perfekta städtjänsten"
        subtitle="Sveriges största jämförelsetjänst"
        primaryAction={{
          label: 'Kom igång',
          onClick: handleStart
        }}
      />
      <div className="p-6">
        {/* Additional wireframe content */}
      </div>
    </div>
  );
};
```

---

## 🚨 Component Source Reference

**Source Location:** `/Users/daniellauding/Work/internal/storybooks-wireframes/wireframe-storybook/src/components/`

**Available Components:**
- Avatar, Badge, Button, Chip, Divider, Dropdown, Header, Hero, Icon, Input, Label, Link
- Placeholder, PlaceholderChart, PlaceholderTable, Progress, Rating, Skeleton, Slider, Spinner, Tooltip  
- WireframeNavbar, WireframeSidebar

**Reference Storybook:** `http://localhost:6006` for component documentation and props.