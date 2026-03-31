"use client"

import { useHomeContext } from "@/app/context/homeContext";

export default function SheetBackdrop() {
  const { sheetOpened } = useHomeContext()
  return sheetOpened
      ? <div className="fixed inset-0 bg-black/40" />
      : <></>
}
