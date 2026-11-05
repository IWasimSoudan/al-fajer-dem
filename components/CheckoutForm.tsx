"use client";

import { useCart, type Draft } from "@/components/CartProvider";
import { CartIcon, DetailsIcon, NextIcon } from "@/components/checkout/CheckoutIcons";
import { useCheckoutStyle } from "@/components/checkout/CheckoutFlowShell";
import { Summary } from "@/components/Summary";
import { checkoutStyleHref } from "@/lib/checkoutStyles";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const empty: Draft = { name: "", phone: "", city: "", address: "", note: "" };

export function CheckoutForm({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { items, draft, setDraft } = useCart();
  const router = useRouter();
  const style = useCheckoutStyle();
  const [form, setForm] = useState<Draft>(draft.name ? draft : empty);
  const [error, setError] = useState(false);

  if (items.length === 0) {
    return (
      <div className="ck-empty">
        <span className="ck-empty-icon">
          <CartIcon />
        </span>
        <p>{dict.cart.empty}</p>
        <Link className="btn" href={`/${lang}/products`}>
          {dict.cart.emptyCta}
        </Link>
      </div>
    );
  }

  function update(key: keyof Draft, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.name.trim() || phoneDigits.length < 8 || !form.city.trim() || !form.address.trim()) {
      setError(true);
      return;
    }
    setDraft({
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      address: form.address.trim(),
      note: form.note.trim(),
    });
    router.push(checkoutStyleHref(lang, "payment", style));
  }

  return (
    <div className="ck-panel">
      <p className="ck-lead">{dict.checkout.lead}</p>
      <div className="ck-purchase">
        <form className="ck-form" onSubmit={onSubmit} noValidate>
          <div className="ck-form-head">
            <DetailsIcon />
            <h2>{dict.checkout.title}</h2>
          </div>
          <label className="ck-field">
            <span>{dict.checkout.name}</span>
            <input value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" required />
          </label>
          <label className="ck-field">
            <span>{dict.checkout.phone}</span>
            <input value={form.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" required />
          </label>
          <label className="ck-field">
            <span>{dict.checkout.city}</span>
            <input value={form.city} onChange={(event) => update("city", event.target.value)} autoComplete="address-level2" required />
          </label>
          <label className="ck-field">
            <span>{dict.checkout.address}</span>
            <input value={form.address} onChange={(event) => update("address", event.target.value)} autoComplete="street-address" required />
          </label>
          <label className="ck-field">
            <span>{dict.checkout.note}</span>
            <textarea value={form.note} onChange={(event) => update("note", event.target.value)} />
          </label>
          {error ? <p className="ck-error">{dict.checkout.missing}</p> : null}
          <button className="btn ck-next" type="submit">
            {dict.checkout.next}
            <NextIcon />
          </button>
        </form>
        <Summary lang={lang} dict={dict} title={dict.checkout.summary} />
      </div>
    </div>
  );
}
