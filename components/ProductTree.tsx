"use client";

import { asset } from "@/lib/asset";
import { productTree, type CategoryId } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ProductTree({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState<CategoryId | null>(productTree[0]?.id ?? null);

  return (
    <div className="product-tree">
      <div className="product-tree-head">
        <div>
          <h2>{dict.products.treeTitle}</h2>
          <p className="lead">{dict.products.treeLead}</p>
        </div>
        <Link className="btn" href={`/${lang}/shop`}>
          {dict.products.shopCta}
        </Link>
      </div>

      <div className="product-tree-grid">
        {productTree.map((branch) => {
          const copy = dict.products.categories[branch.id];
          const active = open === branch.id;
          return (
            <article key={branch.id} className={active ? "product-branch is-open" : "product-branch"}>
              <button type="button" aria-expanded={active} onClick={() => setOpen(active ? null : branch.id)}>
                <span className="frame product-branch-media">
                  <Image src={asset(branch.image)} alt="" fill sizes="(max-width: 800px) 100vw, 20vw" className="photo" />
                </span>
                <span className="product-branch-copy">
                  <strong>{copy.title}</strong>
                  <span>{copy.text}</span>
                </span>
              </button>
              {active ? (
                <div className="product-subtypes">
                  <p className="product-subtypes-label">{dict.products.subtypes}</p>
                  {branch.children.length === 0 ? (
                    <p className="prose">{copy.text}</p>
                  ) : (
                    <ul>
                      {branch.children.map((child) => (
                        <li key={child.id}>
                          <span className="frame product-subtype-media">
                            <Image src={asset(child.image)} alt="" fill sizes="72px" className="photo" />
                          </span>
                          <span>{dict.products.children[child.id]}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
