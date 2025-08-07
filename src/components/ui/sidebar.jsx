'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import {
  BarChart,
  File,
  Home,
  LineChart,
  Package,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'

const SidebarContext = createContext()

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = useCallback(() => {
    setCollapsed(prev => !prev)
  }, [])

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

function Sidebar({ links }) {
  const { collapsed, toggleSidebar } = useSidebar()

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 flex h-full flex-col border-r bg-muted/40">
        <div className="border-b p-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle Sidebar"
            onClick={toggleSidebar}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          {links.map(link => (
            <SidebarLink
              key={link.title}
              title={link.title}
              label={link.label}
              icon={link.icon}
              href={link.href}
              collapsed={collapsed}
            />
          ))}
        </nav>
        <div className="mt-auto p-4">
          <Button className="w-full justify-start" variant="ghost">
            <Settings className="mr-2 h-4 w-4" />
            {!collapsed && 'Settings'}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}

function SidebarLink({ title, label, icon: Icon, href, collapsed }) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start"
          as="a"
          href={href}
        >
          <Icon className="mr-2 h-4 w-4" />
          {!collapsed && (
            <>
              {title}
              {label && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full p-0 text-[10px]">
                  {label}
                </Badge>
              )}
            </>
          )}
        </Button>
      </TooltipTrigger>
      {collapsed && <TooltipContent side="right">{title}</TooltipContent>}
    </Tooltip>
  )
}

export default Sidebar
