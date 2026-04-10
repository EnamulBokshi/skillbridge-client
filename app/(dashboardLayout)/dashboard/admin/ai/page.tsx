import AiWorkspace from "@/components/modules/ai/AiWorkspace";

export default function AdminAiPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">
          Use SkillBridge AI to answer platform queries and generate tutor recommendations.
        </p>
      </div>
      <AiWorkspace roleHint="admin" />
    </div>
  );
}
