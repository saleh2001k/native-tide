# Best Practices for React Native Component Structure

## Avoiding Inline Functions in JSX

Our ESLint configuration enforces the rule that we should not use inline arrow functions or bindings directly in JSX props. This is configured via the `react/jsx-no-bind` rule.

### Why Avoid Inline Functions?

1. **Performance**: Every render creates a new function instance, potentially causing unnecessary re-renders in child components
2. **Readability**: Components with many inline functions become harder to read and maintain
3. **Testability**: Named functions are easier to test than inline functions
4. **Debugging**: Stack traces are clearer with named functions

## Proper Structure Examples

### Using Factory Functions

```tsx
// ✅ GOOD: Using a factory function to create handlers
const createItemPressHandler = useCallback(
  (id: string) => {
    return function itemPressHandler() {
      handleItemPress(id);
    };
  },
  [handleItemPress],
);

// Usage in component:
{
  items.map((item) => {
    const onItemPress = createItemPressHandler(item.id);
    return (
      <TouchableOpacity onPress={onItemPress}>{item.title}</TouchableOpacity>
    );
  });
}
```

### Using Pre-defined Handlers

```tsx
// ✅ GOOD: Define handlers at the component level
const handleSubmit = useCallback(
  () => {
    // Handle submission logic
  },
  [
    /* dependencies */
  ],
);

// Usage in JSX
<Button onPress={handleSubmit} />;
```

## Anti-patterns to Avoid

```tsx
// ❌ BAD: Inline arrow function
<Button onPress={() => handleSubmit()} />

// ❌ BAD: Binding in JSX
<Button onPress={handleSubmit.bind(this)} />

// ❌ BAD: Function declaration in JSX
<Button onPress={function() { handleSubmit(); }} />
```

## Using with Events/Parameters

When you need to pass parameters to event handlers, use the factory pattern instead of inline functions:

```tsx
// ❌ BAD: Inline arrow function with parameter
<Button onPress={() => handleSubmit(item.id)} />;

// ✅ GOOD: Factory function approach
const createSubmitHandler = useCallback(
  (id: string) => {
    return function submitHandler() {
      handleSubmit(id);
    };
  },
  [handleSubmit],
);

// Usage
const onSubmitPress = createSubmitHandler(item.id);
<Button onPress={onSubmitPress} />;
```

## Running the Inline Function Checker

To check your codebase for inline functions in JSX:

```bash
yarn check-inline-funcs
```

This tool will scan your source files and provide suggestions for refactoring.
