import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-stars relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      {/* Floating particles background effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="z-10 mx-auto max-w-4xl space-y-8 text-center">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="heading-primary text-responsive-lg">
            U-Boot Bearers RPG
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-[var(--color-text-secondary)] md:text-2xl">
            Your tabletop RPG adventure starts here. Command elite operatives
            with mysterious U-Boot technology.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Link
            href="/s-class"
            className="card border-glow group block transform transition-all duration-300 hover:scale-105"
          >
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]">
                <svg
                  className="h-8 w-8 text-[var(--color-background)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="heading-secondary text-xl">S-Class</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Explore the elite S-Class operatives and their legendary U-Boot
                capabilities
              </p>
            </div>
          </Link>

          <Link
            href="/tutorial"
            className="card border-glow group block transform transition-all duration-300 hover:scale-105"
          >
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-dark)]">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="heading-secondary text-xl">Tutorial</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Learn the fundamentals of U-Boot Bearer operations and game
                mechanics
              </p>
            </div>
          </Link>

          <Link
            href="/character-sheet"
            className="card border-glow group block transform transition-all duration-300 hover:scale-105"
          >
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-info)] to-[var(--color-success)]">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="heading-secondary text-xl">Character Sheet</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Create and manage your U-Boot Bearer operative profile
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
