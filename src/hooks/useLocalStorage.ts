import { useEffect, useRef, useState } from "react";

export const useLocalStorage = <T,>( key: string, defaultValue: T, overWrite = false ) => {
    // Initial state setup
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined")
      throw new Error("localStorage can be used only in client side");

    if (overWrite) return defaultValue;

    else {
      try {
        const currentValue = window.localStorage.getItem(key);
        if (currentValue) return JSON.parse(currentValue) as T;
      } catch (error) {
        console.error(`Error while reading localStorage item with key=${key}:`, error);
        return defaultValue;
      }
      return defaultValue;
    }
  });

  // Ref to keep track of previous key
  const previousKeyRef = useRef<string>("");

  useEffect(() => {
    const previousKey = previousKeyRef.current;

    // Remove previous key if it's different
    if (previousKey !== key && previousKey) {
      try {
        window.localStorage.removeItem(previousKey);
      } catch (error) {
        console.error(`Error while removing localStorage item with key=${previousKey}:`, error );
      }
    }

    // Update previous key ref
    previousKeyRef.current = key;

    // Save to localStorage
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error while setting localStorage item with key=${key}:`, error);
    }
  }, [value, key, defaultValue]);

  return [value, setValue] as const; //as const ensures that the return value from the hook will be [T, React.Dispatch<React.SetStateAction<T>>]
};

//https://dev.to/alaa-m1/handle-component-state-using-local-storage-uselocalstorage-with-typescript-29g4

// import { useState, useEffect } from 'react'

// export const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
//     const [storedValue, setStoredValue] = useState<T>(() => {
//         try {
//             const item = localStorage.getItem(key);
//             return item ? JSON.parse(item) : initialValue;

//         } catch (error){
//             console.warn(`Error reading localStorage key "${key}":`, error);
//             return initialValue;
//         }
//     });

//     useEffect(() => {
//         try {
//             localStorage.setItem(key, JSON.stringify(storedValue));
//           } catch (error) {
//             console.warn(`Error setting localStorage key "${key}":`, error);
//           }
//     }, [key, storedValue])

//     return [storedValue, setStoredValue]
   
// }
