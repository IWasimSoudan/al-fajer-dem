"use client";

import { asset } from "@/lib/asset";
import { gallery, galleryFilters } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import Image from "next/image";
import { useState } from "react";

export function GalleryGrid({ dict }: { dict: Dictionary }) {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]>("all");
  const items = gallery.filter((item) => filter === "all" || item.filter === filter);

  return (
    <div>
      <div className="filters">
        {galleryFilters.map((key) => (
          <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {dict.gallery.filters[key]}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {items.map((item) => (
          <figure key={item.id}>
            <div className="frame">
              <Image src={asset(item.image)} alt={dict.gallery.items[item.id]} fill sizes="(max-width: 800px) 100vw, 33vw" className="photo" />
            </div>
            <figcaption>{dict.gallery.items[item.id]}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
