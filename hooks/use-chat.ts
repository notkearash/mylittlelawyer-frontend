"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

type Status = "connecting" | "connected" | "disconnected" | "error";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8001/ws/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<Status>("disconnected");
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const chatIdRef = useRef<string | null>(null);
  const reconnectRef = useRef(false);

  const connect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setStatus("connecting");
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "chat.created" && data.chat_id) {
          chatIdRef.current = data.chat_id;
          return;
        }

        if (data.ok && data.message?.response?.message) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.message.response.message },
          ]);
          setIsWaitingForResponse(false);
        }
      } catch {
        // ignore unparseable messages
      }
    };

    ws.onclose = () => {
      setStatus("disconnected");
      wsRef.current = null;
      chatIdRef.current = null;
    };

    ws.onerror = () => {
      setStatus("error");
    };
  }, []);

  const sendMessage = useCallback((content: string) => {
    const trimmed = content.trim();
    if (!trimmed || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsWaitingForResponse(true);

    wsRef.current.send(
      JSON.stringify({
        chat_id: chatIdRef.current,
        content: trimmed,
        form: null,
      })
    );
  }, []);

  const resetChat = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    chatIdRef.current = null;
    setMessages([]);
    setIsWaitingForResponse(false);
    reconnectRef.current = true;
  }, []);

  useEffect(() => {
    if (status === "disconnected" && (reconnectRef.current || messages.length === 0)) {
      reconnectRef.current = false;
      connect();
    }
  }, [status, connect, messages.length]);

  // Disconnect on unmount
  useEffect(() => {
    return () => {
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, []);

  return { messages, status, isWaitingForResponse, sendMessage, resetChat };
}
