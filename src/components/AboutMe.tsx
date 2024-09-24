"use client";

import { Button } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import { CategoryType, companyMemberType, IntroDataType } from "./types";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { FetchAboutUs, FetchImageAboutUs } from "@/apis/aboutUs";
import { apiService } from "@/services/api.service";
import { FetchCategory, FetchImageCategory } from "@/apis/category";
import Marquee from "react-fast-marquee";

interface AboutMeProps {
  imageSlide: any[];
  categorys: CategoryType[];
}
const introDataInit = {
  more: "",
  title: "Giới Thiệu Về Chúng Tôi",
  description: "",
  images: [],
  alt: "",
  createdAt: "",
};
const AboutMe: React.FC<AboutMeProps> = ({}) => {
  const [intro, setIntro] = useState<companyMemberType>(introDataInit);

  const [Categorys, setCategorys] = useState<CategoryType[]>([]);

  const [companies, setCompanies] = useState<any[]>([]);

  const [projects, setProjects] = useState<any[]>([]);
  const [imageCompanies, setImageCompanies] = useState<string[]>([]);
  const [imageCategory, setImageCategory] = useState<string[]>([]);
  const [imageSlide, setImageSlide] = useState<string[]>([]);

  const [imageProject, setImageProject] = useState<string[]>([]);

  useEffect(() => {
    const fetchIntroData = async () => {
      try {
        const fetchedIntroData = await FetchAboutUs();
        setIntro(fetchedIntroData);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };

    fetchIntroData();
  }, []);

  useEffect(() => {
    const fetchImageIntroData = async () => {
      try {
        const fetchedImageUrls = await FetchImageAboutUs(); // Fetch the image URLs

        setImageCompanies(fetchedImageUrls); // Set the state with the image URLs
      } catch (error) {
        console.error("Error fetching About Us image data:", error);
      }
    };

    fetchImageIntroData(); // Call the function to fetch the data
  }, []);

  useEffect(() => {
    // Fetching intro data from the API
    const fetchIntroDataCategory = async () => {
      try {
        const fetchedIntroData = await FetchCategory();

        setCategorys(fetchedIntroData); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching intro data:", error);
      }
    };

    // Call the function to fetch the data
    fetchIntroDataCategory();
  }, []); // Make sure dependencies are correct

  useEffect(() => {
    const fetchImageCateGory = async () => {
      try {
        const fetchedImageUrls = await FetchImageCategory(); // Fetch the image URLs

        setImageCategory(fetchedImageUrls); // Set the state with the image URLs
      } catch (error) {
        console.error("Error fetching About Us image data:", error);
      }
    };

    fetchImageCateGory(); // Call the function to fetch the data
  }, []);

  useEffect(() => {
    const fetchImageSlide = async () => {
      try {
        const response: any = await apiService.get(
          "/api/home?populate=SlideBanner.image"
        );

        // const result = await response.json();

        // Adjust this line based on the actual structure of the response
        const imageUrls = response.data.attributes.SlideBanner;

        const url = imageUrls.map((imageUrl: any) => {
          const link = `${process.env.API_URL}${imageUrl.image.data[0].attributes.url}`;
          return link;
        });

        setImageSlide(url);
      } catch (error) {
        console.error("Error fetching image slide data:", error);
      }
    };

    fetchImageSlide();
  }, []);

  return (
    <div className="custom-container laptop:max-w-[1024px] desktop:max-w-[1440px] mx-auto ">
      <div className="tablet:mt-[80px] mt-[40px] px-4">
        <Marquee speed={100} gradient={false} loop={0} autoFill={true}>
          {imageSlide.map((img, index) => (
            <div
              key={index}
              className="h-[100px] flex justify-center items-center px-6"
            >
              <Image
                height={100}
                width={200}
                src={img}
                alt={`Slide ${index}`}
                className="h-auto w-[200px] object-cover"
              />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="mt-[80px] flex flex-col laptop:flex-row gap-12 px-[1rem] items-center">
        <div className="flex flex-row w-full laptop:w-1/2 gap-6 h-max">
          <div className="flex flex-row items-center w-1/2">
            <Image
              priority={true}
              width={200}
              height={300}
              className="rounded-2xl w-full h-[200px] tablet:h-[320px] desktop:h-[400px] object-cover"
              src={imageCompanies[1] || "/images/rectangle4768.png"}
              alt="Image 1 description"
            />
          </div>
          <div className="flex flex-col gap-8 w-1/2">
            <Image
              priority={true}
              width={200}
              height={300}
              className="rounded-2xl w-full h-[200px] tablet:h-[320px] desktop:h-[400px] object-cover"
              src={imageCompanies[0] || "/images/rectangle4768.png"}
              alt="Image 2 description"
            />

            <Image
              priority={true}
              width={200}
              height={300}
              className="rounded-2xl w-full h-[200px] tablet:h-[320px] desktop:h-[400px] object-cover"
              src={imageCompanies[2] || "/images/rectangle4768.png"}
              alt="Image 3 description"
            />
          </div>
        </div>

        <div className="w-full laptop:w-1/2 flex flex-col laptop:items-start items-center gap-4 tablet:gap-6 justify-center h-max">
          <h1 className="font-semibold text-[#3B559E] text-[28px] tablet:text-[40px] desktop:text-[48px] tablet:leading-[76.8px]">
            {introDataInit.title}
          </h1>
          <h4 className="font-medium text-[#111928] laptop:text-start text-center text-base tablet:text-2xl desktop:leading-[38.4px] w-full">
            {intro.description}
          </h4>
          <Button className="bg-[#3B559E] rounded-[50px] font-medium text-base leading-6 !w-[max-content] !h-auto text-white px-6 py-3">
            {intro.more || "Về Chúng Tôi"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
