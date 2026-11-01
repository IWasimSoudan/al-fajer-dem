"use client";

import type { Dictionary } from "@/lib/dictionaries/en";
import { useEffect, useState } from "react";

type Stage = Dictionary["home"]["stage"];

export function QuotesSection({ stage, motion }: { stage: Stage; motion: boolean }) {
  const [quote, setQuote] = useState(0);
  const [quoteOn, setQuoteOn] = useState(true);
  const line = stage.quotes[quote];

  function show(index: number) {
    setQuoteOn(false);
    window.setTimeout(() => {
      setQuote(index);
      setQuoteOn(true);
    }, motion ? 240 : 0);
  }

  useEffect(() => {
    if (!motion) return;
    const id = window.setInterval(() => show((quote + 1) % stage.quotes.length), 7000);
    return () => window.clearInterval(id);
  }, [motion, quote, stage.quotes.length]);

  return (
    <section className="quotes" aria-roledescription="carousel">
      <div className="quotes-head">
        <p>{stage.quotesKicker}</p>
        <span />
      </div>
      <blockquote className={quoteOn ? "on" : ""}>
        <p>«{line.quote}»</p>
        <footer>
          <strong>{line.name}</strong>
          <span>{line.role}</span>
        </footer>
      </blockquote>
      <div className="quote-nav">
        {stage.quotes.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-label={`${index + 1}. ${item.name}`}
            aria-current={index === quote ? "true" : undefined}
            onClick={() => show(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
