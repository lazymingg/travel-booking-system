# Travel Booking System Refactoring Plan

## 🎯 Phase 1: Component Architecture (2-3 days)

### 1.1 Unify AccommodationCard Components
- Create single `src/components/common/AccommodationCard.vue` with flexible props
- Remove duplicate components
- Add proper TypeScript interfaces for props

### 1.2 Create Component Library Structure
```
src/components/
├── common/          # Reusable components
│   ├── BaseCard.vue
│   ├── BaseModal.vue
│   ├── BaseButton.vue
│   └── AccommodationCard.vue
├── forms/           # Form components
│   ├── SearchForm.vue
│   ├── LoginForm.vue
│   └── FilterForm.vue
├── layout/          # Layout components
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   └── PageContainer.vue
└── feature/         # Feature-specific components
    ├── booking/
    ├── accommodations/
    └── reservations/
```

## 🏪 Phase 2: State Management (2-3 days)

### 2.1 Create Pinia Stores
```
src/stores/
├── auth.js          # User authentication
├── accommodations.js # Accommodation data
├── bookings.js      # Booking state
├── reservations.js  # Reservation management
└── ui.js           # UI state (modals, loading)
```

### 2.2 Replace Hardcoded Data
- Move all static data from components to stores
- Create proper API integration in stores
- Add proper error handling and loading states

## 🌐 Phase 3: API Layer (1-2 days)

### 3.1 Create Robust API Client
```javascript
// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use(...)

// Response interceptor  
api.interceptors.response.use(...)

export default api
```

### 3.2 Service Layer
```
src/services/
├── api.js           # Base API client
├── accommodations.js # Accommodation API calls
├── auth.js          # Authentication API
├── bookings.js      # Booking API
└── users.js         # User management API
```

## 🎨 Phase 4: Design System (1-2 days)

### 4.1 CSS Variables & Design Tokens
```css
/* src/assets/design-tokens.css */
:root {
  --color-primary: #1D4ED8;
  --color-secondary: #FACC15;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --border-radius: 8px;
  --shadow-card: 0 4px 12px rgba(0,0,0,0.1);
}
```

### 4.2 Utility Classes
- Create utility classes for common patterns
- Standardize component spacing and sizing
- Remove duplicate CSS

## 📱 Phase 5: View Optimization (2-3 days)

### 5.1 Composables for Shared Logic
```javascript
// src/composables/useAccommodations.js
export function useAccommodations() {
  const accommodations = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const fetchAccommodations = async (filters) => {
    // Shared fetch logic
  }
  
  return { accommodations, loading, error, fetchAccommodations }
}
```

### 5.2 View Simplification
- Extract complex logic to composables
- Standardize view structure
- Remove duplicate code

## 🔧 Phase 6: Developer Experience (1 day)

### 6.1 Add TypeScript (Optional)
- Install TypeScript for Vue
- Add type definitions for props and stores
- Better IDE support and error catching

### 6.2 Add Testing Setup
```bash
npm install @vue/test-utils vitest jsdom
```

## 📈 Expected Benefits

### Performance
- 30-40% bundle size reduction from removed duplicates
- Better tree-shaking with modular architecture
- Faster development with shared components

### Maintainability  
- Single source of truth for business logic
- Consistent patterns across the app
- Easier to add new features

### Developer Experience
- Auto-completion with proper typing
- Faster development with reusable components
- Better debugging with centralized state

## 🚀 Implementation Strategy

### Week 1: Foundation
- Phase 1: Component unification
- Phase 2: Store setup
- Phase 3: API layer

### Week 2: Polish
- Phase 4: Design system
- Phase 5: View optimization  
- Phase 6: DX improvements

### Quick Wins (Can start immediately):
1. Extract common CSS to design tokens
2. Create BaseModal component to replace all modal duplicates
3. Unify AccommodationCard components
4. Move hardcoded data to Pinia stores
5. Create useAccommodations composable
