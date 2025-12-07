'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function DemoPage() {
  const { t } = useLanguage();

  // AI Layer items for highlighting
  const aiLayerItems =
    t.methodology.stack.find((s) => s.category === 'AI Layer')?.items || [];

  // Other stack items (Frontend, Backend, Hosting)
  const otherStackItems = t.methodology.stack
    .filter((s) => s.category !== 'AI Layer')
    .flatMap((s) => s.items);

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
                src="https://www.youtube.com/embed/qVEsbFnm64Q"
                title={t.demo?.videoPlaceholder || 'Demo Video'}
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
                {t.demo?.aboutTitle || 'Description'}
              </h2>

              <div className="space-y-6">
                {/* What is Moliyachi */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.whatIsTitle || 'What is Moliyachi?'}
                  </h3>
                  <p className="text-gray-600">
                    {t.demo?.whatIsDesc ||
                      'An AI-powered personal finance assistant that lives inside Agrobank Mobile. It transforms your banking app into an intelligent financial companion.'}
                  </p>
                </div>

                {/* Problem Connection */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.problemConnectionTitle || 'The Problem We Solve'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t.demo?.problemConnectionDesc ||
                      'Many Agrobank customers live paycheck to paycheck, facing aggressive spending after salary arrival, mid-month financial stress, and no visibility into their spending behavior.'}
                  </p>
                </div>

                {/* Solution Connection */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.solutionConnectionTitle || 'Our Solution'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t.demo?.solutionConnectionDesc ||
                      'Moliyachi transforms Agrobank Mobile from a transaction tool into a financial partner using AI-powered insights and recommendations.'}
                  </p>
                </div>

                {/* AI Tech Stack - Highlighted */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.aiTechTitle || 'AI & Intelligence Layer'}
                  </h3>
                  <div className="space-y-2">
                    {(t.demo?.aiTechItems || aiLayerItems).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-emerald-500 mt-0.5">✦</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Tech Stack */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.otherTechTitle || 'Full Stack'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {otherStackItems.slice(0, 10).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Stage & Next Steps */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.currentStageTitle || 'Current Stage'}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                      {t.demo?.currentStage || 'MVP'}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {t.demo?.hackathonSubmission || 'AI500 Hackathon Submission'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {t.demo?.currentStageDesc ||
                      'Fully functional prototype with core AI features implemented'}
                  </p>
                </div>

                {/* Next Steps */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.nextStepsTitle || 'Next Steps'}
                  </h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {(
                      t.demo?.nextSteps || ['Final UI/UX polishing', 'Performance optimization']
                    ).map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-emerald-500">→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Live Access */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t.demo?.liveAccessTitle || 'Live Access'}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
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
