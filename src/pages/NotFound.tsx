// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 md:px-6 py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">Sorry, we couldn’t find that page.</p>
      <Link to="/" className="inline-block mt-6 rounded-xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black">
        Go Home
      </Link>
    </main>
  );
}
