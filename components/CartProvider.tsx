"use client";

import { productById, products } from "@/lib/catalog";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Draft = {
  name: string;
  phone: string;
  city: string;
  address: string;
  note: string;
};

export type OrderLine = {
  id: string;
  qty: number;
  price: number;
};

export type PayMethod = "card" | "cod";

type CartItem = { id: string; qty: number };

type CartValue = {
  items: CartItem[];
  draft: Draft;
  reference: string;
  method: PayMethod | "";
  orderLines: OrderLine[];
  count: number;
  total: number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  setDraft: (draft: Draft) => void;
  placeOrder: (method: PayMethod) => void;
};

const emptyDraft: Draft = { name: "", phone: "", city: "", address: "", note: "" };

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [reference, setReference] = useState("");
  const [method, setMethod] = useState<PayMethod | "">("");
  const [orderLines, setOrderLines] = useState<OrderLine[]>([]);

  const value = useMemo<CartValue>(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const total = items.reduce((sum, item) => {
      const product = productById(item.id);
      return sum + (product && product.price != null ? product.price * item.qty : 0);
    }, 0);

    return {
      items,
      draft,
      reference,
      method,
      orderLines,
      count,
      total,
      add(id) {
        const product = productById(id);
        if (!product || product.price == null) return;
        setItems((current) => {
          const found = current.find((item) => item.id === id);
          if (!found) return [...current, { id, qty: 1 }];
          return current.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
        });
      },
      setQty(id, qty) {
        setItems((current) => {
          if (qty < 1) return current.filter((item) => item.id !== id);
          return current.map((item) => (item.id === id ? { ...item, qty } : item));
        });
      },
      remove(id) {
        setItems((current) => current.filter((item) => item.id !== id));
      },
      setDraft,
      placeOrder(nextMethod) {
        const lines = items.flatMap((item) => {
          const product = productById(item.id);
          return product ? [{ id: item.id, qty: item.qty, price: product.price ?? 0 }] : [];
        });
        setOrderLines(lines);
        setMethod(nextMethod);
        setReference(`AF-${Math.floor(1000 + Math.random() * 9000)}`);
        setItems([]);
      },
    };
  }, [items, draft, reference, method, orderLines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("Cart is missing");
  return value;
}
