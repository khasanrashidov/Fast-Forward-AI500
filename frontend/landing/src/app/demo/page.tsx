'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function DemoPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Demo Recording */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-6">
              {t.demo?.title || 'Demo Recording'}
            </h2>
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
              <iframe
                src="https://www.youtube.com/embed/3t75MOyQF_E"
                title={t.demo?.videoTitle || 'Demo Video'}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          {/* About + Try App - Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Project Description - Left */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-fit">
              <h2 className="text-2xl font-bold font-display text-gray-900 mb-6">
                {t.demo?.aboutTitle || 'About Moliyachi'}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.whatIsTitle || 'What is Moliyachi?'}
                  </h3>
                  <p className="text-gray-600">
                    {t.demo?.whatIsDesc ||
                      'An AI-powered personal finance assistant that lives inside Agrobank Mobile. It transforms your banking app into an intelligent financial companion.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.featuresTitle || 'Key Features'}
                  </h3>
                  <ul className="text-gray-600 space-y-1">
                    {(t.demo?.features || []).map((feature: string, index: number) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.techStackTitle || 'Tech Stack'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {t.methodology.stack
                      .flatMap((s) => s.items)
                      .slice(0, 12) // Limit to 12 items to prevent overcrowding
                      .map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.currentStageTitle || 'Current Stage'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                      {t.demo?.currentStage || 'MVP'}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {t.demo?.hackathonSubmission || 'AI500 Hackathon Submission'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.liveAccessTitle || 'Live Access'}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {t.demo?.liveAccessDesc ||
                      'Try out the working application. No authorization required for testing.'}
                  </p>
                  <a
                    href="https://moliyachi-web.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors text-sm"
                  >
                    {t.demo?.openLiveApp || 'Open Live App'}
                  </a>
                </div>
              </div>
            </section>

            {/* Mobile App Preview - Right */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-gray-900">
                    {t.demo?.tryAppTitle || 'Try the App'}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {t.demo?.tryAppSubtitle || 'Interactive preview'}
                  </p>
                </div>
                <a
                  href="https://moliyachi-web.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  {t.demo?.openFullscreen || 'Open fullscreen →'}
                </a>
              </div>

              {/* App iframe - clean container */}
              <div
                className="flex-1 rounded-2xl overflow-hidden border border-gray-200 bg-white"
                style={{ minHeight: '600px' }}
                data-lenis-prevent
              >
                <iframe
                  src="https://moliyachi-web.vercel.app/"
                  className="w-full h-full border-0"
                  title="Moliyachi Mobile App"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
