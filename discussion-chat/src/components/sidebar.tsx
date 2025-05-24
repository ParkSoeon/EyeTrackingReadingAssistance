"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, MessageCircle, Users, Settings } from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b p-4">
        {!isCollapsed && <h2 className="text-lg font-semibold">메뉴</h2>}
        <button onClick={toggleSidebar} className="ml-auto bg-transparent border-none p-2">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* 첫 번째 버튼 리스트 */}
        <div className="space-y-1">
          <h3 className={cn("mb-2 text-sm font-medium text-muted-foreground", isCollapsed && "sr-only")}>메시지</h3>
          <div className="space-y-1">
            <Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center")}>
              <MessageCircle className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>모든 채팅</span>}
            </Button>
            <Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center")}>
              <MessageCircle className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>중요 메시지</span>}
            </Button>
          </div>
        </div>

        {/* 두 번째 버튼 리스트 */}
        <div className="space-y-1">
          <h3 className={cn("mb-2 text-sm font-medium text-muted-foreground", isCollapsed && "sr-only")}>연락처</h3>
          <div className="space-y-1">
            <Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center")}>
              <Users className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>친구</span>}
            </Button>
            <Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center")}>
              <Users className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>그룹</span>}
            </Button>
          </div>
        </div>

        {/* 세 번째 버튼 리스트 */}
        <div className="space-y-1">
          <h3 className={cn("mb-2 text-sm font-medium text-muted-foreground", isCollapsed && "sr-only")}>설정</h3>
          <div className="space-y-1">
            <Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center")}>
              <Settings className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>계정</span>}
            </Button>
            <Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center")}>
              <Settings className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>환경설정</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
