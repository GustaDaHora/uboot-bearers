import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white">
      <h1 className="mb-4 text-5xl font-bold">Welcome to U-Boot Bearers RPG</h1>
      <p className="mb-8 text-xl">Your tabletop RPG adventure starts here.</p>
      <div className="flex gap-4">
        <Link
          href="/s-class"
          className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          S-Class
        </Link>
        <Link
          href="/tutorial"
          className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          Tutorial
        </Link>
        <Link
          href="/character-sheet"
          className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          Character Sheet
        </Link>
      </div>
    </main>
  );
}
