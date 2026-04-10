import AiWorkspace from "@/components/modules/ai/AiWorkspace";

export default function StudentAiPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">
          Ask SkillBridge AI questions and get tutor recommendations tailored to your goals.
        </p>
      </div>
      <AiWorkspace roleHint="student" />
    </div>
  );
}
