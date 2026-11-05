import type { HomeV2Translations } from "@/lib/dictionaries/en/homeV2";
import { Award, Handshake, Headset, ShieldCheck, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Skeleton } from "./Skeleton";

const trustIcons: Record<HomeV2Translations["trust"][number]["id"], LucideIcon> = {
  years: Award,
  ship: Truck,
  support: Headset,
  partners: Handshake,
  quality: ShieldCheck,
};

export function TrustStrip({ copy, ready }: { copy: HomeV2Translations["trust"]; ready: boolean }) {
  if (!ready) {
    return (
      <section className="hv2-trust is-loading" aria-busy="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="hv2-trust-skel" />
        ))}
      </section>
    );
  }

  return (
    <section className="hv2-trust" aria-label="Trust">
      {copy.map((item) => {
        const Icon = trustIcons[item.id];
        return (
          <article key={item.id} className="hv2-trust-item">
            <span className="hv2-trust-icon">
              <Icon strokeWidth={1.75} />
            </span>
            <p>{item.label}</p>
          </article>
        );
      })}
    </section>
  );
}
