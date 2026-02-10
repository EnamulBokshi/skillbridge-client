import Link from 'next/link'

export default function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Go Home
          </Link>
          {/* <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            Go Back
          </button> */}
        </div>
      </div>
    </div>
  )
}
