/* src/component/sidebar.tsx */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import  Separator  from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, MessageCircle, Users, Settings, BookOpen, BarChart3, FileText, User, SlidersHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import * as React from "react"
import { cn } from "@/lib/utils"


const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden bg-gray-100 border-r border-gray-200 ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4">
        {isExpanded && !isCollapsed && <span className="text-xl font-bold">Dashboard</span>}
        <Button
          variant="ghost"
          onClick={() => {
            setIsExpanded(!isExpanded)
            setIsCollapsed(!isCollapsed)
          }}
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      {/* 프로필 */}
      {isExpanded && !isCollapsed && (
        <div className="bg-white rounded-md shadow p-3 mx-4 my-2 flex items-center gap-3">
          <img
            src="https://github.com/shadcn.png"
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
          </div>
        </div>
      )}

      <Separator />

      {/* 학습 활동 */}
      {isExpanded && !isCollapsed && (
        <div className="px-4 pt-4 pb-2">
          <p className="text-sm font-semibold text-gray-700 mb-2">학습 활동</p>
          <Button variant="ghost" className="h-8 w-full justify-start text-sm">
            <BookOpen className="h-4 w-4 mr-2" />
            책 읽기
          </Button>
          <Button variant="ghost" className="h-8 w-full justify-start text-sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            분석
          </Button>
          <Button variant="ghost" className="h-8 w-full justify-start text-sm">
            <FileText className="h-4 w-4 mr-2" />
            토론
          </Button>
        </div>
      )}

      {/* 설정 */}
      {isExpanded && !isCollapsed && (
        <div className="px-4 pt-4 pb-2">
          <p className="text-sm font-semibold text-gray-700 mb-2">설정</p>
          <Button variant="ghost" className="h-8 w-full justify-start text-sm">
            <User className="h-4 w-4 mr-2" />
            계정
          </Button>
          <Button variant="ghost" className="h-8 w-full justify-start text-sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            환경 설정
          </Button>
        </div>
      )}
    </div>
  )
}
export default Sidebar
