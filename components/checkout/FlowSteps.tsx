"use client";

import { STEP_ICONS } from "@/components/checkout/CheckoutIcons";
import { checkoutStyleHref, type CheckoutStyleId } from "@/lib/checkoutStyles";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

const keys = ["cart", "checkout", "payment", "complete"] as const;

export function FlowSteps({
  lang,
  dict,
  current,
  style,
}: {
  lang: Locale;
  dict: Dictionary;
  current: 1 | 2 | 3 | 4;
  style: CheckoutStyleId;
}) {
  const labels = [dict.steps.cart, dict.steps.details, dict.steps.payment, dict.steps.done];

  return (
    <ol
      className="ck-steps"
      aria-label={dict.steps.label.replace("{current}", String(current)).replace("{total}", "4")}
    >
      {labels.map((label, index) => {
        const step = (index + 1) as 1 | 2 | 3 | 4;
        const Icon = STEP_ICONS[step];
        const state = step < current ? "is-done" : step === current ? "is-current" : "is-todo";
        const content = (
          <>
            <span className="ck-step-icon">
              <Icon />
            </span>
            <span className="ck-step-copy">
              <em>{String(step).padStart(2, "0")}</em>
              <strong>{label}</strong>
            </span>
          </>
        );

        return (
          <li key={label} className={`ck-step ${state}`}>
            {step < current ? (
              <Link href={checkoutStyleHref(lang, keys[index], style)}>{content}</Link>
            ) : (
              <span aria-current={step === current ? "step" : undefined}>{content}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
