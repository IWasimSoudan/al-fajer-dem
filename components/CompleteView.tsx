"use client";

import { useCart } from "@/components/CartProvider";
import { DoneIcon, PackageIcon } from "@/components/checkout/CheckoutIcons";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money } from "@/lib/money";
import Link from "next/link";

export function CompleteView({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { reference, method, orderLines, draft } = useCart();
  const total = orderLines.reduce((sum, line) => sum + line.price * line.qty, 0);

  if (!reference) {
    return (
      <div className="ck-empty">
        <span className="ck-empty-icon">
          <PackageIcon />
        </span>
        <p>{dict.complete.empty}</p>
        <Link className="btn" href={`/${lang}/products`}>
          {dict.complete.again}
        </Link>
      </div>
    );
  }

  return (
    <div className="ck-panel ck-complete">
      <div className="ck-purchase">
        <div className="ck-complete-card">
          <span className="ck-complete-icon">
            <DoneIcon />
          </span>
          <p className="ck-lead">{dict.complete.lead}</p>
          <p className="ck-complete-label">{dict.complete.reference}</p>
          <p className="ck-reference">{reference}</p>
          <p>
            {dict.complete.for} {draft.name}
          </p>
          <p>{method === "cod" ? dict.complete.methodCod : dict.complete.methodCard}</p>
          <div className="ck-actions">
            <Link className="btn" href={`/${lang}`}>
              {dict.complete.home}
            </Link>
            <Link className="btn ghost" href={`/${lang}/products`}>
              {dict.complete.again}
            </Link>
          </div>
        </div>
        <aside className="ck-summary">
          <div className="ck-summary-head">
            <PackageIcon />
            <h2>{dict.payment.summary}</h2>
          </div>
          <ul>
            {orderLines.map((line) => (
              <li key={line.id}>
                <span>
                  {dict.products.items[line.id as keyof typeof dict.products.items].name} × {line.qty}
                </span>
                <span>{money(lang, line.price * line.qty)}</span>
              </li>
            ))}
          </ul>
          <strong>
            {dict.cart.total}: {money(lang, total)}
          </strong>
        </aside>
      </div>
    </div>
  );
}
