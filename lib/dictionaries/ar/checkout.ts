import type { CheckoutTranslations } from "@/lib/dictionaries/en/checkout";

export const checkout = {
  title: "بياناتك",
  lead: "تُستخدم فقط لإظهار الشاشة التالية. لا يُرسل شيء ولا يُحفظ.",
  name: "الاسم",
  phone: "الهاتف",
  city: "المدينة",
  address: "العنوان",
  note: "ملاحظة (اختياري)",
  next: "تابع إلى الدفع",
  missing: "أضف الاسم والهاتف والمدينة والعنوان.",
  summary: "الطلب",
} satisfies CheckoutTranslations;
