# 🏆 World Cup Pick'em 2026

A full-featured FIFA World Cup 2026 prediction app. Track the schedule, make predictions, compete on a leaderboard — no account needed.

## Features

- 📅 Full match schedule with Chicago (CT) times
- 🎯 One-click predictions stored in your browser (no login required)
- 🏆 Leaderboard with sorting by points, accuracy, or correct picks
- 📊 Statistics & expert consensus for every match
- 👤 Personal dashboard with your pick history
- 🌙 Dark/Light mode support
- 📱 Fully mobile-responsive

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Click **Deploy** — zero config needed

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- localStorage for anonymous user persistence

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout (fonts, metadata)
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Hero.tsx
│   ├── MatchCard.tsx
│   ├── NicknameModal.tsx
│   ├── ScheduleView.tsx
│   ├── PredictionsView.tsx
│   ├── LeaderboardView.tsx
│   ├── MyPicksView.tsx
│   └── StatisticsView.tsx
├── data/                 # Match, team & expert data
│   ├── teams.ts
│   ├── matches.ts
│   └── expertConsensus.ts
├── hooks/                # Custom hooks
│   ├── useAppState.ts
│   └── useCountdown.ts
└── types/                # TypeScript types
    └── index.ts
```

## Scoring

| Result | Points |
|--------|--------|
| Correct prediction | +10 |
| Incorrect | 0 |
| No prediction | 0 |

## License

MIT
