// /* src/app/pages.tsx */

import { Link, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import { BookOpen } from "lucide-react";

/* Import Each Pages */
import Chat from "@/app/chat";
import ReportPage from "@/app/report";
import BookPage from "@/app/book";
import AccountPage from "@/app/account";
import SettingPage from "@/app/setting";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold flex items-center font-extrabold">
            <BookOpen className="mr-2 text-blue-600" /> ITDA; 잇다
          </Link>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-m text-muted-foreground">Online</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 h-[calc(100vh-56px)] overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* 라우팅 영역 */}
          <Routes>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/setting" element={<SettingPage />} />
            {/* 기본 경로 */}
            <Route path="/" 
            element={
              <div className="flex-1 p-4 text-gray-600 flex items-center justify-center text-lg">
                환영합니다! 기능을 선택하세요.
              </div>
            } 
          />
          </Routes>
        </main>
      </div>
    </div>
  );
}
