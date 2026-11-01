import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

const keys = ["cart", "checkout", "payment", "complete"] as const;

export function Steps({
  lang,
  dict,
  current,
}: {
  lang: Locale;
  dict: Dictionary;
  current: 1 | 2 | 3 | 4;
}) {
  const labels = [dict.steps.cart, dict.steps.details, dict.steps.payment, dict.steps.done];

  return (
    <ol className="steps" aria-label={dict.steps.label.replace("{current}", String(current)).replace("{total}", "4")}>
      {labels.map((label, index) => {
        const step = index + 1;
        const className = step === current ? "current" : undefined;
        if (step < current) {
          return (
            <li key={label}>
              <Link className={className} href={`/${lang}/${keys[index]}`}>
                {step}. {label}
              </Link>
            </li>
          );
        }
        return (
          <li key={label}>
            <span className={className} aria-current={step === current ? "step" : undefined}>
              {step}. {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
