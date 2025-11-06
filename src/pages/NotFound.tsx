import { Link } from "react-router-dom";
import { SeoHead } from "../utils/SeoHead";

export default function NotFound() {
  return (
    <main className="container-xl section-pad">
      <SeoHead title="404 — APRO" />
      <h1 className="text-2xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-primary mt-6">Back to Home</Link>
    </main>
  );
}
