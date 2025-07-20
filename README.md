# 🧮 Advanced Calculator

![Calculator UI screenshot](./public/calculator.png)

A modern, accessible calculator built with React, TypeScript, and Fluent UI. Features comprehensive error handling, full keyboard accessibility, and robust testing.

## 🏗️ Architecture & Design Decisions

### **Core Architecture**

- **React 18** with TypeScript for type safety and maintainability
- **Functional Components** with hooks for state management
- **Modular Design** with clear separation of concerns
- **Fluent UI** for consistent, accessible components
- **Vite** for fast development and optimized builds

### **Key Design Decisions**

#### **1. Error Handling & Resilience**

```typescript
// Comprehensive error categorization
export const CalculatorError = {
  DIVISION_BY_ZERO: "DIVISION_BY_ZERO",
  ZERO_DIVIDED_BY_ZERO: "ZERO_DIVIDED_BY_ZERO",
  OVERFLOW: "OVERFLOW",
  UNDERFLOW: "UNDERFLOW",
  INVALID_EXPRESSION: "INVALID_EXPRESSION",
  // ... more error types
};
```

- **Graceful Degradation**: Calculator continues working even with errors
- **Error Logging**: All errors logged with context for monitoring
- **User-Friendly Messages**: Clear, actionable error messages
- **Input Validation**: Length limits and number validation

#### **2. Accessibility-First Design**

- **WCAG 2.1 AA Compliance**: Full keyboard navigation and screen reader support
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Focus Management**: Clear focus indicators and logical tab order
- **Semantic HTML**: Proper use of HTML elements

#### **3. State Management**

- **Immutable Updates**: Prevents state corruption
- **Type-Safe State**: All state changes are type-checked
- **Clean Architecture**: Clear separation between UI and logic

### **Code Implementation Highlights**

#### **Modular Hook Architecture**

```typescript
// Custom hooks for specific functionality
export const useCalculator = () => {
  // Core calculator logic with error handling
};

export const useKeyboardNavigation = () => {
  // Full keyboard accessibility support
};

export const useLayoutSetting = () => {
  // Layout management with multiple configurations
};
```

#### **Type-Safe Error Handling**

```typescript
// Comprehensive error handling with type safety
export function validateNumber(value: number): ErrorResult {
  // Validates overflow, underflow, and edge cases
}
```

#### **Comprehensive Testing**

```typescript
// 107 tests covering all scenarios
describe("compute", () => {
  // Error handling tests
  // Overflow/Underflow tests
  // Accessibility tests
});
```

## 🚀 Local Development Setup

### **Prerequisites**

- Node.js 20+
- npm or yarn

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### **Development Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run all tests (107 tests)
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
```

## ✨ Features

### **Core Calculator Features**

- **Basic Operations**: Addition, subtraction, multiplication, division
- **Advanced Operations**: Percentages, negative numbers, parentheses
- **Scientific Notation**: Automatic formatting for large/small numbers
- **Decimal Support**: Full decimal precision handling
- **Error Recovery**: Graceful handling of invalid inputs

### **Production-Ready Features**

#### **1. Error Handling & Resilience**

- **Division by Zero**: Graceful handling with clear error messages
- **Overflow/Underflow**: Detection and prevention of number limits
- **Invalid Expressions**: Validation and recovery from malformed input
- **Input Validation**: Length limits (15 digits) and number validation
- **Error Logging**: All errors logged with context for debugging

#### **2. Accessibility (WCAG 2.1 AA Compliant)**

- **Full Keyboard Navigation**: All functions accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and logical tab order
- **Semantic HTML**: Proper use of HTML elements
- **Voice Control**: Compatible with voice control software

#### **3. User Experience**

- **Responsive Design**: Works on all screen sizes
- **Multiple Layouts**: Three different calculator layouts
- **Real-time Feedback**: Immediate visual feedback for all actions
- **Loading States**: Smooth loading experience with skeleton UI
- **Progressive Loading**: Non-critical components loaded on-demand

### **Technical Features**

#### **Type Safety**

- **Full TypeScript**: 100% type-safe codebase
- **Strict Mode**: Enabled for maximum type safety
- **Interface Definitions**: Clear contracts for all components

#### **Testing**

- **Comprehensive Test Suite**: 107 tests covering all scenarios
- **Error Scenario Testing**: Tests for all error conditions
- **Accessibility Testing**: Tests for keyboard navigation and ARIA
- **Unit Testing**: Vitest with React Testing Library

#### **Build Optimization**

- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Lazy loading for better performance
- **Component Lazy Loading**: Controls component loaded on-demand with smooth loading UI
- **Minification**: Optimized bundle sizes
- **Source Maps**: For debugging in production

## ♿ Accessibility Considerations

### **WCAG 2.1 AA Compliance**

- **Keyboard Navigation**: All functions accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Voice Control**: Compatible with voice control software

### **Implementation Details**

```typescript
// Keyboard navigation with proper ARIA support
export const useKeyboardNavigation = () => {
  // Handles all keyboard interactions
  // Supports modifier keys (Shift, Ctrl, Alt)
  // Provides proper focus management
};
```

### **Accessibility Features**

- **Semantic HTML**: Proper use of HTML elements
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Focus Indicators**: Clear visual focus indicators
- **Logical Tab Order**: Intuitive keyboard navigation
- **Error Announcements**: Screen reader announcements for errors

## 📊 Testing Strategy

### **Test Coverage**

- **Unit Tests**: 107 tests covering all calculator logic
- **Error Scenarios**: Comprehensive error condition testing
- **Accessibility Tests**: Keyboard navigation and ARIA testing
- **Component Tests**: React component testing with Testing Library

### **Test Categories**

```typescript
// Error handling tests
describe("Overflow/Underflow handling", () => {
  // Tests for all error conditions
});

// Accessibility tests
describe("Keyboard navigation", () => {
  // Tests for keyboard accessibility
});

// Component tests
describe("useCalculator", () => {
  // Tests for calculator logic
});
```

## 🚀 Performance Metrics

### **Current Performance**

- **Bundle Size**: Optimized with tree shaking and code splitting (~2-5 kB reduction from lazy loading)
- **Build Time**: Fast builds with Vite
- **Test Execution**: 107 tests run in ~1.1 seconds
- **Type Checking**: Full TypeScript compilation
- **Initial Load**: Faster initial page load with progressive component loading

### **Optimization Features**

- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Lazy loading for better performance
- **Component Lazy Loading**: Non-critical UI components loaded on-demand
- **Skeleton Loading**: Smooth loading animations for better UX
- **Minification**: Optimized bundle sizes
- **Source Maps**: For debugging in production

## 🔮 Future Enhancements

### **Planned Features**

- **Scientific Calculator**: Advanced mathematical functions
- **History**: Calculation history and favorites
- **Themes**: Multiple visual themes
- **Offline Support**: PWA capabilities
- **Voice Input**: Voice-controlled calculations

### **Technical Improvements**

- **Performance Monitoring**: Real-time performance metrics
- **Memory Management**: Memory usage tracking and optimization
- **State Validation**: Advanced state corruption prevention
- **Analytics**: Usage tracking and error monitoring

## 🤝 Contributing

### **Development Guidelines**

- **TypeScript**: All code must be type-safe
- **Testing**: New features require comprehensive tests
- **Accessibility**: All features must be keyboard accessible
- **Performance**: No performance regressions allowed

### **Code Quality**

- **ESLint**: Strict linting rules
- **Prettier**: Consistent code formatting
- **Testing**: 107 tests must pass
- **Type Checking**: Full TypeScript compilation

---

**Built with ❤️ for accessibility and reliability**
