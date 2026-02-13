export default function EmptyState({ title, caption }: { title: string; caption?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center border border-dashed rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}