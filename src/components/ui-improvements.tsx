"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, CheckCircle, X } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-200"
      : type === "error"
        ? "bg-red-50 border-red-200"
        : "bg-blue-50 border-blue-200"

  const textColor = type === "success" ? "text-green-800" : type === "error" ? "text-red-800" : "text-blue-800"

  const icon =
    type === "success" ? (
      <CheckCircle className="text-green-500" size={20} />
    ) : type === "error" ? (
      <AlertCircle className="text-red-500" size={20} />
    ) : (
      <AlertCircle className="text-blue-500" size={20} />
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-md border ${bgColor} max-w-md`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">{icon}</div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none">
          <X size={16} />
        </button>
      </div>
    </motion.div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: "success" | "error" | "info" }>>([])

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return {
    toasts,
    showToast,
    removeToast,
  }
}

export function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Array<{ id: string; message: string; type: "success" | "error" | "info" }>
  removeToast: (id: string) => void
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export function ImageLoadingPlaceholder() {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-200 h-10 w-10"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-2 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

