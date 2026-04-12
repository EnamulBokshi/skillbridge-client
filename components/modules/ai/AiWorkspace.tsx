"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { Bot, Sparkles, SendHorizonal, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  chatWithAiAction,
  getAiModelsAction,
  getTutorRecommendationsAiAction,
  writeTutorBioAiAction,
} from "@/action/ai.action";
import { getCategoriesAction } from "@/action/category.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AiMarkdownMessage from "./AiMarkdownMessage";
import {
  AiChatHistoryItem,
  AiModelsResponseData,
  TutorBioWriterRequestPayload,
  TutorRecommendationItem,
  TutorRecommendationRequestPayload,
} from "@/types/ai.type";
import { Category } from "@/types/category.type";

type AiWorkspaceProps = {
  roleHint?: "student" | "tutor" | "admin";
};

const toLimitedHistory = (history: AiChatHistoryItem[]): AiChatHistoryItem[] => {
  return history.slice(-10).map((item) => ({
    role: item.role,
    content: item.content.trim().slice(0, 500),
  }));
};

export default function AiWorkspace({ roleHint = "student" }: AiWorkspaceProps) {
  const [isChatPending, startChatTransition] = useTransition();
  const [isRecoPending, startRecoTransition] = useTransition();
  const [isBioPending, startBioTransition] = useTransition();
  const showWritingTools = roleHint !== "student";

  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [chatHistory, setChatHistory] = useState<AiChatHistoryItem[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<TutorRecommendationItem[]>([]);
  const [recommendationMeta, setRecommendationMeta] = useState<{
    totalCandidates: number;
    rankedBy: string;
  } | null>(null);

  const [recommendationForm, setRecommendationForm] = useState({
    search: "",
    categoryId: "",
    minRating: "",
    maxRating: "",
    minExperience: "",
    maxExperience: "",
    budgetMin: "",
    budgetMax: "",
    preferredTopics: "",
    learningGoal: "",
    maxResults: "5",
  });

  const [bioWriterForm, setBioWriterForm] = useState({
    firstName: "",
    lastName: "",
    completedSessions: "",
    experienceYears: "",
    avgRating: "",
    totalReviews: "",
    expertiseAreas: "",
    categories: "",
  });

  const [generatedBio, setGeneratedBio] = useState<string>("");
  const [bioUsedData, setBioUsedData] = useState<TutorBioWriterRequestPayload | null>(null);

  const extractCategories = (payload: unknown): Category[] => {
    if (Array.isArray(payload)) return payload as Category[];

    if (
      payload &&
      typeof payload === "object" &&
      "data" in payload &&
      Array.isArray((payload as { data?: unknown }).data)
    ) {
      return (payload as { data: Category[] }).data;
    }

    return [];
  };

  useEffect(() => {
    const bootstrap = async () => {
      const [categoryResult, modelResult] = await Promise.all([
        getCategoriesAction(),
        getAiModelsAction(),
      ]);

      const fetchedCategories = extractCategories(categoryResult?.data);
      if (fetchedCategories.length) {
        setCategories(fetchedCategories);
      } else if (categoryResult?.error) {
        toast.error(categoryResult.error.message || "Failed to fetch categories.");
      }

      if (modelResult?.data?.models) {
        setModels(modelResult.data.models);
      }
    };

    bootstrap();
  }, []);

  const selectedModel = useMemo(() => {
    if (!models.length) return "models/gemini-2.5-flash";
    return models[0];
  }, [models]);

  const handleSendPrompt = () => {
    const cleanedPrompt = prompt.trim();
    if (!cleanedPrompt) {
      toast.error("Please enter a prompt first.");
      return;
    }

    if (cleanedPrompt.length > 1000) {
      toast.error("Prompt cannot exceed 1000 characters.");
      return;
    }

    const optimisticUserMessage: AiChatHistoryItem = {
      role: "user",
      content: cleanedPrompt,
    };

    const previousHistory = [...chatHistory];
    const optimisticHistory = [...previousHistory, optimisticUserMessage];
    setChatHistory(optimisticHistory);
    setPrompt("");

    startChatTransition(async () => {
      const result = await chatWithAiAction({
        prompt: cleanedPrompt,
        context: context.trim() || undefined,
        history: toLimitedHistory(previousHistory),
      });

      if (result.error || !result.data) {
        toast.error(result.error?.message || result.message || "Failed to get AI response.");
        setChatHistory(previousHistory);
        return;
      }

      const modelMessage: AiChatHistoryItem = {
        role: "model",
        content: result.data.response,
      };

      setChatHistory([...optimisticHistory, modelMessage]);
    });
  };

  const buildRecommendationPayload = (): TutorRecommendationRequestPayload => {
    const topics = recommendationForm.preferredTopics
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 15);

    const asNumber = (value: string) => {
      if (!value.trim()) return undefined;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    };

    return {
      search: recommendationForm.search.trim() || undefined,
      categoryId: recommendationForm.categoryId || undefined,
      minRating: asNumber(recommendationForm.minRating),
      maxRating: asNumber(recommendationForm.maxRating),
      minExperience: asNumber(recommendationForm.minExperience),
      maxExperience: asNumber(recommendationForm.maxExperience),
      budgetMin: asNumber(recommendationForm.budgetMin),
      budgetMax: asNumber(recommendationForm.budgetMax),
      preferredTopics: topics.length ? topics : undefined,
      learningGoal: recommendationForm.learningGoal.trim() || undefined,
      maxResults: asNumber(recommendationForm.maxResults),
    };
  };

  const handleGenerateRecommendations = () => {
    startRecoTransition(async () => {
      const result = await getTutorRecommendationsAiAction(buildRecommendationPayload());

      if (result.error || !result.data) {
        toast.error(
          result.error?.message || result.message || "Failed to generate recommendations.",
        );
        return;
      }

      setRecommendations(result.data.recommendations || []);
      setRecommendationMeta({
        totalCandidates: result.data.totalCandidates,
        rankedBy: result.data.rankedBy,
      });

      if (!result.data.recommendations?.length) {
        toast.info("No tutors matched your filters right now.");
      }
    });
  };

  const buildTutorBioPayload = (): TutorBioWriterRequestPayload => {
    const asPositiveNumber = (value: string) => {
      if (!value.trim()) return undefined;
      const parsed = Number(value);
      if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
      return parsed;
    };

    const asArray = (value: string, maxItems: number) => {
      const items = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, maxItems);

      return items.length ? items : undefined;
    };

    return {
      firstName: bioWriterForm.firstName.trim() || undefined,
      lastName: bioWriterForm.lastName.trim() || undefined,
      completedSessions: asPositiveNumber(bioWriterForm.completedSessions),
      experienceYears: asPositiveNumber(bioWriterForm.experienceYears),
      avgRating: asPositiveNumber(bioWriterForm.avgRating),
      totalReviews: asPositiveNumber(bioWriterForm.totalReviews),
      expertiseAreas: asArray(bioWriterForm.expertiseAreas, 12),
      categories: asArray(bioWriterForm.categories, 8),
    };
  };

  const handleGenerateTutorBio = () => {
    const payload = buildTutorBioPayload();
    if (!Object.keys(payload).length) {
      toast.error("Provide at least one meaningful tutor field to generate bio.");
      return;
    }

    startBioTransition(async () => {
      const result = await writeTutorBioAiAction(payload);

      if (result.error || !result.data) {
        toast.error(result.error?.message || result.message || "Failed to generate tutor bio.");
        return;
      }

      setGeneratedBio(result.data.bio || "");
      setBioUsedData(result.data.usedData || null);
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            SkillBridge AI Workspace
          </CardTitle>
          <CardDescription>
            {showWritingTools
              ? `Use AI for chat support, tutor recommendations, and tutor writing tools. Current model: ${selectedModel}`
              : `Use AI for chat support and tutor recommendations. Current model: ${selectedModel}`}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList>
          <TabsTrigger value="chat" className="gap-2">
            <Bot className="h-4 w-4" />
            Chat Assistant
          </TabsTrigger>
          <TabsTrigger value="recommend" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Tutor Recommendations
          </TabsTrigger>
          {showWritingTools && (
            <TabsTrigger value="writing" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Writing Tools
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SkillBridge Chatbot</CardTitle>
              <CardDescription>
                Ask about tutors, slots, bookings, subjects, categories, and platform usage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chat-context">Optional Context</Label>
                <Textarea
                  id="chat-context"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Add extra context for AI (optional)..."
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chat-prompt">Your Prompt</Label>
                <div className="flex items-start gap-2">
                  <Textarea
                    id="chat-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Find me top math tutors with free slots tomorrow"
                    className="min-h-24"
                  />
                  <Button onClick={handleSendPrompt} disabled={isChatPending} className="shrink-0">
                    {isChatPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Conversation</Label>
                <div className="max-h-105 overflow-y-auto rounded-lg border border-border bg-muted/30 p-4 space-y-3">
                  {!chatHistory.length && (
                    <p className="text-sm text-muted-foreground">
                      No messages yet. Start by asking something about SkillBridge.
                    </p>
                  )}
                  {chatHistory.map((item, idx) => (
                    <div
                      key={`${item.role}-${idx}`}
                      className={`rounded-lg p-3 text-sm leading-relaxed ${
                        item.role === "user"
                          ? "bg-primary text-primary-foreground ml-8"
                          : "bg-card text-card-foreground mr-8 border border-border"
                      }`}
                    >
                      <p className="mb-1 text-xs opacity-80 font-medium">
                        {item.role === "user" ? "You" : "SkillBridge AI"}
                      </p>
                      {item.role === "user" ? (
                        <p className="whitespace-pre-wrap">{item.content}</p>
                      ) : (
                        <AiMarkdownMessage content={item.content} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Tutor Recommendation Engine</CardTitle>
              <CardDescription>
                Provide your preferences and get ranked tutors with reasons.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    value={recommendationForm.search}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, search: e.target.value }))
                    }
                    placeholder="math, physics, geometry..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={recommendationForm.categoryId}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, categoryId: e.target.value }))
                    }
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="">All categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-rating">Min Rating</Label>
                  <Input
                    id="min-rating"
                    type="number"
                    min={0}
                    max={5}
                    step="0.1"
                    value={recommendationForm.minRating}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, minRating: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-rating">Max Rating</Label>
                  <Input
                    id="max-rating"
                    type="number"
                    min={0}
                    max={5}
                    step="0.1"
                    value={recommendationForm.maxRating}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, maxRating: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-exp">Min Experience (years)</Label>
                  <Input
                    id="min-exp"
                    type="number"
                    min={0}
                    value={recommendationForm.minExperience}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, minExperience: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-exp">Max Experience (years)</Label>
                  <Input
                    id="max-exp"
                    type="number"
                    min={0}
                    value={recommendationForm.maxExperience}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, maxExperience: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget-min">Budget Min</Label>
                  <Input
                    id="budget-min"
                    type="number"
                    min={0}
                    value={recommendationForm.budgetMin}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, budgetMin: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget-max">Budget Max</Label>
                  <Input
                    id="budget-max"
                    type="number"
                    min={0}
                    value={recommendationForm.budgetMax}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, budgetMax: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="topics">Preferred Topics (comma-separated)</Label>
                  <Input
                    id="topics"
                    value={recommendationForm.preferredTopics}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, preferredTopics: e.target.value }))
                    }
                    placeholder="algebra, trigonometry, spoken english"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="goal">Learning Goal</Label>
                  <Textarea
                    id="goal"
                    value={recommendationForm.learningGoal}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, learningGoal: e.target.value }))
                    }
                    placeholder="Describe your target outcome"
                    className="min-h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-results">Max Results (1-10)</Label>
                  <Input
                    id="max-results"
                    type="number"
                    min={1}
                    max={10}
                    value={recommendationForm.maxResults}
                    onChange={(e) =>
                      setRecommendationForm((prev) => ({ ...prev, maxResults: e.target.value }))
                    }
                  />
                </div>
              </div>

              <Button onClick={handleGenerateRecommendations} disabled={isRecoPending}>
                {isRecoPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Get AI Recommendations"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommendation Results</CardTitle>
              <CardDescription>
                {recommendationMeta
                  ? `Candidates: ${recommendationMeta.totalCandidates}, Ranked by: ${recommendationMeta.rankedBy}`
                  : "No recommendation run yet."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {!recommendations.length && (
                <p className="text-sm text-muted-foreground">Run the recommendation engine to see ranked tutors.</p>
              )}

              {recommendations.map((item) => (
                <div key={item.tutor.id} className="rounded-lg border border-border p-4 bg-card">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-semibold text-foreground">{item.tutor.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Score: {item.score.toFixed(1)}</Badge>
                      {item.tutor.isFeatured && <Badge>Featured</Badge>}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">{item.reason}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline">Rating: {item.tutor.avgRating.toFixed(1)}</Badge>
                    <Badge variant="outline">Experience: {item.tutor.experienceYears} yrs</Badge>
                    {item.tutor.category && <Badge variant="outline">{item.tutor.category}</Badge>}
                  </div>

                  {item.tutor.expertiseAreas?.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-3">
                      Expertise: {item.tutor.expertiseAreas.join(", ")}
                    </p>
                  )}

                  {item.tutor.bioSnippet && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.tutor.bioSnippet}</p>
                  )}

                  <div className="mt-3">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/tutors/${item.tutor.id}`}>View Tutor Profile</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {showWritingTools && (
          <TabsContent value="writing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tutor Bio Writer</CardTitle>
                <CardDescription>
                  Fill available tutor profile data and generate a concise professional bio.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio-first-name">First Name</Label>
                    <Input
                      id="bio-first-name"
                      value={bioWriterForm.firstName}
                      onChange={(e) =>
                        setBioWriterForm((prev) => ({ ...prev, firstName: e.target.value }))
                      }
                      placeholder="Md."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio-last-name">Last Name</Label>
                    <Input
                      id="bio-last-name"
                      value={bioWriterForm.lastName}
                      onChange={(e) =>
                        setBioWriterForm((prev) => ({ ...prev, lastName: e.target.value }))
                      }
                      placeholder="Haque"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio-completed-sessions">Completed Sessions</Label>
                    <Input
                      id="bio-completed-sessions"
                      type="number"
                      min={0}
                      value={bioWriterForm.completedSessions}
                      onChange={(e) =>
                        setBioWriterForm((prev) => ({ ...prev, completedSessions: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio-exp-years">Experience Years</Label>
                    <Input
                      id="bio-exp-years"
                      type="number"
                      min={0}
                      value={bioWriterForm.experienceYears}
                      onChange={(e) =>
                        setBioWriterForm((prev) => ({ ...prev, experienceYears: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio-avg-rating">Average Rating</Label>
                    <Input
                      id="bio-avg-rating"
                      type="number"
                      min={0}
                      max={5}
                      step="0.1"
                      value={bioWriterForm.avgRating}
                      onChange={(e) =>
                        setBioWriterForm((prev) => ({ ...prev, avgRating: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio-total-reviews">Total Reviews</Label>
                    <Input
                      id="bio-total-reviews"
                      type="number"
                      min={0}
                      value={bioWriterForm.totalReviews}
                      onChange={(e) =>
                        setBioWriterForm((prev) => ({ ...prev, totalReviews: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio-expertise">Expertise Areas (comma-separated)</Label>
                    <Input
                      id="bio-expertise"
                      value={bioWriterForm.expertiseAreas}
                      onChange={(e) =>
                        setBioWriterForm((prev) => ({ ...prev, expertiseAreas: e.target.value }))
                      }
                      placeholder="Mathematics, Algebra, Geometry"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio-categories">Categories (comma-separated)</Label>
                    <Input
                      id="bio-categories"
                      value={bioWriterForm.categories}
                      onChange={(e) =>
                        setBioWriterForm((prev) => ({ ...prev, categories: e.target.value }))
                      }
                      placeholder="Academic, Language, Exam Prep"
                    />
                  </div>
                </div>

                <Button onClick={handleGenerateTutorBio} disabled={isBioPending}>
                  {isBioPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Bio...
                    </>
                  ) : (
                    "Generate Tutor Bio"
                  )}
                </Button>

                {!!generatedBio && (
                  <div className="space-y-3 rounded-lg border border-border bg-card p-4">
                    <p className="text-sm font-medium">Generated Bio</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{generatedBio}</p>

                    {bioUsedData && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Used fields</p>
                        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">
                          {JSON.stringify(bioUsedData, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
