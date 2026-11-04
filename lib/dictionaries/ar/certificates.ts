import type { CertificatesTranslations } from "@/lib/dictionaries/en/certificates";

export const certificates = {
  kicker: "الشهادات",
  title: "أوراق للمناقصات والكشف",
  lead: "مستندات UL وISO وتصنيفات الرياح وشهادات المصنّع متاحة عند الطلب.",
  points: [
    "أوراق مطابقة لمنتجات المناقصة",
    "تصنيف الرياح لأبواب الفئة 4",
    "شهادات المصنّع عندما يطلبها الكشف",
  ],
  items: {
    ul1: {
      title: "UL1",
      text: "وثائق إدراج UL لأنظمة الأبواب واللفافة عند طلب المناقصة.",
    },
    ul2: {
      title: "UL2",
      text: "أوراق UL إضافية للفتحات المصنّفة وحزم التجهيزات المرتبطة.",
    },
    iso9001: {
      title: "ISO 9001",
      text: "شهادة إدارة الجودة التي تغطي التصنيع والتركيب.",
    },
  },
  cta: "اطلب المستندات",
} satisfies CertificatesTranslations;
