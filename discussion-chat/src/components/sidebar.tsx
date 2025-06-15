/* src/component/sidebar.tsx */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Separator from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, MessageCircle, Users, Settings, BookOpen, BarChart3, FileText, User, SlidersHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import * as React from "react"
import { cn } from "@/lib/utils"

import { Link, useLocation } from "react-router-dom" 

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden bg-gray-100 border-r border-gray-200 ${isCollapsed ? "w-20" : "w-80"} transition-all duration-300`}
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
      <Link to="/account" className="no-underline">
        <div className="bg-white rounded-md shadow p-3 mx-4 my-2 flex items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5904/5904059.png"
          alt="User avatar"
          className={`w-12 h-12 rounded-full object-cover ${
          currentPath === "/account" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-300"
          }`}
        />
        <div className="leading-tight">
          <p className="text-m font-bold">김가천</p>
          <p className="text-sm text-gray-500">여 / 8세</p>
        </div>
        </div>
      </Link>
      )}

      <Separator />

      {/* Reading Assistance Contents */}
      {isExpanded && !isCollapsed && (
      <div className="px-4 pt-4 pb-2">
        <p className="text-lg font-bold text-gray-700 mb-2">학습 활동</p>
        <div>
        <Link to="/book" className="no-underline">
          <Button
          variant="ghost"
          className={`font-semibold h-8 w-full justify-start text-lg flex items-center pt-5 pb-5 pl-3 ${
            currentPath === "/book" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-300"
          }`}
          >
          <BookOpen className="h-5 w-10 mr-2" />
          <span>책 읽기</span>
          </Button>
        </Link>

        <Link to="/report" className="no-underline">
          <Button
          variant="ghost"
          className={`font-semibold h-8 w-full justify-start text-lg flex items-center pt-5 pb-5 pl-3 ${
            currentPath === "/report" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-300"
          }`}
          >
          <BarChart3 className="h-5 w-10 mr-2" />
          <span>분석</span>
          </Button>
        </Link>

        <Link to="/chat" className="no-underline">
          <Button
          variant="ghost"
          className={`font-semibold h-8 w-full justify-start text-lg flex items-center pt-5 pb-5 pl-3 ${
            currentPath === "/chat" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-300"
          }`}
          >
          <FileText className="h-5 w-10 mr-2" />
          <span>토론</span>
          </Button>
        </Link>
        </div>
      </div>
      )}

      <Separator />

      {/* Setting */}
      {isExpanded && !isCollapsed && (
      <div className="px-4 pt-4 pb-2">
        <p className="text-lg font-bold text-gray-700 mb-2">설정</p>
        <div>
        <Link to="/account" className="no-underline">
          <Button
          variant="ghost"
          className={`font-semibold h-8 w-full justify-start text-lg flex items-center pt-5 pb-5 pl-3 ${
            currentPath === "/account" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-300"
          }`}
          >
          <User className="h-5 w-10 mr-2" />
          <span>계정</span>
          </Button>
        </Link>

        <Link to="/setting" className="no-underline">
          <Button
          variant="ghost"
          className={`font-semibold h-8 w-full justify-start text-lg flex items-center pt-5 pb-5 pl-3 ${
            currentPath === "/setting" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-300"
          }`}
          >
          <SlidersHorizontal className="h-5 w-10 mr-2" />
          <span>환경 설정</span>
          </Button>
        </Link>
        </div>
      </div>
      )}
    </div>
  )
}

export default Sidebar
