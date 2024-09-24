import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArticlesType } from "./types";
import { apiService } from "@/services/api.service";
import { DateTime } from "@/utils/dateTime";
import NewsItem from "./NewsItem";

const NewsComponent = async () => {
  const newsItems: any = await apiService.get(
    `/api/find-article?type=bai-viet-tin-tuc`
  );
  return (
    <div className="bg-[#F3F6FE] py-[80px] mt-10">
      <div className="laptop:max-w-[1024px] desktop:max-w-[1440px] mx-auto px-4">
        <div className="inline-flex justify-between items-center w-full py-2 pb-[40px]">
          <p className="text-black text-[32px] font-bold capitalize leading-[51.20px]">
            Tin tức
          </p>
          <Link
            className="text-center text-[#3B559E] text-base font-medium leading-normal inline-flex gap-2.5  hover:text-[#28A645] transition-all ease-linear"
            href="/vi/tin-tuc"
          >
            Tới trang tin tức{" "}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5998 11.3996L13.8373 3.52461C13.4998 3.18711 12.9748 3.18711 12.6373 3.52461C12.2998 3.86211 12.2998 4.38711 12.6373 4.72461L18.9373 11.1371H2.9998C2.5498 11.1371 2.1748 11.5121 2.1748 11.9621C2.1748 12.4121 2.5498 12.8246 2.9998 12.8246H19.0123L12.6373 19.3121C12.2998 19.6496 12.2998 20.1746 12.6373 20.5121C12.7873 20.6621 13.0123 20.7371 13.2373 20.7371C13.4623 20.7371 13.6873 20.6621 13.8373 20.4746L21.5998 12.5996C21.9373 12.2621 21.9373 11.7371 21.5998 11.3996Z"
                fill="currentColor"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-8 overflow-hidden">
          {newsItems &&
            newsItems.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="col-span-12 tablet:col-span-6 laptop:col-span-6 desktop:col-span-4 mb-[40px] max-w-[460px] mx-auto w-full"
                >
                  <NewsItem news={item} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
