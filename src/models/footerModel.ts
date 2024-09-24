import { ReactNode } from "react";

export interface FooterModel {
  title: string;
  children: Url[];
}

export interface Url {
  label: string;
  link?: string;
}
