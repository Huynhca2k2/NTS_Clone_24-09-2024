"use client";

import Image from "next/image";
import { Typography, Button, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useRouter, usePathname } from "../routing";
import { SlideType } from "./types";
import { redirect } from "next/navigation";
import { FetchBanner, FetchImageBanner } from "@/apis/bannerHomePage";

const { Title } = Typography;

interface SlideHomeProps {
  slides: SlideType[];
  image: any[];
}

const SlideHome: React.FC<SlideHomeProps> = React.memo(({ slides, image }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slidess, setSlidess] = useState<any[]>(slides);
  const [imageBanner, setImageBanner] = useState<any[]>(image);

  // useEffect(() => {
  //   setSlidess(slides);
  // }, []);

  // const lengthProgress = slides.length;

  // useEffect(() => {
  //   // Fetching intro data from the API
  //   const fetchBanner = async () => {
  //     try {
  //       const fetchedIntroData = await FetchBanner();

  //       setSlidess(fetchedIntroData); // Update the state with fetched data
  //     } catch (error) {
  //       console.error("Error fetching About Us data:", error);
  //     }
  //   };

  //   // Call the function to fetch the data
  //   fetchBanner();
  // }, []);

  // useEffect(() => {
  //   const fetchImageBanner = async () => {
  //     try {
  //       const fetchedImageUrls = await FetchImageBanner(); // Fetch the image URLs

  //       setImageBanner(fetchedImageUrls); // Set the state with the image URLs
  //     } catch (error) {
  //       console.error("Error fetching About Us image data:", error);
  //     }
  //   };

  //   fetchImageBanner(); // Call the function to fetch the data
  // }, []);
  return (
    <div className="relative h-[814px] ">
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect="fade"
        modules={[Autoplay, EffectFade]}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex);
        }}
      >
        {slidess &&
          slidess.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[750px] tablet:h-[800px] desktop:h-[814px] flex justify-center items-center rounded-b-[32px] overflow-hidden">
                <Image
                  priority={index === 0}
                  src={imageBanner[index] || "/images/blue.png"}
                  alt={`Slide ${index + 1}`}
                  className="object-cover object-center"
                  fill
                />
              </div>
              <div className="z-10 pb-[72px] absolute left-[50%] top-[40%] laptop:top-[50%] transform -translate-x-1/2 w-[90%] laptop:w-[846px] -translate-y-1/2 object-cover">
                <div className="w-full gap-[32px] flex flex-col ">
                  <Button className="bg-transparent rounded-[32px] !w-[max-content] !h-auto border-[1px] border-[#fff] text-white px-6 py-3 hover:!bg-transparent">
                    {slide.bannerPreamble}
                  </Button>
                  <Title className="!text-white !font-bold !m-0 !text-[24px] laptop:!text-[48px] !leading-[36px] line-clamp-2 laptop:!leading-[76.8px]">
                    {slide.bannerTitle}
                  </Title>
                  <Title
                    level={4}
                    className="!text-white !m-0 !font-normal !text-[18px] !leading-[28.8px] line-clamp-2"
                  >
                    {slide.bannerDescription}
                  </Title>
                  <Button className="rounded-[32px] font-medium !w-[max-content] !h-auto text-[#3B559E] px-6 py-3 border-[1px] border-[#fff] bg-white">
                    {slide.more || "Xem thêm"}
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="absolute left-[50%] top-[79%] px-8 tablet:px-8 laptop:px-0 transform -translate-x-1/2 laptop:w-[846px] tablet:w-full w-full -translate-y-1/2 object-cover z-[1]">
        <Slider
          className="custom-slider"
          min={0}
          disabled
          max={3}
          value={currentSlide + 1}
          onChange={(value) => setCurrentSlide(value - 1)}
        />
        <div className="flex justify-around items-center">
          {slidess?.map((slide, index) => (
            <Title
              key={index}
              level={4}
              className={`!text-white ${
                currentSlide === index
                  ? "!font-bold"
                  : "!font-normal hidden tablet:block"
              } !m-0 !text-[18px] !leading-[26px]`}
            >
              {slide.bannerPreamble}
            </Title>
          ))}
        </div>
      </div>
    </div>
  );
});

export default SlideHome;
