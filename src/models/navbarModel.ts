import { ReactNode } from "react";

export interface NavbarModel {
  label: string;
  key: string;
  icon?: ReactNode;
  hoverIcon?: ReactNode;
  title?: string;
  link: string;
  introducts?: Introduct;
  urls?: Url[];
}

interface Introduct {
  background: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Url {
  key: string;
  title: string;
  slug?: string;
  description?: string;
  articles?: SubUrl[];
}

export interface SubUrl {
  key: string;
  title: string;
  slug?: string;
}
