export default function Footer() {
  return (
    <footer className="py-8 border-t border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Suhas Uppala</span>
        <span className="opacity-80">Made with React, Tailwind & Spline</span>
      </div>
    </footer>
  );
}
