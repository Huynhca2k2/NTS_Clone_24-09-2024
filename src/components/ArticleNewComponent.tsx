import { ExpertModel } from "@/models/ExpertModel";
import Image from "next/image";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

interface NewsItemProps {
  datas: ExpertModel[];
}

const ArticleNewComponent:React.FC<NewsItemProps> = ({datas}) => {
  return (
    <div className="p-[108px] w-[1440px] gap-[18px]">
      {datas &&
        datas.length > 0 &&
        datas.map((data: any, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex flex-col items-center">
              <Image
                width={273}
                height={330}
                src={`${process.env.API_URL}${data.avatar.image.data.attributes.url}`}
                alt={data.avatar.alt}
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center px-4 py-8 ">
                <div className="flex flex-col justify-center items-center text-center bg-[#F5F3FF] w-[183px] h-[76px]">
                  <h3 className="text-[#3B559E] text-4 leading-6 font-semibold line-clamp-1">
                    {data.name}
                  </h3>
                  <p className="text-[#637381] text-3 leading-5 font-medium line-clamp-2">
                    {data.position}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </div>
  );
};

export default ArticleNewComponent;
