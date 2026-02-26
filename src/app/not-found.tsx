import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cyber-dark">
      <div className="text-center">
        <div className="text-8xl font-bold text-cyber-accent mb-4 glow-green">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-cyber-accent text-cyber-dark font-bold rounded-lg hover:bg-cyber-accent/90 transition-all hover:scale-105 glow-green"
          >
            Go Home
          </Link>
          <Link
            href="/gadgets/"
            className="px-6 py-3 border border-cyber-blue text-cyber-blue font-bold rounded-lg hover:bg-cyber-blue/10 transition-all"
          >
            Browse Gadgets
          </Link>
        </div>
      </div>
    </div>
  )
}
