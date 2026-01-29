export default function LoadingGLobal() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-t-blue-600 border-r-purple-600 border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        
        {/* Loading Text with Pulse Animation */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading
          </span>
          <div className="flex space-x-1">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
