"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/contexts/auth-context";

const sampleMessages = [
  {
    role: "user",
    content: "What are my rights if my landlord wants to evict me in California?",
  },
  {
    role: "assistant",
    content: `In California, tenants have significant protections under state law. Here are your key rights:

**Notice Requirements**
- For month-to-month tenancies under 1 year: 30-day written notice
- For tenancies over 1 year: 60-day written notice
- For lease violations: 3-day notice to cure or quit

**Just Cause Eviction (AB 1482)**
If your property is covered by the Tenant Protection Act, your landlord must have a valid reason to evict you, such as:
- Nonpayment of rent
- Breach of lease terms
- Criminal activity on premises
- Owner move-in

**What You Can Do**
1. Request the eviction notice in writing
2. Document all communications with your landlord
3. Check if your city has additional rent control protections
4. Consider consulting with a tenant rights organization

Would you like more details on any of these points?`,
  },
  {
    role: "user",
    content: "What if they didn't give me proper notice?",
  },
  {
    role: "assistant",
    content: `If your landlord failed to provide proper notice, you may have a valid defense against eviction.

**Improper Notice Defenses**
- The notice period was too short
- The notice wasn't properly served
- The notice didn't include required information

**Your Options**
1. **Respond to any court summons** — You typically have 5 days to respond to an unlawful detainer lawsuit
2. **Raise the defense in court** — Improper notice can result in case dismissal
3. **Negotiate with your landlord** — They may need to restart the process

**Important:** Even with a defense, it's crucial to continue paying rent if possible and document everything. Courts look favorably on tenants who act in good faith.

Do you have a copy of the notice you received?`,
  },
];

export default function ChatSamplePage() {
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

      <main className="flex-1 flex flex-col min-w-0 relative">
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-foreground/60 hover:text-foreground hover:bg-secondary/30 z-10"
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

        <div className="flex-1 relative min-h-0">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-8 pb-16">
              {sampleMessages.map((msg, i) => (
                <div key={i} className="mb-8">
                  {msg.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="bg-primary/10 text-foreground rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                        <svg
                          viewBox="0 0 64 64"
                          className="w-4 h-4 text-primary"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="32" y1="56" x2="32" y2="20" />
                          <line x1="12" y1="20" x2="52" y2="20" />
                          <circle cx="32" cy="16" r="4" />
                        </svg>
                      </div>
                      <div className="text-foreground/90 leading-relaxed prose prose-sm prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-strong:text-foreground prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-background to-transparent pointer-events-none" />
        </div>

        <div className="p-4 shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a follow-up question..."
                className="w-full px-5 py-4 bg-transparent text-foreground placeholder:text-foreground/40 resize-none focus:outline-none min-h-25"
                rows={2}
              />
              <div className="flex items-center justify-end px-4 pb-3">
                <Button
                  size="icon"
                  disabled={!message.trim()}
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
            <p className="mt-3 text-xs text-foreground/40 text-center">
              This is AI-generated information for general purposes only and
              does not constitute legal advice.
            </p>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
