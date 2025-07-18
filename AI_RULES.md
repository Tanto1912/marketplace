# AI Development Rules for I-Klin App (JavaScript Version)

## Tech Stack Overview

- **Frontend**: React 19 with JavaScript
- **Styling**: Tailwind CSS with custom variants
- **State Management**: React Context + Local Storage (for auth)
- **Routing**: React Router v7
- **Animation**: Framer Motion
- **Icons**: Lucide React + React Icons
- **HTTP Client**: Axios with interceptors
- **Form Handling**: Native React forms with custom validation
- **UI Components**: Primarily custom-built components
- **Bundler**: Vite with React plugin

## Library Usage Rules

### 1. State Management
- Use React Context for global state (auth, theme)
- Local Storage ONLY for auth persistence
- NO Redux/MobX - keep state simple and colocated
- PropTypes for basic prop validation (optional)

### 2. Styling
- Tailwind CSS for ALL styling
- Custom variants must be defined in `index.css`
- NO SASS/LESS/CSS-in-JS (except for dynamic styles)
- Prefer utility classes over custom CSS

### 3. HTTP Requests
- Axios ONLY for API calls
- All API calls must go through configured `api.js` instance
- NO fetch() directly - use the axios wrapper

### 4. Forms
- Native HTML forms with controlled components
- Custom validation functions
- NO Formik/React Hook Form unless absolutely necessary

### 5. Animations
- Framer Motion for complex animations
- CSS transitions for simple animations
- NO GSAP/Anime.js - keep animation dependencies minimal

### 6. UI Components
- Custom components first
- NO Material UI/Ant Design - maintain custom design system
- Use propTypes for documentation if needed

### 7. Icons
- Lucide React as primary icon library
- React Icons ONLY for missing icons
- NO SVG sprite sheets - import icons directly

### 8. Routing
- React Router for ALL routing
- NO next.js routing or other alternatives
- Keep routes in App.js

### 9. Error Handling
- Try/catch ONLY at API call boundaries
- Let errors propagate to error boundaries
- Display user-friendly messages via toast notifications

### 10. Testing
- React Testing Library for unit tests
- Mock Service Worker for API mocking
- NO Enzyme - use modern React testing practices

## JavaScript Best Practices

1. **Component Structure**:
   - One component per file (.js extension)
   - Max 150 lines per component
   - Split into presentational and container components

2. **Type Safety**:
   - Use JSDoc comments for documentation
   - Consider PropTypes for basic validation
   - Consistent parameter validation

3. **Performance**:
   - React.memo for expensive renders
   - useCallback/useMemo judiciously
   - Code split routes with React.lazy

4. **Accessibility**:
   - Semantic HTML
   - ARIA attributes where needed
   - Keyboard navigation support

5. **Responsive Design**:
   - Mobile-first approach
   - Tailwind breakpoints (sm, md, lg, xl)
   - NO fixed widths - use responsive units

## Anti-Patterns to Avoid

❌ Prop drilling beyond 2 levels  
❌ Large useEffect dependencies  
❌ Complex component hierarchies  
❌ Direct DOM manipulation  
❌ Global CSS styles  
❌ Any libraries not in package.json  
❌ console.log in production code  
❌ Mixing CSS methodologies  
❌ Over-optimizing prematurely  
❌ Inconsistent error handling patterns