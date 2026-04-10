export default function LoadingGLobal() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-border rounded-full"></div>
          <div className="w-16 h-16 border-4 border-t-primary border-r-secondary border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        
        {/* Loading Text with Pulse Animation */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-foreground">
            Loading
          </span>
          <div className="flex space-x-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-primary to-secondary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
