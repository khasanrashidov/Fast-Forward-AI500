'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { knowledgeBase } from '@/data/knowledge-base';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const placeholders = {
  en: {
    title: 'Moliyachi AI',
    subtitle: 'Ask me anything about the project',
    placeholder: 'Type your message...',
    thinking: 'Thinking...',
    tooltip: 'Have questions? Ask our AI',
  },
  uz: {
    title: 'Moliyachi AI',
    subtitle: 'Loyiha haqida savol bering',
    placeholder: 'Xabaringizni yozing...',
    thinking: "O'ylamoqda...",
    tooltip: "Savollaringiz bormi? Bizning AI'dan so'rang",
  },
  ru: {
    title: 'Moliyachi AI',
    subtitle: 'Задайте вопрос о проекте',
    placeholder: 'Введите сообщение...',
    thinking: 'Думаю...',
    tooltip: 'Есть вопросы? Задайте их нашему ИИ.',
  },
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    // Show tooltip after 1 second
    const timer = setTimeout(() => setShowTooltip(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

  const t = placeholders[language] || placeholders.en;
  const sampleQuestions = knowledgeBase.sampleQuestions.slice(0, 3).map((q) => q[language] || q.en);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Click outside handler - excludes both button and chat window
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isClickOnButton = buttonRef.current?.contains(target);
      const isClickOnChat = chatRef.current?.contains(target);

      if (!isClickOnButton && !isClickOnChat) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          language: language,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.error || 'Sorry, something went wrong.' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I could not connect to the server.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input.trim());
  };

  return (
    <>
      {/* Floating Button */}
      <div ref={buttonRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                boxShadow: [
                  '0 4px 6px -1px rgba(16, 185, 129, 0.1), 0 2px 4px -1px rgba(16, 185, 129, 0.06)',
                  '0 0 15px 2px rgba(16, 185, 129, 0.4)',
                  '0 4px 6px -1px rgba(16, 185, 129, 0.1), 0 2px 4px -1px rgba(16, 185, 129, 0.06)',
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
                default: { duration: 0.2 },
              }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-white text-emerald-900 border border-emerald-100 text-sm font-semibold px-4 py-2 rounded-xl relative pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {t.tooltip}
              </div>
              <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white border-b border-r border-emerald-100 transform rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-150px)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col"
          >
            {/* Header */}
            <div className="bg-emerald-600 text-white px-4 py-3 flex items-center gap-3 flex-shrink-0 rounded-t-2xl">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold">{t.title}</h3>
                <p className="text-xs text-emerald-100">{t.subtitle}</p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
            >
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-center text-gray-400 text-sm py-2">{t.subtitle}</p>
                  <div className="space-y-2">
                    {sampleQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(question)}
                        className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-lg text-sm transition-colors border border-gray-100 hover:border-emerald-200"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm prose-gray max-w-none [&>p]:my-1 [&>ul]:my-1 [&>ol]:my-1 [&>li]:my-0.5 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&_a]:text-emerald-600 [&_a]:underline [&_a]:font-medium hover:[&_a]:text-emerald-700">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-2xl rounded-bl-md text-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    {t.thinking}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-gray-100 flex-shrink-0 rounded-b-2xl"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
