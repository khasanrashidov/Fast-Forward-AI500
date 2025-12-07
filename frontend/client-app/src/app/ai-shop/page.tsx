'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useTransition } from 'react';
import { ArrowUp, DollarSign, ExternalLink, ShoppingBag, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { searchShop, type ShopSearchResult } from '@/lib/services/shop';

export const dynamic = 'force-dynamic';

const formatter = (value: number, currency = 'UZS') =>
  `${value.toLocaleString('en-US')} ${currency}`;

type ChatMessage =
  | { role: 'user'; query: string }
  | { role: 'assistant'; result: ShopSearchResult };

const samplePrompts = [
  { label: 'Find a laptop', full: 'Find a laptop under 10M UZS with installments' },
  { label: 'Budget phone', full: 'Show me a budget phone with 0% down payment' },
  { label: 'Washing machine', full: 'Recommend a washing machine with best monthly payment' },
  { label: 'Galaxy S25 Ultra', full: 'I need to buy new Galaxy S25 Ultra' },
];

export default function AIShopPage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }
    setError(null);
    const userQuery = query;
    setMessages((prev) => [...prev, { role: 'user', query: userQuery }]);
    setQuery('');

    startTransition(async () => {
      try {
        const data = await searchShop({ query: userQuery });
        setMessages((prev) => [...prev, { role: 'assistant', result: data }]);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch recommendations. Please try again.');
      }
    });
  };

  const handlePromptClick = (prompt: string) => {
    setQuery(prompt);
    textareaRef.current?.focus();
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] md:h-[calc(100vh-2rem)]">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          /* Welcome screen - centered */
          <div className="flex flex-col items-center justify-center min-h-full px-4 py-12">
            <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
              {/* Logo / Icon */}
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-sm">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>

              {/* Title */}
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight">AI Shop Assistant</h1>
                <p className="text-muted-foreground text-base max-w-md">
                  Find the perfect product with AI-powered recommendations. Get installment options
                  via{' '}
                  <a
                    href="https://agrobank.uz/en/person/loans/open-karta"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-medium underline underline-offset-2 hover:opacity-80"
                  >
                    Opencard by Agrobank
                  </a>
                  , price comparisons, and personalized insights.
                </p>
                <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                  <span>
                    <span className="font-medium text-foreground">Opencard:</span> Interest-free
                    installments up to 82.4M UZS • No down payment • 12 months
                  </span>
                </div>
              </div>

              {/* Sample prompts grid */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg mt-4">
                {samplePrompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    type="button"
                    onClick={() => handlePromptClick(prompt.full)}
                    className="group flex flex-col items-start gap-1 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
                  >
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {prompt.label}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-2">
                      {prompt.full}
                    </span>
                  </button>
                ))}
              </div>

              {/* Capabilities */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Badge variant="secondary" className="text-xs font-normal">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-powered insights
                </Badge>
                <Badge variant="secondary" className="text-xs font-normal">
                  <Image
                    src="https://mini-io-api.texnomart.uz/order/order/loan-system/14/7fa17d02-916a-4b3f-bc93-a58f93dc9bbb.png"
                    alt="Opencard"
                    width={15}
                    height={15}
                    className="mr-1"
                  />
                  <span>Open Installment options</span>
                </Badge>
                <Badge variant="secondary" className="text-xs font-normal">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Price comparison
                </Badge>
                <Badge variant="secondary" className="text-xs font-normal">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 43h21.23L0 21.5V43ZM42.461 43V21.5L21.231 43h21.23ZM21.23 0l21.231 21.5V0h-21.23ZM0 0v21.5L21.23 0H0Z"
                      fill="currentColor"
                    />
                </svg>
                  Agrobank products
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          /* Messages list */
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {messages.map((msg, idx) => {
              if (msg.role === 'user') {
                return (
                  <div key={`${idx}-user`} className="flex justify-end">
                    <div className="max-w-xl rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground shadow-sm">
                      {msg.query}
                    </div>
                  </div>
                );
              }

              const res = msg.result;
              return (
                <div key={`${idx}-assistant`} className="flex justify-start">
                  <div className="w-full space-y-3 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 p-4">
                    <div className="text-base leading-relaxed text-foreground">
                      <span className="font-semibold text-[var(--primary)] flex items-center gap-1">
                        {' '}
                        <Sparkles className="h-3 w-3 mr-1" /> AI Insight:
                      </span>{' '}
                      {res.insight}
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {res.products.map((product) => (
                        <Card
                          key={product.id}
                          className="flex flex-col border border-primary/15 bg-white shadow-sm"
                        >
                          <CardHeader className="gap-2">
                            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain"
                                sizes="(max-width:768px) 100vw, 300px"
                              />
                            </div>
                            <CardTitle className="text-base font-semibold leading-snug">
                              {product.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <div className="whitespace-nowrap">
                              Price:{' '}
                              <span className="text-foreground font-semibold">
                                {formatter(product.sale_price)}
                              </span>
                            </div>
                            <TooltipProvider>
                              <div className="flex items-center gap-1 flex-wrap">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Image
                                      src="https://mini-io-api.texnomart.uz/order/order/loan-system/14/7fa17d02-916a-4b3f-bc93-a58f93dc9bbb.png"
                                      alt="Opencard"
                                      width={20}
                                      height={20}
                                      className="shrink-0 cursor-help"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Opencard Muddatli to&apos;lov</p>
                                  </TooltipContent>
                                </Tooltip>
                                <Badge
                                  variant="outline"
                                  className="text-[11px] border-primary/30 text-[var(--primary)] shrink-0"
                                >
                                  {product.opencard_month_text}
                                </Badge>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="text-foreground font-semibold cursor-help whitespace-nowrap">
                                      {formatter(product.opencard_monthly_payment)}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Total: {formatter(product.opencard_total_price)}</p>
                                  </TooltipContent>
                                </Tooltip>
                                <span className="text-xs shrink-0">/ mo</span>
                              </div>
                            </TooltipProvider>
                            <a
                              href={product.product_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[var(--primary)] text-sm underline underline-offset-4 hover:opacity-80 transition-opacity"
                            >
                              View product
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading indicator */}
            {isPending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" />
                  </div>
                  <span className="text-sm text-muted-foreground">Searching for products...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Sticky input area at bottom */}
      <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative flex items-end gap-2 rounded-2xl border border-border bg-card shadow-sm focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about any product..."
              className="flex-1 resize-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground min-h-[48px] max-h-[200px]"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <div className="p-2">
              <Button
                onClick={handleSearch}
                disabled={isPending || !query.trim()}
                size="icon"
                className="h-9 w-9 rounded-xl shrink-0 transition-all disabled:opacity-50"
              >
                <ArrowUp className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
          {error && <p className="text-sm text-rose-600 mt-2 text-center">{error}</p>}
          <p className="text-xs text-muted-foreground text-center mt-2">
            AI Shop can make mistakes. Verify product details before purchase.
          </p>
        </div>
      </div>
    </div>
  );
}
