import { useEffect, useRef } from 'react';

type StateObject = Record<string, any>;

interface PersistOptions {
  storageKey: string;
  saveInterval?: number;
}

export function usePersistentState<T extends StateObject>(
  state: T,
  setters: Record<string, (value: any) => void>,
  options: PersistOptions
) {
  const { 
    storageKey, 
    saveInterval = 1000
  } = options;
  
  const initialLoadDone = useRef(false);

  const saveState = () => {
    localStorage.setItem(storageKey, JSON.stringify(state));
    console.log(`State saved to localStorage with key: ${storageKey}`);
  };

  // Function to load state from localStorage
  const loadState = () => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      
      // Update all state values using the provided setters
      Object.keys(parsedState).forEach(key => {
        if (setters[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]) {
          const setter = setters[`set${key.charAt(0).toUpperCase() + key.slice(1)}`];
          const defaultValue = state[key];
          setter(parsedState[key] ?? defaultValue);
        }
      });
    }
  };

  useEffect(() => {
    if (!initialLoadDone.current) {
      loadState();
      initialLoadDone.current = true;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(saveState, saveInterval);
    return () => clearInterval(interval);
  }, [state, saveInterval]);

  return {
    saveState,
    loadState
  };
} 