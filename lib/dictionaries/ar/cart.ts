import type { CartTranslations } from "@/lib/dictionaries/en/cart";

export const cart = {
  title: "السلة",
  kicker: "الطلب",
  lead: "راجع النماذج. يمكنك تغيير الكمية أو حذف سطر.",
  empty: "السلة فارغة.",
  emptyCta: "تصفح المنتجات",
  remove: "حذف",
  total: "المجموع",
  checkout: "تابع إلى البيانات",
  qty: "الكمية",
  stylePicker: "تخطيط الدفع — معاينة فقط",
  styleHint: "نفس مسار السلة والدفع، بطريقتين للعرض. اختر لاحقاً للتثبيت.",
  styleWhy: "لماذا هذا التخطيط",
  styles: {
    desk: {
      label: "1 · مكتب الورشة",
      blurb: "لوحات فاتحة وخطوات بأيقونات وملخص طلب ثابت.",
      idea: "الأقرب لمكتب مبيعات هادئ — أسطر واضحة والنموذج بجانب المجموع.",
    },
    board: {
      label: "2 · لوحة معلومات",
      blurb: "شريط خطوات كحلي أعلاه؛ بطاقات ثلجية للأسطر والنماذج.",
      idea: "طاقة لوحة شركات — التقدّم يقود ثم مسار الكتابة.",
    },
  },
} satisfies CartTranslations;
