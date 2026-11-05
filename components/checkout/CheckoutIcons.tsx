import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MapPin,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";

const size = 18;

export function CartIcon() {
  return <ShoppingCart size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export function DetailsIcon() {
  return <MapPin size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export function PaymentIcon() {
  return <CreditCard size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export function DoneIcon() {
  return <CheckCircle2 size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export function TrashIcon() {
  return <Trash2 size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export function PlusIcon() {
  return <Plus size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export function MinusIcon() {
  return <Minus size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export function NextIcon() {
  return <ArrowRight size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export function PackageIcon() {
  return <Package size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export function WalletIcon() {
  return <Wallet size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export const STEP_ICONS: Record<1 | 2 | 3 | 4, () => ReactNode> = {
  1: CartIcon,
  2: DetailsIcon,
  3: PaymentIcon,
  4: DoneIcon,
};
