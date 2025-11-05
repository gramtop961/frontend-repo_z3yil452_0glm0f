export default function About() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              About
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              I craft thoughtful interfaces with a focus on clarity, motion, and accessibility. This site showcases a
              streamlined hero powered by a 3D scene and a subtle radar motif. No skill tags here—just a simple, clean
              presentation to keep the focus on the work.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 dark:border-white/10 p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
            <dl className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Name</dt>
                <dd className="font-medium text-gray-900 dark:text-white">Your Name</dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Role</dt>
                <dd className="font-medium text-gray-900 dark:text-white">Frontend Engineer</dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Location</dt>
                <dd className="font-medium text-gray-900 dark:text-white">Remote</dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Focus</dt>
                <dd className="font-medium text-gray-900 dark:text-white">Web UX, 3D, Motion</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
