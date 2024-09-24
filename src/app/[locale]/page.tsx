import React from "react";
import Home from "../../components/home";
import { FetchSlideHome } from "@/apis/slideHomePage";
import { FetchAboutUs, FetchImageAboutUs } from "@/apis/aboutUs";
import { FetchCategory, FetchImageCategory } from "@/apis/category";
import {
  FetchButtonHomeMemberBox,
  FetchHomeMember,
  FetchHomeMemberBox,
  FetchImageHomeMemberBox,
} from "@/apis/homeMemberCompany";
import {
  FetchBlockProjectHomePage,
  FetchImageBlockProject,
  FetchProjectHomePage,
} from "@/apis/projectHomePage";
import AboutMe from "@/components/AboutMe";
import SlideHome from "@/components/SlideHome";
import MemberCompanies from "@/components/MemberCompanies";
import Project from "@/components/Project";
import ContactUs from "@/components/ContactUs";
import { FetchBanner, FetchImageBanner } from "@/apis/bannerHomePage";
import {
  FetchContact,
  FetchImageContact,
  FetchPhoneNumber,
} from "@/apis/contactHome";
import Head from "next/head";
import type { Metadata } from "next";
import Link from "next/link";
import Category from "@/components/Category";
import { FloatButton } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";
import Image from "next/image";

// Define metadata for the page
export const metadata: Metadata = {
  title: "NTS Trang Chủ",
  description: "NTS Trang Chủ",
  icons: {
    icon: "/images/logo.png",
  },
};

// HomePage component marked as async (server component)
const HomePage = async () => {
  // Fetch data directly on the server
  const imageSlide = await FetchSlideHome();
  const categorys = await FetchCategory();
  const imageCategory = await FetchImageCategory();
  const memberCompany = await FetchHomeMember();
  const imageHomeMemberBox = await FetchImageHomeMemberBox();
  const companies = await FetchHomeMemberBox();
  const buttonMemberBox = await FetchButtonHomeMemberBox();
  const data = await FetchProjectHomePage();
  const projects = await FetchBlockProjectHomePage();
  const imageProject = await FetchImageBlockProject();
  const banner = await FetchBanner();
  const imagebanner = await FetchImageBanner();
  const contact = await FetchContact();
  const imageContact = await FetchImageContact();
  const phone = await FetchPhoneNumber();

  return (
    <>
      <main className="laptop:pt-[100px] pt-[78px]">
        {/* Slide Home Section */}
        <SlideHome slides={banner} image={imagebanner} />

        {/* About Me Section */}
        <AboutMe imageSlide={imageSlide} categorys={categorys} />

        {/* Categories Section */}
        <Category categorys={categorys} imageCategory={imageCategory} />

        {/* Member Companies Section */}
        <MemberCompanies
          memberCompany={memberCompany}
          companies={companies}
          imageHomeMember={imageHomeMemberBox}
          buttonMemberBox={buttonMemberBox}
        />

        {/* Projects Section */}
        <Project data={data} projects={projects} images={imageProject} />

        {/* Contact Us Section */}
        <ContactUs
          contactHome={contact}
          images={imageContact}
          phoneNumber={phone}
        />

        {/* Floating Action Button */}
        {/* Uncomment below to add floating buttons if needed */}
        {/* <Link href="#" target="_blank">
          <FloatButton
            shape="circle"
            type="primary"
            style={{ bottom: 120, width: 60, height: 60 }}
            icon={<CustomerServiceOutlined />}
          />
        </Link> */}
      </main>
    </>
  );
};

export default HomePage;
