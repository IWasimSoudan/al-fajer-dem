"use client";

import { gallery } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import Image from "next/image";
import { useState } from "react";

const filters = ["all", "steel", "shutters", "art", "warehouse", "gates"] as const;

export function GalleryGrid({ dict }: { dict: Dictionary }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const items = gallery.filter((item) => filter === "all" || item.filter === filter);

  return (
    <div>
      <div className="filters">
        {filters.map((key) => (
          <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {dict.gallery.filters[key]}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {items.map((item) => (
          <figure key={item.id}>
            <div className="frame">
              <Image src={item.image} alt={dict.gallery.items[item.id]} fill sizes="(max-width: 800px) 100vw, 33vw" className="photo" />
            </div>
            <figcaption>{dict.gallery.items[item.id]}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
