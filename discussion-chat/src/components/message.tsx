// /* src/components/message.tsx */

// import { Avatar } from "./ui/avatar";
// import { cn } from "@/lib/utils"
// import type { Message as MessageType } from "@/types/message"
// import { formatDistanceToNow } from "date-fns"
// import { Bot, User } from "lucide-react"

// interface MessageProps {
//   message: MessageType
// }

// export function Message({ message }: MessageProps) {
//   const isBot = message.sender === "bot"

import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Message as MessageType } from "@/types/message"
import { formatDistanceToNow } from "date-fns"
import { Bot, User } from "lucide-react"

interface MessageProps {
  message: MessageType
}

export function Message({ message }: MessageProps) {
  const isBot = message.sender === "bot"
  
  return (
    <div className={cn("flex items-start gap-3", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </Avatar>
      )}
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isBot ? "bg-muted text-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p className="mt-1 text-xs opacity-70">{formatDistanceToNow(message.timestamp, { addSuffix: true })}</p>
      </div>
      {!isBot && (
        <Avatar className="h-8 w-8 bg-muted">
          <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  )
}
