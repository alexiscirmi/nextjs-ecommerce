'use client'

import { createContext, useContext, useState } from 'react'
import { SidebarInterface } from '@/types'

const SidebarContext = createContext<SidebarInterface | undefined>(undefined)

export const SidebarContextProvider = ({ children }: { children: any }) => {
  const [sidebar, setSidebar] = useState(false)

  const toggleSidebar = () => {
    sidebar ? setSidebar(false) : setSidebar(true)
  }

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = (): SidebarInterface => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error(
      'useSidebarContext must be used within a SidebarContextProvider'
    )
  }
  return context
}
