import type { ReactNode } from "react";

export function CheckoutStage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="home-page checkout-page">
      <header className="checkout-head">
        <h1>{title}</h1>
      </header>
      <div className="page-body">{children}</div>
    </div>
  );
}
