import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Building2,
  Clock,
  FolderKanban,
  Globe,
  HardHat,
  Images,
  Mail,
  MapPin,
  Package,
  Phone,
  Printer,
  Smartphone,
  Tags,
  Users,
} from "lucide-react";

export const NAV_ICONS = {
  about: Building2,
  products: Package,
  projects: FolderKanban,
  brands: Tags,
  certificates: Award,
  clients: Users,
  gallery: Images,
  expertise: HardHat,
  catalog: BookOpen,
  contact: Phone,
} as const satisfies Record<string, LucideIcon>;

export const FOOTER_FACT_ICONS = {
  email: Mail,
  phone: Phone,
  mobile: Smartphone,
  website: Globe,
  visit: MapPin,
  hours: Clock,
  fax: Printer,
} as const satisfies Record<string, LucideIcon>;
