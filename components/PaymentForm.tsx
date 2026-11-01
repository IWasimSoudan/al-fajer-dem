"use client";

import { useCart, type PayMethod } from "@/components/CartProvider";
import { Steps } from "@/components/Steps";
import { Summary } from "@/components/Summary";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PaymentForm({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { items, draft, placeOrder, reference } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState<PayMethod>("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState(false);

  if (reference) return null;

  if (items.length === 0) {
    return (
      <section className="page wrap">
        <h1>{dict.payment.title}</h1>
        <p>{dict.cart.empty}</p>
        <Link className="btn" href={`/${lang}/cart`}>
          {dict.steps.cart}
        </Link>
      </section>
    );
  }

  if (!draft.name) {
    return (
      <section className="page wrap">
        <h1>{dict.payment.title}</h1>
        <p>{dict.checkout.missing}</p>
        <Link className="btn" href={`/${lang}/checkout`}>
          {dict.steps.details}
        </Link>
      </section>
    );
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (method === "card") {
      const digits = cardNumber.replace(/\D/g, "");
      const expiryOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.trim());
      if (!cardName.trim() || digits.length < 12 || digits.length > 19 || !expiryOk) {
        setError(true);
        return;
      }
    }
    setCardName("");
    setCardNumber("");
    setExpiry("");
    placeOrder(method);
    router.push(`/${lang}/complete`);
  }

  return (
    <section className="page wrap">
      <p className="kicker">{dict.steps.label.replace("{current}", "3").replace("{total}", "4")}</p>
      <h1>{dict.payment.title}</h1>
      <Steps lang={lang} dict={dict} current={3} />
      <p className="note">{dict.payment.demo}</p>
      <p className="lead">{dict.payment.lead}</p>
      <div className="purchase" style={{ marginTop: "1.4rem" }}>
        <form className="form" onSubmit={onSubmit}>
          <div className="choices">
            <button type="button" aria-pressed={method === "card"} onClick={() => setMethod("card")}>
              {dict.payment.card}
            </button>
            <button type="button" aria-pressed={method === "cod"} onClick={() => setMethod("cod")}>
              {dict.payment.cod}
            </button>
          </div>
          {method === "card" ? (
            <>
              <label className="field">
                <span>{dict.payment.cardName}</span>
                <input value={cardName} onChange={(event) => setCardName(event.target.value)} autoComplete="off" />
              </label>
              <label className="field">
                <span>{dict.payment.cardNumber}</span>
                <input
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  inputMode="numeric"
                  autoComplete="off"
                />
              </label>
              <label className="field">
                <span>{dict.payment.expiry}</span>
                <input value={expiry} onChange={(event) => setExpiry(event.target.value)} placeholder="08/28" autoComplete="off" />
              </label>
            </>
          ) : null}
          {error ? <p className="error">{dict.payment.missing}</p> : null}
          <button className="btn" type="submit">
            {dict.payment.pay}
          </button>
        </form>
        <Summary lang={lang} dict={dict} title={dict.payment.summary} />
      </div>
    </section>
  );
}
