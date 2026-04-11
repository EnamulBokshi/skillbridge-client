"use client";

import { searchSuggestionClient } from "@/services/search-suggestions.client";
import { SearchSuggestionContext } from "@/types/ai.type";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type SearchSuggestionInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  context?: SearchSuggestionContext;
  placeholder?: string;
  minLength?: number;
  limit?: number;
  showButton?: boolean;
  buttonLabel?: string;
  autoSubmitOnSelect?: boolean;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
};

const DEBOUNCE_MS = 250;

export default function SearchSuggestionInput({
  value,
  onChange,
  onSubmit,
  context = "all",
  placeholder = "Search by subject, tutor, or category...",
  minLength = 2,
  limit = 5,
  showButton = true,
  buttonLabel = "Search",
  autoSubmitOnSelect = true,
  className,
  inputClassName,
  buttonClassName,
}: SearchSuggestionInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasError, setHasError] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<number | null>(null);

  const trimmedValue = useMemo(() => value.trim(), [value]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    if (trimmedValue.length < minLength) {
      abortRef.current?.abort();
      setSuggestions([]);
      setIsLoading(false);
      setHasError(false);
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    timerRef.current = window.setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setHasError(false);

      const response = await searchSuggestionClient.getSuggestions(
        { query: trimmedValue, context, limit },
        controller.signal,
      );

      if (controller.signal.aborted) {
        return;
      }

      if (response.error) {
        setHasError(true);
        setSuggestions([]);
        setIsLoading(false);
        setIsOpen(false);
        return;
      }

      const nextSuggestions = response.data?.suggestions ?? [];
      setSuggestions(nextSuggestions);
      setIsLoading(false);
      setIsOpen(true);
      setActiveIndex(nextSuggestions.length > 0 ? 0 : -1);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [trimmedValue, context, limit, minLength]);

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
    setActiveIndex(-1);
    setSuggestions([]);
    if (autoSubmitOnSelect && onSubmit) {
      onSubmit(suggestion);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (event.key === "Enter" && onSubmit) {
        onSubmit(trimmedValue);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % suggestions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + suggestions.length) % suggestions.length);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = suggestions[activeIndex] || suggestions[0];
      if (selected) {
        selectSuggestion(selected);
      } else if (onSubmit) {
        onSubmit(trimmedValue);
      }
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative w-full", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
            placeholder={placeholder}
            className={cn("pl-9 pr-10", inputClassName)}
            autoComplete="off"
          />

          {isLoading && (
            <Loader2 className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
        </div>

        {showButton && onSubmit && (
          <Button type="button" onClick={() => onSubmit(trimmedValue)} className={buttonClassName}>
            {buttonLabel}
          </Button>
        )}
      </div>

      {isOpen && (suggestions.length > 0 || hasError) && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-border/80 bg-popover shadow-2xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Sparkles className="size-4 text-primary" />
              Suggestions
            </div>
            <span className="text-xs text-muted-foreground">
              {context === "all" ? "All sources" : context}
            </span>
          </div>

          {suggestions.length === 0 ? (
            <div className="px-4 py-4 text-sm text-muted-foreground">
              No suggestions found
            </div>
          ) : (
            <div className="max-h-72 overflow-auto p-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion}-${index}`}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectSuggestion(suggestion)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition-colors hover:bg-accent/10",
                    activeIndex === index && "bg-accent/10",
                  )}
                >
                  <span className="truncate font-medium text-foreground">{suggestion}</span>
                  <Badge variant="outline" className="ml-3 shrink-0 text-[10px] uppercase tracking-wide">
                    Suggestion
                  </Badge>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
