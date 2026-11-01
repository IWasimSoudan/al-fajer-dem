"use client";

import { useCart, type Draft } from "@/components/CartProvider";
import { Steps } from "@/components/Steps";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money } from "@/lib/money";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Summary } from "@/components/Summary";

const empty: Draft = { name: "", phone: "", city: "", address: "", note: "" };

export function CheckoutForm({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { items, draft, setDraft } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<Draft>(draft.name ? draft : empty);
  const [error, setError] = useState(false);

  if (items.length === 0) {
    return (
      <div className="prose">
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
    router.push(`/${lang}/payment`);
  }

  return (
    <div>
      <Steps lang={lang} dict={dict} current={2} />
      <p className="lead">{dict.checkout.lead}</p>
      <div className="purchase" style={{ marginTop: "1.4rem" }}>
        <form className="form" onSubmit={onSubmit} noValidate>
          <label className="field">
            <span>{dict.checkout.name}</span>
            <input value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" required />
          </label>
          <label className="field">
            <span>{dict.checkout.phone}</span>
            <input value={form.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" required />
          </label>
          <label className="field">
            <span>{dict.checkout.city}</span>
            <input value={form.city} onChange={(event) => update("city", event.target.value)} autoComplete="address-level2" required />
          </label>
          <label className="field">
            <span>{dict.checkout.address}</span>
            <input value={form.address} onChange={(event) => update("address", event.target.value)} autoComplete="street-address" required />
          </label>
          <label className="field">
            <span>{dict.checkout.note}</span>
            <textarea value={form.note} onChange={(event) => update("note", event.target.value)} />
          </label>
          {error ? <p className="error">{dict.checkout.missing}</p> : null}
          <button className="btn" type="submit">
            {dict.checkout.next}
          </button>
        </form>
        <Summary lang={lang} dict={dict} title={dict.checkout.summary} />
      </div>
    </div>
  );
}
