"use client";

import { asset } from "@/lib/asset";
import type { HomeV2Translations } from "@/lib/dictionaries/en/homeV2";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "./icons";
import { Skeleton } from "./Skeleton";

export function HeroVideo({
  lang,
  copy,
  ready,
  motion,
}: {
  lang: Locale;
  copy: HomeV2Translations["hero"];
  ready: boolean;
  motion: boolean;
}) {
  const video = copy.video;

  if (!ready) {
    return (
      <section className="hv2-hero hv2-hero-video is-loading" aria-busy="true" aria-label="Hero">
        <Skeleton className="hv2-hero-skel" />
      </section>
    );
  }

  return (
    <section className="hv2-hero hv2-hero-video" aria-label="Hero">
      <div className="hv2-hero-media">
        {motion ? (
          <video
            className="hv2-hero-video-el"
            autoPlay
            muted
            loop
            playsInline
            poster={asset("/images/canopy.jpg")}
            aria-hidden="true"
            suppressHydrationWarning
          >
            <source src={asset("/videos/1101.mp4")} type="video/mp4" />
          </video>
        ) : (
          <div className="hv2-hero-frame is-on">
            <Image src={asset("/images/canopy.jpg")} alt="" fill priority sizes="100vw" />
          </div>
        )}
        <div className="hv2-hero-shade hv2-hero-shade-video" />
      </div>

      <div className="hv2-hero-copy hv2-hero-copy-video">
        <h1>{video.title}</h1>
        <p>{video.lead}</p>
        <Link className="hv2-btn hv2-btn-light" href={`/${lang}/products`}>
          <span>{video.cta}</span>
          <IconArrow />
        </Link>
      </div>
    </section>
  );
}
