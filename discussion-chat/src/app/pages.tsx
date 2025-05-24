// /* src/app/pages.tsx */

import { Chat } from "@/components/chat"
import { Sidebar } from "@/components/sidebar"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Chat App</h1>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col">
          <Chat />
        </main>
      </div>
    </div>
  )
}
