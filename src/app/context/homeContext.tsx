// CounterContext.tsx
"use client"

import React, { createContext, useContext, useState } from "react"

export interface HomeContextProps {
    sheetOpened: "scan" | "manual" | null
    setSheetOpened: (value: "scan" | "manual" | null) => void
}

export const HomeContext = createContext<HomeContextProps>({
    sheetOpened: null,
    setSheetOpened: () => {}
})

export function HomeContextProvider({ children }: { children: React.ReactNode }) {
  const [sheetOpened, setSheetOpened] = useState<"scan" | "manual" | null>(null)
  return (
    <HomeContext value={{ sheetOpened, setSheetOpened }}>
      {children}
    </HomeContext>
  )
}

export function useHomeContext() {
  return useContext(HomeContext)
}