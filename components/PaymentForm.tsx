"use client";

import { useCart, type PayMethod } from "@/components/CartProvider";
import { CartIcon, DetailsIcon, NextIcon, WalletIcon } from "@/components/checkout/CheckoutIcons";
import { useCheckoutStyle } from "@/components/checkout/CheckoutFlowShell";
import { Summary } from "@/components/Summary";
import { checkoutStyleHref } from "@/lib/checkoutStyles";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PaymentForm({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { items, draft, placeOrder, reference } = useCart();
  const router = useRouter();
  const style = useCheckoutStyle();
  const [method, setMethod] = useState<PayMethod>("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState(false);

  if (reference) return null;

  if (items.length === 0) {
    return (
      <div className="ck-empty">
        <span className="ck-empty-icon">
          <CartIcon />
        </span>
        <p>{dict.cart.empty}</p>
        <Link className="btn" href={checkoutStyleHref(lang, "cart", style)}>
          {dict.steps.cart}
        </Link>
      </div>
    );
  }

  if (!draft.name) {
    return (
      <div className="ck-empty">
        <span className="ck-empty-icon">
          <DetailsIcon />
        </span>
        <p>{dict.checkout.missing}</p>
        <Link className="btn" href={checkoutStyleHref(lang, "checkout", style)}>
          {dict.steps.details}
        </Link>
      </div>
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
    router.push(checkoutStyleHref(lang, "complete", style));
  }

  return (
    <div className="ck-panel">
      <p className="ck-note">{dict.payment.demo}</p>
      <p className="ck-lead">{dict.payment.lead}</p>
      <div className="ck-purchase">
        <form className="ck-form" onSubmit={onSubmit}>
          <div className="ck-form-head">
            <CreditCard size={18} strokeWidth={1.75} aria-hidden="true" />
            <h2>{dict.payment.title}</h2>
          </div>
          <div className="ck-choices">
            <button type="button" aria-pressed={method === "card"} onClick={() => setMethod("card")}>
              <CreditCard size={18} strokeWidth={1.75} aria-hidden="true" />
              {dict.payment.card}
            </button>
            <button type="button" aria-pressed={method === "cod"} onClick={() => setMethod("cod")}>
              <WalletIcon />
              {dict.payment.cod}
            </button>
          </div>
          {method === "card" ? (
            <>
              <label className="ck-field">
                <span>{dict.payment.cardName}</span>
                <input value={cardName} onChange={(event) => setCardName(event.target.value)} autoComplete="off" />
              </label>
              <label className="ck-field">
                <span>{dict.payment.cardNumber}</span>
                <input
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  inputMode="numeric"
                  autoComplete="off"
                />
              </label>
              <label className="ck-field">
                <span>{dict.payment.expiry}</span>
                <input value={expiry} onChange={(event) => setExpiry(event.target.value)} placeholder="08/28" autoComplete="off" />
              </label>
            </>
          ) : null}
          {error ? <p className="ck-error">{dict.payment.missing}</p> : null}
          <button className="btn ck-next" type="submit">
            {dict.payment.pay}
            <NextIcon />
          </button>
        </form>
        <Summary lang={lang} dict={dict} title={dict.payment.summary} />
      </div>
    </div>
  );
}
