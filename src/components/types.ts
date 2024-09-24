export interface SlideType {
  images?: { alt: string; src: string }[];
  bannerTitle: string;
  content: string;
  bannerDescription: string;
  more: string;
}

export interface CategoryType {
  //id: number;
  title: string;
  description: string;
  more: string;
  images?: { alt: string; src: string }[];
}

export interface IntroDataType {
  title: string;
  description: string;
  images?: { alt: string; src: string }[];
  alt: string;
  createdAt: string;
  postDate?: string;
}

export interface IntroDataType1 {
  title: string;
  description: string;
  more: string;
  images?: { alt: string; src: string }[];
  alt: string;
  createdAt: string;
}

export interface companyMemberType {
  title: string;
  description: string;
  more: string;
}
export interface ContactType {
  FooterTitle: string;
  footerPreamble: string;
  phoneNumber: string;
}

export interface ProjectType {
  title: string;
  description: string;
  Preamble: string;
}
export interface phone {
  id: number;
  title: string;
  number: string;
}
export interface Props {
  slideList: any[]; // Replace `any` with the correct type
  intro: IntroDataType;
  categorys: CategoryType[];
  memberCompany: companyMemberType;
  companies: any[]; // Replace `any` with the correct type
  data: ProjectType;
  projects: any[]; // Replace `any` with the correct type
  imageCompanies: string[];
  imageCategory: string[];
  imageSlide: string[];
  imageHomeMemberBox: string[];
  imageProject: string[];
  buttonMemberBox: any; // Replace `any` with the correct type
}

export interface ArticlesType {
  id: number;
  alt: string;
  title: string;
  images: string;
  description: string;
  outstanding?: boolean;
  slug: string;
  createdAt: string;
}

export interface IntroduceType {
  image: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface CompanyItemType2 {
  id: number;
  name: string;
  description: string;
  website: string;
  logo: LogoType;
}

export interface LogoType {
  id: number;
  alt: string;
  image: ImageType;
}

export interface ImageType {
  data: dataType;
}

interface dataType {
  attributes: AttributesType;
}

interface AttributesType {
  url: string;
  alt: string;
}

export interface News {
  title: string;
  description: string;
  slug?: string;
  createdAt?: string;
}

export interface NewsItemProps {
  news: any;
}
