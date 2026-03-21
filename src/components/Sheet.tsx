"use client"

import { useRef, useState } from "react";

interface SheetProps {
  onClose: () => void
  children: React.ReactNode
}

export default function Sheet({ onClose, children }: SheetProps) {
  const dragStartY = useRef<number>(0)
  const [dragOffset, setDragOffset] = useState(0)

  function onDragStart(e: React.PointerEvent) {
    dragStartY.current = e.clientY
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onDragMove(e: React.PointerEvent) {
    if (!e.buttons) return
    const offset = Math.max(0, e.clientY - dragStartY.current)
    setDragOffset(offset)
  }

  function onDragEnd() {
    if (dragOffset > 80) {
      onClose()
    } else {
      setDragOffset(0)
    }
  }

  return (
    <dialog open
      className="fixed inset-x-0 bottom-0 w-full bg-surface rounded-t-2xl border-t border-edge overflow-hidden md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:w-[360px] md:border md:border-edge"
      style={{ transform: `translateY(${dragOffset}px)`, transition: dragOffset === 0 ? 'transform 0.2s' : 'none' }}
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
    >
      {/* Drag handle — mobile only */}
      <div className="w-9 h-1 bg-edge rounded-full mx-auto mt-3 mb-1 md:hidden" />

      {children}
    </dialog>
  )
}
