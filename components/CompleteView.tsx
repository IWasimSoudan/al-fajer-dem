"use client";

import { useCart } from "@/components/CartProvider";
import { Steps } from "@/components/Steps";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money } from "@/lib/money";
import Link from "next/link";

export function CompleteView({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { reference, method, orderLines, draft } = useCart();
  const total = orderLines.reduce((sum, line) => sum + line.price * line.qty, 0);

  return (
    <section className="page wrap">
      <p className="kicker">{dict.steps.label.replace("{current}", "4").replace("{total}", "4")}</p>
      <h1>{dict.complete.title}</h1>
      <Steps lang={lang} dict={dict} current={4} />
      {!reference ? (
        <div className="prose">
          <p>{dict.complete.empty}</p>
          <Link className="btn" href={`/${lang}/products`}>
            {dict.complete.again}
          </Link>
        </div>
      ) : (
        <div className="purchase">
          <div>
            <p className="lead">{dict.complete.lead}</p>
            <p style={{ marginTop: "1.2rem" }}>{dict.complete.reference}</p>
            <p className="reference">{reference}</p>
            <p>
              {dict.complete.for} {draft.name}
            </p>
            <p>{method === "cod" ? dict.complete.methodCod : dict.complete.methodCard}</p>
            <div className="actions">
              <Link className="btn" href={`/${lang}`}>
                {dict.complete.home}
              </Link>
              <Link className="btn ghost" href={`/${lang}/products`}>
                {dict.complete.again}
              </Link>
            </div>
          </div>
          <aside className="summary">
            <h2 style={{ fontSize: "1.1rem" }}>{dict.payment.summary}</h2>
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
      )}
    </section>
  );
}
