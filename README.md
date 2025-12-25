# Moliyachi

**Your AI-powered personal finance assistant inside Agrobank Mobile**

![Powered with Artificial Intelligence](https://img.shields.io/badge/Powered%20with-Artificial%20Intelligence-blue)

## Overview

Moliyachi transforms Agrobank Mobile from a transaction tool into an intelligent financial companion. We've built an AI-powered personal finance assistant that provides spending insights, smart monthly planning, financial health scoring, goal planning with AI timelines, and personalized Agrobank product recommendations.

**Current Stage:** MVP (Fully functional prototype with core AI features implemented)

🏆 **Achievement:** Top 50 finalists in Agrobank AI500 Hackathon (~3.7% out of 1345 teams)

## The Problem

A significant number of Agrobank's customers live on a strict salary cycle, facing stress and uncertainty every month:

- **Aggressive spending** after salary arrival
- **Mid-month financial stress** & uncertainty
- **No visibility** into spending behavior
- **Lack of personalized** budgeting guidance
- Current banking apps provide transactions, **not intelligence**
- Users need a way to **understand their financial behavior**—not just view their balance

## The Solution

Moliyachi is a smart financial assistant fully embedded into Agrobank Mobile that delivers:

### Core Features

1. **AI Spending Insights** - Short, actionable explanations of where your money goes
2. **Smart Monthly Planning** - Warnings when spending is too fast & balance predictions
3. **Financial Health Score** - One simple score (0–100) explaining your stability
4. **Goal Planning** - AI calculates timelines and suggests improvements
5. **Personalized Recommendations** - Based on spending patterns, habits, income, and goals
6. **Agrobank Product Matching** - AI suggests Microloans, Deposits, Savings, and Installment options
7. **AI Shop Agent** - Find the perfect product with AI-powered recommendations, installment options via Opencard, price comparisons, and personalized insights

## Why Our Team?

We are not just building features — we are building a financial intelligence layer for Agrobank:

- **We move extremely fast** - All members are Lead and Senior level engineers capable of shipping an MVP within days
- **We know the problem** - Most of us live on a salary cycle and personally experience the challenges we are solving
- **Strong technical background** - We cover ML/AI, Backend, Fintech logic, and Modern UI/UX

## Technology Stack

### Frontend

- Next.js
- Tailwind CSS
- Recharts
- Lucide React
- TypeScript
- Mobile First

### Backend

- Python (Flask, SQLAlchemy)
- PostgreSQL
- REST API
- Mathematical computations

### AI Layer

- **LangChain** — AI orchestration framework
- **OpenAI GPT-5.1/4.1/4o** — Large Language Models
- **RAG** — Retrieval-Augmented Generation
- **Machine Learning** — Behavioral modeling & predictions
- **Open-source LLMs** — On-premise deployment option
- **LangSmith** — AI observability & monitoring

### Hosting

- Vercel (Frontend)
- Supabase (Infrastructure)
- Render (Backend)
- LangSmith (AI)

## How We Plan to Solve It

We build a thin, intelligent AI layer on top of Agrobank's financial infrastructure through these key implementation steps:

### 1. User Financial Profile Ingestion & Normalization

- Collect structured data: salary, age, family size, occupation, financial goals, currency preferences
- Extract static data: income streams, spending history, recurring payments, loans, assets, liabilities
- Normalize & store in secure DB (PII-safe)

### 2. Transaction Categorization & Behavioral Modeling

- Hybrid engine: Rule-based keyword detection for high-precision categories
- AI classifier (GPT or finetuned model) for ambiguous transactions
- Track monthly volatility per category
- Build behavioral signatures: spending cycles, salary cycles, weekend spikes, seasonality
- Detect anomalies: sudden overspending, large one-offs, emerging recurring charges

### 3. Financial Analytics Dashboard

- Built with Next.js + Tailwind + charts (bar, pie, trend lines)
- Shows: Category breakdown, Month-over-month trends, Essential vs discretionary spend
- AI auto-highlights unusual trends (e.g., "Dining Out +32% vs last month")

### 4. AI Insight Engine (Core Intelligence Layer)

- Powered by GPT-5.1/4.1/4o + LangChain
- Model-agnostic architecture: supports any LLM provider
- Can use open-source LLMs or fine-tuned models running on-premises for complete data privacy
- Zero user data sent to external services when using on-premises deployment
- Generates: Spending insights, Trend explanations, Micro-advice (short, actionable 1–2 sentence tips)
- Predictive alerts (e.g., "Balance may fall below safe threshold in 9 days")
- Uses chain-of-thought hidden reasoning + deterministic guardrails for consistency

### 5. Salary-Cycle & Cashflow Predictor

- Predicts when user will run out of money using: Historical spending velocity, Upcoming bills, Category-level volatility
- Produces: "Days until zero", Confidence interval (AI-enhanced)
- Recommended interventions (cut X% in discretionary → +5 days buffer)

### 6. Advanced Goal Timeline Calculator

- Mathematical computations
- Real contributions = income – spending – installments – taxes – volatility buffer
- Monte Carlo simulation (2k–10k runs) for realistic scenarios
- Outputs: Deterministic months to target, Monte Carlo percentiles (10th, 50th, 90th), Success probability

### 7. Financial Health Score (Composite Index)

- Factors: Savings rate stability, Income consistency, Spending volatility, Debt ratio, Emergency buffer coverage
- AI-derived risk assessment
- Score recalculated monthly with clear breakdowns

### 8. Agrobank Product Recommendation Engine

- Uses AI reasoning + financial rules to match user to products
- Deposits for surplus cash, Loans when liquidity risk detected
- Installments for large upcoming payments, Investment products depending on risk score
- Personalized explanations for recommendations

### 9. Predictive Scenario & Simulation Engine

- User can test scenarios: "What if I increase savings by 10%?", "What if inflation rises to 7%?", "What if I take a 5,000 loan?"
- The engine recalculates the entire projection with new inputs using fast Monte Carlo

### 10. Adaptive Learning & Continuous Model Updating (Future)

- Monthly profile recalibration: Update spending µ/σ, Relearn category weights
- Adjust risk score, Update inflation & return assumptions
- AI automatically adjusts predictions as user behavior changes

## Development Roadmap

### Stage 1: Demo Website (Nov 26 – Nov 30)

- Landing website
- Problem & Solution presentation
- Architecture planning
- Initial AI insights
- UI template development
- Basic CI/CD, environment setup, base deployments

### Stage 2: Functional MVP Shell (Dec 1 – Dec 5)

- Next.js frontend base
- Visual dashboard layout
- Mock profile setup
- Frontend-Backend pipeline

### Stage 3: Core MVP Functionality (Dec 5 – Dec 10)

- AI recommendation engine
- Goal calculator
- Financial Health Score
- Salary-cycle warning

### Stage 4: Polish & Submission (Dec 10 – Dec 13)

- Supabase integration
- LangChain pipeline
- Final UI polishing
- Deployment (Vercel/Render)

## Next Steps

- Final UI/UX polishing
- Performance optimization
- Edge case handling improvements

## Team

Lead and Senior level engineers and managers capable of shipping an MVP within days:

- **Azizullo Temirov** - Product Manager | [LinkedIn](https://www.linkedin.com/in/azizullo) | [GitHub](https://github.com/azakapro)
- **Khasan Rashidov** - Senior Fullstack Engineer | [LinkedIn](https://www.linkedin.com/in/khasanr) | [GitHub](https://github.com/khasanrashidov)
- **Khusan Rashidov** - Senior Backend Engineer | [LinkedIn](https://www.linkedin.com/in/xkhusan) | [GitHub](https://github.com/xkhusan)
- **Burxonjon Solihjonov** - Senior Frontend Engineer | [LinkedIn](https://www.linkedin.com/in/burkhonjon-solihjonov) | [GitHub](https://github.com/black-belt-engineer)
- **Bakhtiyorjon Bokhodirov** - Lead AI Systems Engineer | [LinkedIn](https://www.linkedin.com/in/bakhtiyorjon-bokhodirov) | [GitHub](https://github.com/Fasttyper)

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL
- Supabase account

### Installation

#### Backend Setup

```bash
cd backend
pip install -r requirements.txt
# Configure database in configurations/database_config.py
python src/app.py
```

#### Frontend Setup

```bash
cd frontend/client-app
npm install
npm run dev
```

#### Landing Page Setup

```bash
cd frontend/landing
npm install
npm run dev
```

## Project Structure

```
/
├── backend/               # Python Flask API
│   ├── src/
│   │   ├── app.py        # Main application
│   │   ├── controllers/  # API endpoints
│   │   ├── services/     # Business logic
│   │   ├── models/       # Data models
│   │   └── prompts/      # AI prompts
│   └── requirements.txt
├── frontend/
│   ├── client-app/       # Main Next.js app
│   └── landing/          # Landing page
└── README.md
```

## Contributing

This is a hackathon submission for Agrobank AI500. We welcome contributions and feedback!

## License

© 2025 Moliyachi. Built for Agrobank AI500 Hackathon.

---

**Status:** AI500 Hackathon Submission | December 2025

For more information, visit the [landing page](frontend/landing) or check out our [GitHub organization](https://github.com)
