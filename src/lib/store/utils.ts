import { create, StoreApi, UseBoundStore } from 'zustand';

/**
 * Create selectors for a Zustand store
 * This utility allows you to use selectors with your Zustand store
 * for better performance and type safety.
 * 
 * @example
 * // Create a store with selectors
 * const _useStore = create((set) => ({ ... }));
 * export const useStore = createSelectors(_useStore);
 * 
 * // Then use it in components
 * const value = useStore(state => state.value);
 */
export function createSelectors<T extends object>(
  store: UseBoundStore<StoreApi<T>>
) {
  // Create a typed selector function
  type Selector<U> = (state: T) => U;

  // Return the enhanced store
  return Object.assign(
    // Original store selector function
    <U>(selector: Selector<U>) => selector(store()),
    // Store object with all its properties
    {
      ...store,
    }
  );
}

/**
 * A utility to create a store that synchronizes with AsyncStorage
 * This is a simplified version. For a complete solution, use zustand/middleware/persist
 * 
 * @example
 * const useAuthStore = create(
 *   persist(
 *     (set) => ({
 *       token: null,
 *       setToken: (token) => set({ token }),
 *     }),
 *     {
 *       name: 'auth-storage',
 *     }
 *   )
 * );
 */
export const persist = <T extends object>(
  config: (set: any, get: any, api: any) => T,
  options: { name: string }
) => {
  // In a real implementation, this would use AsyncStorage to persist the store state
  // This is just a placeholder that indicates how it would work
  return (set: any, get: any, api: any) => ({
    ...config(set, get, api),
    // Additional methods could be added here
  });
}; 