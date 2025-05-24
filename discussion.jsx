import { useState } from "react";

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages([...newMessages, { role: "bot", text: "(응답 대기 중...)" }]);
    setInput("");

    // API 연동 자리 (현재는 대기 메시지로 대체)
    setTimeout(() => {
      setMessages([...newMessages, { role: "bot", text: "여기에 응답이 표시됩니다." }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="font-bold text-xl mb-4">Title</h2>
        <ul>
          {Array.from({ length: 7 }).map((_, i) => (
            <li key={i} className="mb-2 cursor-pointer hover:underline">Title</li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} my-1`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex items-center p-3 border-t">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2 mr-2"
            placeholder="Label"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="text-blue-600 hover:text-blue-800">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
