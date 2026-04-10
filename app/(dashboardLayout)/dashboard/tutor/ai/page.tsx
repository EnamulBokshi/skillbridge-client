import AiWorkspace from "@/components/modules/ai/AiWorkspace";

export default function TutorAiPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">
          Use SkillBridge AI for platform help and tutor recommendation previews.
        </p>
      </div>
      <AiWorkspace roleHint="tutor" />
    </div>
  );
}
