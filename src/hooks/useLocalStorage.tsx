"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isBrowser = typeof window !== "undefined"

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser) return initialValue // Prevent running on the server

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (isBrowser) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!isBrowser) return

    try {
      const item = window.localStorage.getItem(key)
      const parsedItem = item ? (JSON.parse(item) as T) : initialValue
      if (parsedItem !== storedValue) {
        setStoredValue(parsedItem)
      }
    } catch (error) {
      console.error(error)
    }
  }, [key])

  return [storedValue, setValue] as const
}
