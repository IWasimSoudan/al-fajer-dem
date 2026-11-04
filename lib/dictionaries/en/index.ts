import { about } from "./about";
import { brands } from "./brands";
import { cart } from "./cart";
import { catalog } from "./catalog";
import { certificates } from "./certificates";
import { checkout } from "./checkout";
import { common } from "./common";
import { complete } from "./complete";
import { contact } from "./contact";
import { expertise } from "./expertise";
import { footer } from "./footer";
import { gallery } from "./gallery";
import { home } from "./home";
import { nav } from "./nav";
import { notFound } from "./notFound";
import { payment } from "./payment";
import { products } from "./products";
import { projects } from "./projects";
import { steps } from "./steps";

export const en = {
  ...common,
  nav,
  footer,
  home,
  about,
  expertise,
  products,
  catalog,
  projects,
  gallery,
  brands,
  certificates,
  contact,
  steps,
  cart,
  checkout,
  payment,
  complete,
  notFound,
};

export type Dictionary = typeof en;

export type { AboutTranslations } from "./about";
export type { BrandsTranslations } from "./brands";
export type { CartTranslations } from "./cart";
export type { CatalogTranslations } from "./catalog";
export type { CertificatesTranslations } from "./certificates";
export type { CheckoutTranslations } from "./checkout";
export type { CommonTranslations } from "./common";
export type { CompleteTranslations } from "./complete";
export type { ContactTranslations } from "./contact";
export type { ExpertiseTranslations } from "./expertise";
export type { FooterTranslations } from "./footer";
export type { GalleryTranslations } from "./gallery";
export type { HomeTranslations } from "./home";
export type { NavTranslations } from "./nav";
export type { NotFoundTranslations } from "./notFound";
export type { PaymentTranslations } from "./payment";
export type { ProductsTranslations } from "./products";
export type { ProjectsTranslations } from "./projects";
export type { StepsTranslations } from "./steps";
