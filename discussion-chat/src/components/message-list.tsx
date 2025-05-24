/* src/components/message-list.tsx */

import type { Message as MessageType } from "@/types/message"
import { Message } from "@/components/message"

interface MessageListProps {
  messages: MessageType[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}

