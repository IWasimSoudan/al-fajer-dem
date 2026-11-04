import { redirect } from "next/navigation";
import { load } from "@/lib/page";

/** Shop is folded into Products — keep route for old links. */
export default async function ShopPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await load(params);
  redirect(`/${lang}/products`);
}
