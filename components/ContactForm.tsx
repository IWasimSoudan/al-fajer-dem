"use client";

import type { Dictionary } from "@/lib/dictionaries/en";
import { useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [error, setError] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !emailPattern.test(email) || message.length < 2) {
      setError(true);
      return;
    }
    setError(false);
    const body = `${name}\n${email}\n\n${message}`;
    window.location.href = `mailto:${dict.footer.email}?subject=${encodeURIComponent("Al Fajer Group")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label className="field">
        <span>{dict.contact.name}</span>
        <input name="name" autoComplete="name" required />
      </label>
      <label className="field">
        <span>{dict.contact.email}</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="field">
        <span>{dict.contact.message}</span>
        <textarea name="message" required />
      </label>
      {error ? <p className="error">{dict.contact.missing}</p> : <p>{dict.contact.hint}</p>}
      <button className="btn" type="submit">
        {dict.contact.send}
      </button>
    </form>
  );
}
