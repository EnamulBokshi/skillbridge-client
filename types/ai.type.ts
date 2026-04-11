export type AiChatRole = "user" | "model";

export type AiChatHistoryItem = {
  role: AiChatRole;
  content: string;
};

export type AiChatRequestPayload = {
  prompt: string;
  context?: string;
  history?: AiChatHistoryItem[];
};

export type AiChatResponseData = {
  response: string;
};

export type TutorRecommendationRequestPayload = {
  search?: string;
  categoryId?: string;
  minRating?: number;
  maxRating?: number;
  minExperience?: number;
  maxExperience?: number;
  isFeatured?: boolean;
  budgetMin?: number;
  budgetMax?: number;
  preferredTopics?: string[];
  learningGoal?: string;
  maxResults?: number;
};

export type RecommendedTutor = {
  id: string;
  name: string;
  avgRating: number;
  experienceYears: number;
  isFeatured: boolean;
  expertiseAreas: string[];
  category: string | null;
  bioSnippet: string;
};

export type TutorRecommendationItem = {
  tutor: RecommendedTutor;
  score: number;
  reason: string;
};

export type TutorRecommendationResponseData = {
  recommendations: TutorRecommendationItem[];
  totalCandidates: number;
  rankedBy: "gemini" | "fallback" | "none";
};

export type AiModelsResponseData = {
  models: string[];
};

export type TutorBioWriterRequestPayload = {
  firstName?: string;
  lastName?: string;
  completedSessions?: number;
  experienceYears?: number;
  avgRating?: number;
  totalReviews?: number;
  expertiseAreas?: string[];
  categories?: string[];
};

export type TutorBioWriterResponseData = {
  bio: string;
  usedData: TutorBioWriterRequestPayload;
};

export type ReviewSuggestionRequestPayload = {
  rating: number;
  count?: number;
};

export type ReviewSuggestionResponseData = {
  rating: number;
  suggestions: string[];
};

export type SearchSuggestionContext = "all" | "tutors" | "subjects" | "slots" | "categories";

export type SearchSuggestionSource = "tutor" | "subject" | "category" | "slot" | "template";

export type SearchSuggestionItem = {
  text: string;
  source: SearchSuggestionSource;
  score: number;
};

export type SearchSuggestionResponseData = {
  query: string;
  context: SearchSuggestionContext;
  source: "hybrid" | "fallback";
  suggestions: string[];
};

export type SearchSuggestionRequestPayload = {
  query: string;
  context?: SearchSuggestionContext;
  limit?: number;
};
