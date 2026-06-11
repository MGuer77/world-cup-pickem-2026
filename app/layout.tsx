import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Cup Pick'em 2026",
  description: "Make predictions for every FIFA World Cup 2026 match. Track your accuracy, earn points, and climb the leaderboard — no account needed.",
  keywords: ["World Cup 2026", "FIFA", "predictions", "pick em", "soccer"],
  openGraph: {
    title: "World Cup Pick'em 2026",
    description: "Predict every match. Earn points. Rule the leaderboard.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚽</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
