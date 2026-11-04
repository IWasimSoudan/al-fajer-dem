import type { PaymentTranslations } from "@/lib/dictionaries/en/payment";

export const payment = {
  title: "الدفع",
  lead: "اختر طريقة. بيانات البطاقة تبقى في هذا النموذج ثم تُهمل. لا يوجد اتصال بأي بنك.",
  card: "بطاقة",
  cod: "الدفع عند الاستلام",
  cardName: "الاسم على البطاقة",
  cardNumber: "رقم البطاقة",
  expiry: "الانتهاء",
  pay: "إنهاء العرض",
  missing: "أدخل الاسم ورقم بطاقة من 12 إلى 19 رقمًا وتاريخًا مثل 08/28.",
  summary: "الطلب",
  demo: "للعرض فقط. لا يُحصَّل أي مبلغ.",
} satisfies PaymentTranslations;
