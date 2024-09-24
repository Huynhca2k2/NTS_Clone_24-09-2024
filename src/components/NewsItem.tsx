"use client";

import { DateTime } from "@/utils/dateTime";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { NewsItemProps } from "./types";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";

const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["NEXT_LOCALE"]);
  return (
    <Link href={`/${cookies.NEXT_LOCALE || "vi"}/${news.slug}`}>
      <div className="relative">
        <div className="flex flex-col items-center justify-center max-h-[280px] laptop:h-[280px] tablet:h-[220px] mobile:min-h-[220px] tablet:min-h-[280px] relative overflow-hidden bg-slate-200">
          <div className="w-full h-full  max-h-[280px] laptop:h-[280px] tablet:h-[220px] mobile:min-h-[220px] tablet:min-h-[280px">
            <Image
              width={300}
              height={200}
              src={
                news?.images
                  ? `${process.env.API_URL}${news.images}`
                  : "/images/cuochop.png"
              }
              alt={news.alt ? news.alt : "tin-tuc-moi-len"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute top-[10%] left-[5%]">
          <span className="text-[18px] p-[10px] time-up font-[300]">
            {news.createdAt
              ? DateTime.getTimeOrDate(new Date(news.createdAt))
              : "N/A"}
          </span>
        </div>
      </div>
      <div className="mt-[24px] mb-[16px]">
        <h3
          title={news.title}
          className="text-[#000] font-[600] laptop:text-[24px] laptop:leading-[38.4px] mobile:text-[18px] mobile:leading-[28.8px] mobile:line-clamp-3 tablet:line-clamp-2 laptop:min-h-[77px] tablet:min-h-[58px]"
        >
          {news.title}
        </h3>
      </div>
      <p
        title={news.description}
        className="text-[#637381] font-[400] leading-[24px] line-clamp-3"
      >
        {news.description}
      </p>
    </Link>
  );
};

export default NewsItem;
