import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getKnowledgeBasePrompt } from '@/data/knowledge-base';
import { Language } from '@/data/translations';

// Detect language from message text
function detectLanguage(text: string): Language {
  // Simple heuristic: check for Cyrillic or Uzbek-specific patterns
  const cyrillicPattern = /[\u0400-\u04FF]/;
  const uzbekPattern = /[a-z]*'[a-z]|o'|g'|sh|ch|ng/i;

  if (cyrillicPattern.test(text)) {
    return 'ru';
  }
  if (uzbekPattern.test(text)) {
    return 'uz';
  }
  return 'en';
}

function getSystemPrompt(lang: Language) {
  return `You are Moliyachi AI Assistant, a helpful chatbot for the Moliyachi personal finance application.

IMPORTANT RULES:
1. ONLY answer questions based on the knowledge base provided below
2. If you don't know the answer or it's not in the knowledge base, say "I don't have information about that. Please check our documentation or contact the team."
3. Respond in the SAME LANGUAGE the user asks in (English, Uzbek, or Russian)
4. Be concise, friendly, and helpful
5. Never make up information, pricing, dates, or details not provided
6. For technical questions not covered, direct users to the API documentation
7. Use markdown formatting for better readability (bold, lists, etc.)

KNOWLEDGE BASE:
${getKnowledgeBasePrompt(lang)}

Remember: Only answer from the knowledge base above. Do not hallucinate or make up information.`;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [], language } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Use provided language or detect from message
    const lang: Language = language || detectLanguage(message);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: getSystemPrompt(lang) },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply =
      completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({
      answer: reply,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
