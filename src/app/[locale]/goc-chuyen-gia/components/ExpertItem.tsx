"use client";
import ButtonLeft from "@/components/ButtonLeft";
import ButtonRight from "@/components/ButtonRight";
import { ExpertModel } from "@/models/ExpertModel";
import Image from "next/image";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
interface ExpertItemProps {
  datas: ExpertModel[];
}

const ExpertItem: React.FC<ExpertItemProps> = ({ datas }) => {
  const [currentExpertIndex, setCurrentExpertIndex] = useState(0);
  const expertsSwiperRef = useRef<SwiperType | null>(null);
  //   const [experts, setExperts] = useState<ExpertModel[]>([]);

  const handlePrevExpert = () => {
    if (expertsSwiperRef.current) {
      const newIndex = Math.max(currentExpertIndex - 4, 0);
      expertsSwiperRef.current.slideTo(newIndex);
      setCurrentExpertIndex(newIndex);
    }
  };

  const handleNextExpert = () => {
    if (expertsSwiperRef.current) {
      const maxIndex = datas.length - 4;
      const newIndex = Math.min(currentExpertIndex + 4, maxIndex);
      expertsSwiperRef.current.slideTo(newIndex);
      setCurrentExpertIndex(newIndex);
    }
  };
  return (
    <div className="pb-[50px] tablet:pb-0">
      <div className="flex justify-center items-center laptop:max-w-[1024px] desktop:max-w-[1440px] mx-auto px-4 py-[32px] desktop:py-[32px]">
        <div
          onClick={handlePrevExpert}
          className="w-[50px] h-[50px] mr-4 hidden laptop:block cursor-pointer"
        >
          <ButtonLeft />
        </div>

        <div className="w-full laptop:max-w-[892px] desktop:max-w-[1302px]">
          <Swiper
            spaceBetween={18}
            slidesPerView={4}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            breakpoints={{
              1440: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 3,
              },
              744: {
                slidesPerView: 2,
              },
              360: {
                slidesPerView: 1,
              },
            }}
            onSwiper={(swiper) => {
              expertsSwiperRef.current = swiper;
              setCurrentExpertIndex(swiper.activeIndex);
            }}
          >
            {datas &&
              datas.length > 0 &&
              datas.map((data: any, index) => (
                <SwiperSlide key={index}>
                  <div className="relative mobile:max-w-[480px] mobile:max-h-[330px] tablet:min-h-[330px] bg-slate-200 mobile:min-h-[330px] h-full w-full mx-auto overflow-hidden flex flex-col items-center justify-center">
                    <Image
                      width={273}
                      height={330}
                      src={`${process.env.API_URL}${data.avatar.image.data.attributes.url}`}
                      alt={data.avatar.alt}
                      className="w-full h-auto object-cover"
                    />
                    <div className="desktop:px-[32px] laptop:px-[8px] mobile:px-[16px] py-[16px] bg-[#F5F3FF] text-center absolute mobile:top-[70%] tablet:top-[70%] laptop:top-[63%] desktop:top-[230px] left-1/2 transform -translate-x-1/2 w-max min-w-[140px] desktop:max-w-[263px] laptop:max-w-[234px]">
                      <h3 className="text-[#3B559E] font-semibold line-clamp-1">
                        {data.name}
                      </h3>
                      <span className="text-[12px] text-[#637381] line-clamp-2">
                        {data.position}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div
          onClick={handleNextExpert}
          className="w-[50px] h-[50px] ml-4 hidden laptop:block cursor-pointer"
        >
          <ButtonRight />
        </div>
      </div>
      <div className="flex flex-row  tablet:gap-4 laptop:hidden items-center justify-center">
        <div
          onClick={handlePrevExpert}
          className="w-[50px] h-[50px] mr-4 cursor-pointer"
        >
          <ButtonLeft />
        </div>
        <div
          onClick={handleNextExpert}
          className="w-[50px] h-[50px] ml-4 cursor-pointer"
        >
          <ButtonRight />
        </div>
      </div>
    </div>
  );
};

export default ExpertItem;
