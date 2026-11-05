"use client";

import { FlowSteps } from "@/components/checkout/FlowSteps";
import {
  CHECKOUT_STYLES,
  resolveCheckoutStyle,
  type CheckoutStyleId,
} from "@/lib/checkoutStyles";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

function StylePicker({
  lang,
  dict,
  active,
  path,
}: {
  lang: Locale;
  dict: Dictionary;
  active: CheckoutStyleId;
  path: string;
}) {
  return (
    <aside className="ck-picker" aria-label={dict.cart.stylePicker}>
      <div className="ck-picker-copy">
        <p className="ck-picker-title">{dict.cart.stylePicker}</p>
        <p className="ck-picker-hint">{dict.cart.styleHint}</p>
      </div>
      <div className="ck-picker-list" role="list">
        {CHECKOUT_STYLES.map((id) => {
          const meta = dict.cart.styles[id];
          return (
            <Link
              key={id}
              href={`/${lang}${path}?style=${id}`}
              role="listitem"
              className={active === id ? "ck-picker-item is-active" : "ck-picker-item"}
              aria-current={active === id ? "page" : undefined}
              scroll={false}
            >
              <strong>{meta.label}</strong>
              <span>{meta.blurb}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export function CheckoutFlowShell({
  lang,
  dict,
  title,
  current,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  title: string;
  current: 1 | 2 | 3 | 4;
  children: ReactNode;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const style = resolveCheckoutStyle(searchParams.get("style") ?? undefined);
  const path = pathname.replace(/^\/(en|ar)/, "") || "/cart";

  return (
    <div className={`home-page stage-page ck-studio ck-${style}`}>
      <div className="page-body ck-body">
        <h1 className="ck-title">{title}</h1>
        <StylePicker lang={lang} dict={dict} active={style} path={path} />
        <div className="ck-idea" role="note">
          <p className="ck-idea-kicker">{dict.cart.styleWhy}</p>
          <p>
            <strong>{dict.cart.styles[style].label}</strong>
            <span>{dict.cart.styles[style].idea}</span>
          </p>
        </div>

        <FlowSteps lang={lang} dict={dict} current={current} style={style} />
        <div className="ck-content">{children}</div>
      </div>
    </div>
  );
}

export function useCheckoutStyle() {
  const searchParams = useSearchParams();
  return resolveCheckoutStyle(searchParams.get("style") ?? undefined);
}
