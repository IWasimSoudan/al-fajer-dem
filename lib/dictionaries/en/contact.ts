export const contact = {
  kicker: "Contact",
  title: "Write to the team",
  lead: "The form opens an email draft to admin@iconsjo.com. It does not store the message.",
  stylePicker: "Contact layout — preview only",
  styleHint: "Same form and visit details, three ways to present them. Pick one later to lock in.",
  styleWhy: "Why this layout",
  styles: {
    desk: {
      label: "1 · Workshop desk",
      blurb: "Form and visit card side by side; FAQ settles in below.",
      idea: "Closest to a quiet office desk — clear write path with the address in reach.",
    },
    board: {
      label: "2 · Info board",
      blurb: "Visit facts in a top strip; form and FAQ share the floor.",
      idea: "Corporate notice-board feel — hours and email lead, then the draft form.",
    },
    stage: {
      label: "3 · Visit stage",
      blurb: "Large visit panel with the form on a floating card and FAQ under it.",
      idea: "More atmospheric — place first, then the write action.",
    },
  },
  name: "Name",
  email: "Email",
  message: "Message",
  send: "Open email draft",
  hint: "Your email app opens with this message. If it does not, write to admin@iconsjo.com.",
  missing: "Add your name, a valid email, and a message.",
  visitTitle: "Visit",
  visitPlaceholder: "Workshop location",
  faqTitle: "Before you write",
  faq: [
    {
      q: "How do I ask for a price?",
      a: "Send the opening size, the building type, and the city. The team replies with a quotation. The cart on this site is only a demonstration.",
    },
    {
      q: "How long does the work take?",
      a: "Stock accessories in Amman often move quickly. Custom doors, motors, and fabricated steel are scheduled after measurements are confirmed.",
    },
    {
      q: "Where do you install?",
      a: "Supply and installation cover Jordan, with projects across the MENA region. Delivery cost depends on size, weight, and destination.",
    },
    {
      q: "Can I get certificates for a tender?",
      a: "Yes. Ask for the compliance sheet, the wind-class rating, or the manufacturer certificate you need for the inspection.",
    },
    {
      q: "Do you service doors after installation?",
      a: "Yes. Repair covers Jordan, and annual maintenance contracts can include an extended warranty.",
    },
  ],
};

export type ContactTranslations = typeof contact;
