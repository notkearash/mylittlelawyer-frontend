"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/contexts/auth-context";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function ChatPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const displayName = user?.email?.split("@")[0] || "there";

  return (
    <ProtectedRoute>
    <div className="h-svh bg-background flex overflow-hidden">
      {sidebarOpen && (
        <aside className="w-16 max-w-16 h-full shrink-0 border-r border-border/30 flex flex-col items-center py-4 gap-2 overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/60 hover:text-foreground hover:bg-secondary/30"
            onClick={() => setSidebarOpen(false)}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </Button>

          <Button
            size="icon"
            className="mt-2 bg-primary text-primary-foreground hover:bg-primary/80"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/60 hover:text-foreground hover:bg-secondary/30"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/60 hover:text-foreground hover:bg-secondary/30"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="7" cy="7" r="3" />
              <circle cx="17" cy="7" r="3" />
              <circle cx="7" cy="17" r="3" />
              <circle cx="17" cy="17" r="3" />
            </svg>
          </Button>

          <div className="mt-auto">
            <button
              onClick={logout}
              className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center text-sm font-medium text-foreground/70 hover:bg-secondary/50 transition-colors"
              title="Sign out"
            >
              {displayName.charAt(0).toUpperCase()}
            </button>
          </div>
        </aside>
      )}

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative">
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-foreground/60 hover:text-foreground hover:bg-secondary/30"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </Button>
        )}

        <div className="w-full max-w-2xl flex flex-col items-center">
          <h1 className="font-header text-4xl md:text-5xl text-foreground mb-10 text-center">
            {getGreeting()}, {displayName}
          </h1>

          <div className="w-full">
            <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Lahwita anything..."
                className="w-full px-5 py-4 bg-transparent text-foreground placeholder:text-foreground/40 resize-none focus:outline-none min-h-25"
                rows={3}
              />
              <div className="flex items-center justify-end px-4 pb-3">
                <Button
                  size="icon"
                  disabled={!message.trim()}
                  onClick={() => router.push("/chat/sample")}
                  className="bg-primary text-primary-foreground hover:bg-primary/80 disabled:opacity-30"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-foreground/40 text-center max-w-md leading-relaxed">
            Disclaimer: This platform provides AI-generated information for
            general purposes only and does not constitute legal advice or create
            an attorney–client relationship.
          </p>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
