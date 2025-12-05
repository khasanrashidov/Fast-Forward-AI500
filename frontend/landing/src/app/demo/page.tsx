'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function DemoPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* 1. Demo Recording */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-6">Demo Recording</h2>
            <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200">
              <p className="text-gray-500">Video Placeholder (1-5 mins)</p>
            </div>
          </section>

          {/* 2. Description */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-6">
              Project Description
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">What is being shown</h3>
                <p className="text-gray-600">Placeholder for description of the demo content.</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Problem & Solution</h3>
                <p className="text-gray-600">
                  Placeholder for how this relates to the problem and solution.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Tech Stack & AI</h3>
                <p className="text-gray-600">
                  Placeholder for stack, technologies, and AI solutions used.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Roadmap Stage</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    MVP
                  </span>
                </div>
                <p className="text-gray-600">Next steps placeholder.</p>
              </div>
            </div>
          </section>

          {/* 3. Live Access */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-6">Live Access</h2>
            <p className="text-gray-600 mb-4">
              Try out the working application. No authorization required for testing.
            </p>
            <a
              href="https://moliyachi-web.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              Open Live App
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
