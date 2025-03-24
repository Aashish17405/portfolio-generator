"use client"

import { useState, useEffect } from "react";

export const useLocalStorage = <T,>(
  key: string, 
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
  const [isClient, setIsClient] = useState(false);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Ensure this only runs on client-side
  useEffect(() => {
    setIsClient(true);
    
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedItem = JSON.parse(item);
        setStoredValue(parsedItem);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    if (!isClient) return;

    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      
      setStoredValue(valueToStore);
      
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [
    isClient ? storedValue : initialValue, 
    setValue
  ];
};