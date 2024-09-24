import { DateTime } from "@/utils/dateTime";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NewsItemProps } from "./types";

const NewsPro: React.FC<NewsItemProps> = ({ news }) => {
  return (
    <div className="laptop:min-h-[760px] laptop:h-[760px] tablet:min-h-[686px] tablet:h-[686px] mobile:min-h-[670px] mobile:h-[670px]">
      <div className="py-[16px] relative overflow-hidden desktop:h-full min-h-[400px] max-h-[400px] rounded-2xl desktop:rounded-none">
        <Image
          width={450}
          height={300}
          src={news?.images ? `${process.env.API_URL}${news.images}` : ""}
          alt={news.alt ? news.alt : "tin-tuc-moi-len"}
          className="w-full h-full min-h-[400px] object-cover rounded-2xl desktop:rounded-none"
        />
      </div>
      <h2 className="desktop:text-[40px] mt-4 laptop:text-[28px] mobile:text-[18px] laptop:leading-[56px] mobile:leading-[25.2px] tablet:text-[#374151] mobile:text-black font-bold line-clamp-2">
        {news.title}
      </h2>
      <p className="tablet:my-[24px] mobile:my-4 desktop:text-[24px] laptop:text-[20px] mobile:text-base tablet:text-[#8899A8] laptop:leading-[38.4px] mobile:text-black line-clamp-5">
        {news.description}
      </p>
      <button className="text-[#3B559E] border border-[#3B559E] font-bold bg-transparent px-[24px] py-[12px] flex items-center rounded-[50px] absolute bottom-1">
        <Link className="mr-[10px]" href={news.slug || "/"}>
          Xem chi tiết
        </Link>
      </button>
    </div>
  );
};

export default NewsPro;
