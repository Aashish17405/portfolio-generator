"use client"

import { ToastContainer } from "@/components/ui-improvements"
import { useToast } from "@/components/ui-improvements"

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { toasts, removeToast } = useToast()
  
  return (
    <>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  )
}