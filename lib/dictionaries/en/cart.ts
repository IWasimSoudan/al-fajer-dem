export const cart = {
  title: "Cart",
  kicker: "Order",
  lead: "Check the sample items. You can change the quantity or remove a line.",
  empty: "Your cart is empty.",
  emptyCta: "Browse products",
  remove: "Remove",
  total: "Total",
  checkout: "Continue to details",
  qty: "Quantity",
  stylePicker: "Checkout layout — preview only",
  styleHint: "Same cart and checkout flow, two ways to present it. Pick one later to lock in.",
  styleWhy: "Why this layout",
  styles: {
    desk: {
      label: "1 · Workshop desk",
      blurb: "Light panels, icon steps, and a sticky order summary.",
      idea: "Closest to a quiet sales desk — clear lines, form beside the total.",
    },
    board: {
      label: "2 · Info board",
      blurb: "Navy step strip on top; ice cards for lines and forms below.",
      idea: "Corporate notice-board energy — progress leads, then the write path.",
    },
  },
}

export type CartTranslations = typeof cart;
