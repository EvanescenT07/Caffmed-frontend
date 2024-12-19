"use client";

import { MessageCircle, Send, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: MessageProps = {
  role: "assistant",
  content:
    "Hi! I'm CaffBot, an AI assistant specialized in brain tumor detection. How can I help you today?",
};

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageIndex, setTypingMessageIndex] = useState<number>(0);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat window
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messageEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: MessageProps = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      const aiMessage: MessageProps = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setTypingMessageIndex(messages.length + 1);
    } catch (error) {
      toast.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your message.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Typewriter effect component
  const TypeWriter = ({
    text,
    onComplete,
  }: {
    text: string;
    onComplete: () => void;
  }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      let index = 0;
      setDisplayText("");

      const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText((prev) => {
            const newText = prev + text[index];
            requestAnimationFrame(scrollToBottom);
            return newText;
          });
          index++;
        } else {
          clearInterval(interval);
          onComplete();
        }
      }, 30);

      return () => clearInterval(interval);
    }, [text, onComplete]);

    return (
      <ReactMarkdown
        components={{
          strong: (props) => (
            <span className="font-bold" {...props} />
          ),
          p: (props) => <span {...props} />,
        }}
      >
        {displayText}
      </ReactMarkdown>
    );
  };

  // Message bubble component
  const MessageBubble = ({
    message,
    index,
  }: {
    message: MessageProps;
    index: number;
  }) => {
    const isBot = message.role === "assistant";
    const isTyping = isBot && index === typingMessageIndex;

    const MarkdownContent = ({ content }: { content: string }) => (
      <ReactMarkdown
        components={{
          strong: ({ ...props }) => (
            <span className="font-bold" {...props} />
          ),
          p: ({ ...props }) => <span {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    );

    return (
      <div
        className={`flex ${
          isBot ? "justify-start text-pretty" : "justify-end text-pretty"
        } mb-4`}
      >
        <div
          className={`max-w-[80%] px-4 py-2 rounded-lg ${
            isBot
              ? "bg-light-secondary dark:bg-dark-secondary rounded-bl-none"
              : "bg-blue-500 text-white rounded-br-none"
          }`}
        >
          {isTyping ? (
            <TypeWriter
              text={message.content}
              onComplete={() => {
                setTypingMessageIndex(-1);
                scrollToBottom();
              }}
            />
          ) : (
            <MarkdownContent content={message.content} />
          )}
          <span className="text-xs opacity-50 mt-1 block">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    );
  };

  // Returning the FloatingChatbot component
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-80 h-[500px] bg-light-primary dark:bg-dark-primary border border-white/10 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-light-secondary dark:bg-dark-secondary flex justify-between items-center rounded-t-lg">
            <h2 className="text-lg font-semibold">CaffBot</h2>
            <button
              title="Close chat"
              onClick={() => setIsOpen(false)}
              className="text-light-text hover:text-light-tertiary dark:text-dark-text dark:hover:text-dark-tertiary"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <MessageBubble key={index} message={msg} index={index} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-light-secondary dark:bg-dark-secondary px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-current animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-current animate-bounce delay-75" />
                    <span className="w-2 h-2 rounded-full bg-current animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                disabled={isLoading || typingMessageIndex !== -1}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg bg-light-secondary dark:bg-dark-secondary focus:outline-none"
              />
              <button
                title="Send message"
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          title="Open chat"
          onClick={() => setIsOpen(true)}
          className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default FloatingChatbot;
