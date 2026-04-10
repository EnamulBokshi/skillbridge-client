"use server";

import { aiService } from "@/services/ai.service";
import {
  AiChatRequestPayload,
  AiChatResponseData,
  AiModelsResponseData,
  ReviewSuggestionRequestPayload,
  ReviewSuggestionResponseData,
  TutorBioWriterRequestPayload,
  TutorBioWriterResponseData,
  TutorRecommendationRequestPayload,
  TutorRecommendationResponseData,
} from "@/types/ai.type";
import { TResponse } from "@/types";

export const chatWithAiAction = async (
  payload: AiChatRequestPayload,
): Promise<TResponse<AiChatResponseData>> => {
  return aiService.chat(payload);
};

export const getTutorRecommendationsAiAction = async (
  payload: TutorRecommendationRequestPayload,
): Promise<TResponse<TutorRecommendationResponseData>> => {
  return aiService.getTutorRecommendations(payload);
};

export const getAiModelsAction = async (): Promise<TResponse<AiModelsResponseData>> => {
  return aiService.getModels();
};

export const writeTutorBioAiAction = async (
  payload: TutorBioWriterRequestPayload,
): Promise<TResponse<TutorBioWriterResponseData>> => {
  return aiService.writeTutorBio(payload);
};

export const getReviewSuggestionsAiAction = async (
  payload: ReviewSuggestionRequestPayload,
): Promise<TResponse<ReviewSuggestionResponseData>> => {
  return aiService.getReviewSuggestions(payload);
};
