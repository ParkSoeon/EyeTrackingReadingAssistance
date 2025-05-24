"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ChevronDown, MessageCircle, Users, Settings } from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
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

      <div className="flex flex-col gap-0 p-4">
        <h3 className={cn("font-semibold", "mb-1 text-m font-medium text-muted-foreground", isCollapsed && "sr-only")}>학습 활동</h3>
        {/* 메인 페이지 버튼 */}
        <Button variant="ghost" className="w-full justify-start flex items-center gap-2 p-2">
          <MessageCircle className="h-4 w-4 ml-2" />
          {!isCollapsed && <span>메인 페이지</span>}
        </Button>
        {/* 학습 활동 토글 */}
        <div>
          <button
            className={cn(
              "w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:underline",
              isCollapsed && "justify-center"
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {!isCollapsed && <span className="h-4 w-15 ml-0 pl-10">상세 활동</span>}
            {!isCollapsed && (
              <ChevronDown
                className={cn("h-4 w-4 ml-2 transition-transform", isExpanded ? "rotate-180" : "rotate-0")}
                style={{ marginLeft: "auto" }}
              />
            )}
          </button>

          {/* 서브 메뉴 항목들 */}
          {isExpanded && !isCollapsed && (
            <div className="mt-2 ml-4 space-y-1">
              {["책 읽기", "분석", "토론"].map((label) => (
                <Button key={label} variant="ghost" className="h-8 w-full ml-0 justify-start text-sm">
                  {label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 두 번째 버튼 리스트 */}
      <div className="flex flex-col gap-0 p-4">
        <h3 className={cn("font-semibold", "mb-1 text-m font-medium text-muted-foreground", isCollapsed && "sr-only")}>설정</h3>

        <Button variant="ghost" className="w-full justify-start flex items-center gap-2 p-2">
          <Settings className="h-4 w-4 ml-4" />
          {!isCollapsed && <span>계정</span>}
        </Button>
        <Button variant="ghost" className="w-full justify-start flex items-center gap-2 p-2">
          <Settings className="h-4 w-4 ml-4" />
          {!isCollapsed && <span>환경설정</span>}
        </Button>
      </div>
    </div>
  )
}
