export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200/70 dark:border-white/10 py-10 text-sm text-gray-500 dark:text-gray-400">
      <div className="container-xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} APRO. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="hover:underline" href="/robots.txt">Robots</a>
          <a className="hover:underline" href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
