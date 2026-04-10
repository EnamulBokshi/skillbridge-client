"use client";

import { useState, useTransition } from "react";
import { Bot, Loader2, SendHorizonal, X } from "lucide-react";
import { toast } from "sonner";

import { chatWithAiAction } from "@/action/ai.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AiMarkdownMessage from "./AiMarkdownMessage";
import { AiChatHistoryItem } from "@/types/ai.type";

const toLimitedHistory = (history: AiChatHistoryItem[]): AiChatHistoryItem[] => {
  return history.slice(-10).map((item) => ({
    role: item.role,
    content: item.content.trim().slice(0, 500),
  }));
};

export default function PublicChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<AiChatHistoryItem[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSend = () => {
    const cleanedPrompt = prompt.trim();

    if (!cleanedPrompt) return;
    if (cleanedPrompt.length > 1000) {
      toast.error("Prompt cannot exceed 1000 characters.");
      return;
    }

    const userMessage: AiChatHistoryItem = { role: "user", content: cleanedPrompt };
    const previousHistory = [...history];
    const optimisticHistory = [...previousHistory, userMessage];

    setHistory(optimisticHistory);
    setPrompt("");

    startTransition(async () => {
      const result = await chatWithAiAction({
        prompt: cleanedPrompt,
        history: toLimitedHistory(previousHistory),
      });

      if (result.error || !result.data) {
        toast.error(result.error?.message || result.message || "Failed to get AI response");
        setHistory(previousHistory);
        return;
      }

      setHistory([
        ...optimisticHistory,
        { role: "model", content: result.data.response },
      ]);
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <Card className="w-88 sm:w-104 border border-border shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                SkillBridge Chatbot
              </CardTitle>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="h-72 overflow-y-auto rounded-md border border-border bg-muted/30 p-3 space-y-2">
              {!history.length && (
                <p className="text-sm text-muted-foreground">
                  Ask about tutors, sessions, slots, subjects, and booking help.
                </p>
              )}

              {history.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={`rounded-md p-2.5 text-sm leading-relaxed ${
                    item.role === "user"
                      ? "bg-primary text-primary-foreground ml-6"
                      : "bg-card text-card-foreground border border-border mr-6"
                  }`}
                >
                  <p className="text-[11px] opacity-80 mb-1 font-medium">
                    {item.role === "user" ? "You" : "AI"}
                  </p>
                  {item.role === "user" ? (
                    <p className="whitespace-pre-wrap">{item.content}</p>
                  ) : (
                    <AiMarkdownMessage content={item.content} />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask SkillBridge AI..."
              />
              <Button type="button" onClick={handleSend} disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SendHorizonal className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          type="button"
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Open SkillBridge chatbot"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
