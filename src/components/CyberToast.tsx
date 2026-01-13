"use client"

import { useEffect } from "react"

type ToastType = "success" | "error" | "info"

export function CyberToast({
  message,
  type,
  onClose,
  duration = 10000,
}: {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}) {
  useEffect(() => {
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [onClose, duration])

  const styles = {
    success:
      "border-green-400/40 text-green-300 shadow-[0_0_25px_rgba(34,197,94,0.45)]",
    error:
      "border-red-500/40 text-red-300 shadow-[0_0_25px_rgba(239,68,68,0.45)]",
    info:
      "border-cyan-400/40 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.45)]",
  }

  return (
    <div className="fixed top-16 left-1/2 z-50 -translate-x-1/2 animate-[slideIn_0.35s_ease-out]">
      <div
        className={`rounded-xl border bg-black/80 px-4 py-3 text-sm backdrop-blur ${styles[type]}`}
      >
        {message}
      </div>
    </div>
  )
}
