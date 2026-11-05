"use client";

import { CatalogCompareStudio } from "@/components/catalog/CatalogCompareStudio";
import { asset } from "@/lib/asset";
import { products } from "@/lib/catalog";
import {
  CATALOG_STYLES,
  catalogDownloads,
  resolveCatalogStyle,
  type CatalogDownloadId,
  type CatalogStyleId,
} from "@/lib/catalogStyles";
import { resolveCompareStyle, type CompareStyleId } from "@/lib/compareStyles";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { productPriceLabel } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

function StylePicker({
  lang,
  dict,
  active,
  compare,
}: {
  lang: Locale;
  dict: Dictionary;
  active: CatalogStyleId;
  compare: CompareStyleId;
}) {
  return (
    <aside className="cg-picker" aria-label={dict.catalog.stylePicker}>
      <div className="cg-picker-copy">
        <p className="cg-picker-title">{dict.catalog.stylePicker}</p>
        <p className="cg-picker-hint">{dict.catalog.styleHint}</p>
      </div>
      <div className="cg-picker-list" role="list">
        {CATALOG_STYLES.map((id) => {
          const meta = dict.catalog.styles[id];
          return (
            <Link
              key={id}
              href={`/${lang}/catalog?style=${id}&compare=${compare}`}
              role="listitem"
              className={active === id ? "cg-picker-item is-active" : "cg-picker-item"}
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

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="cg-dl-icon">
      <path
        d="M12 3v10m0 0l-3.5-3.5M12 13l3.5-3.5M5 18h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ViewIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="cg-dl-icon">
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Downloads({
  dict,
  variant,
}: {
  dict: Dictionary;
  variant: "cards" | "rail" | "rows";
}) {
  const [previewId, setPreviewId] = useState<CatalogDownloadId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const preview = catalogDownloads.find((file) => file.id === previewId) ?? null;
  const previewMeta = preview ? dict.catalog.downloads[preview.id] : null;
  const previewHref = preview ? asset(preview.href) : "";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (preview) {
      if (!dialog.open) dialog.showModal();
      return;
    }
    if (dialog.open) dialog.close();
  }, [preview]);

  return (
    <section className={`cg-downloads cg-downloads-${variant}`} aria-labelledby="cg-downloads-title">
      <div className="cg-downloads-head">
        <h2 id="cg-downloads-title">{dict.catalog.downloadsTitle}</h2>
        <p>{dict.catalog.downloadsLead}</p>
      </div>
      <ul className="cg-download-list">
        {catalogDownloads.map((file) => {
          const meta = dict.catalog.downloads[file.id];
          const href = asset(file.href);
          return (
            <li key={file.id}>
              <div className="cg-download-item">
                <span className="cg-download-mark" aria-hidden="true">
                  PDF
                </span>
                <span className="cg-download-copy">
                  <strong>{meta.title}</strong>
                  <em>{meta.blurb}</em>
                </span>
                <span className="cg-download-actions">
                  <button
                    type="button"
                    className="cg-download-action cg-download-view"
                    onClick={() => setPreviewId(file.id)}
                  >
                    <ViewIcon />
                    {dict.catalog.viewCta}
                  </button>
                  <a className="cg-download-action" href={href} download={file.fileName}>
                    <DownloadIcon />
                    {dict.catalog.downloadCta}
                  </a>
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        className="cg-preview"
        aria-labelledby={titleId}
        onClose={() => setPreviewId(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setPreviewId(null);
        }}
      >
        {preview && previewMeta ? (
          <div className="cg-preview-panel">
            <header className="cg-preview-head">
              <div>
                <p className="cg-preview-kicker">PDF</p>
                <h3 id={titleId}>{previewMeta.title}</h3>
              </div>
              <div className="cg-preview-tools">
                <a className="btn ghost" href={previewHref} target="_blank" rel="noreferrer">
                  {dict.catalog.previewOpenTab}
                </a>
                <a className="btn" href={previewHref} download={preview.fileName}>
                  {dict.catalog.previewDownload}
                </a>
                <button type="button" className="btn ghost" onClick={() => setPreviewId(null)}>
                  {dict.catalog.previewClose}
                </button>
              </div>
            </header>
            <div className="cg-preview-frame">
              <iframe title={previewMeta.title} src={`${previewHref}#view=FitH`} />
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

function SampleGrid({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const samples = products.slice(0, 6);

  return (
    <section className="cg-samples" aria-labelledby="cg-samples-title">
      <div className="cg-samples-head">
        <h2 id="cg-samples-title">{dict.catalog.samplesTitle}</h2>
        <p>{dict.catalog.samplesLead}</p>
      </div>
      <div className="cg-sample-grid">
        {samples.map((product) => {
          const item = dict.products.items[product.id];
          return (
            <Link key={product.id} href={`/${lang}/products/${product.id}`} className="cg-sample-card">
              <span className="cg-sample-media">
                <Image src={asset(product.image)} alt="" fill sizes="(max-width: 800px) 50vw, 220px" />
              </span>
              <span className="cg-sample-copy">
                <strong>{item.name}</strong>
                <em>{productPriceLabel(lang, product.price, dict.products.priceOnRequest)}</em>
              </span>
            </Link>
          );
        })}
      </div>
      <p className="cg-samples-more">
        <Link href={`/${lang}/products`}>{dict.catalog.browseProducts}</Link>
      </p>
    </section>
  );
}

function SheetsLayout({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <div className="cg-layout cg-sheets">
      <Downloads dict={dict} variant="cards" />
      <SampleGrid lang={lang} dict={dict} />
    </div>
  );
}

function SplitLayout({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <div className="cg-layout cg-split">
      <Downloads dict={dict} variant="rail" />
      <SampleGrid lang={lang} dict={dict} />
    </div>
  );
}

function StackLayout({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <div className="cg-layout cg-stack">
      <Downloads dict={dict} variant="rows" />
      <SampleGrid lang={lang} dict={dict} />
    </div>
  );
}

export function CatalogStyleStudio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const style = resolveCatalogStyle(searchParams.get("style") ?? undefined);
  const compare = resolveCompareStyle(searchParams.get("compare") ?? undefined);

  return (
    <div className="home-page stage-page cg-studio">
      <section className="page-hero">
        <div className="hero-media">
          <Image src={asset("/images/tanks.jpg")} alt="" fill priority sizes="100vw" className="hero-frame on" />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="page-kicker">{dict.catalog.kicker}</p>
          <h1>{dict.catalog.title}</h1>
          <p>{dict.catalog.lead}</p>
        </div>
      </section>

      <div className="page-body cg-body">
        <StylePicker lang={lang} dict={dict} active={style} compare={compare} />
        <div className="cg-idea" role="note">
          <p className="cg-idea-kicker">{dict.catalog.styleWhy}</p>
          <p>
            <strong>{dict.catalog.styles[style].label}</strong>
            <span>{dict.catalog.styles[style].idea}</span>
          </p>
        </div>

        {style === "sheets" ? <SheetsLayout lang={lang} dict={dict} /> : null}
        {style === "split" ? <SplitLayout lang={lang} dict={dict} /> : null}
        {style === "stack" ? <StackLayout lang={lang} dict={dict} /> : null}

        <CatalogCompareStudio
          lang={lang}
          dict={dict}
          layoutStyle={style}
          compareParam={searchParams.get("compare")}
        />
      </div>
    </div>
  );
}
