"use client";
import { ArticleModel } from "@/models/ArticleModel";
import { DateTime } from "@/utils/dateTime";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArticlesType, IntroDataType } from "./types";
import { FetchTinTuc } from "@/apis/tinTuc";
import { Button } from "antd";

interface Props {
  item: ArticlesType;
  type?: "card" | "list";
  showButton?: boolean;
  showDate?: boolean;
  stylesTitle?: React.CSSProperties;
  stylesDescription?: React.CSSProperties;
  styleImage?: React.CSSProperties;
}

interface ArticleProp {
  item: any;
}
const introDataInit = {
  title: "",
  description: "",
  more: "",
  images: "/images/Rectangle_4767.png",
};

const ContentComponent = (props: Props) => {
  const {
    item,
    type = "card",
    showButton = false,
    showDate = false,
    stylesTitle,
    styleImage,
    stylesDescription,
  } = props;

  return (
    <div className="py-[16px]">
      <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
        <div className="tablet:col-span-7 mobile:col-span-12">
          <div className="flex flex-col gap-[16px]">
            <div className="w-fit h-8 px-2 py-1 bg-indigo-50 rounded-md justify-start items-center gap-2 inline-flex">
              <div className="text-[#3B559E] text-base font-normal leading-normal">
                {item.createdAt
                  ? DateTime.getTimeOrDate(new Date(item.createdAt))
                  : "N/A"}
              </div>
            </div>
            <h2 className="laptop:text-[20px] tablet:text-[16px] mobile:text-[18px] text-[#374151] font-bold line-clamp-2">
              {item.title}
            </h2>
            <p className="laptop:text-[18px] tablet:text-[13px] mobile:text-[16px] text-[#8899A8] line-clamp-3">
              {item.description}
            </p>
            <div className="flex justify-start">
              <Link
                className="text-[#3B559E] font-bold border border-[#3B559E] px-[24px] py-[8px] rounded-[50px] btn-view"
                href={item.slug || "/"}
              >
                Đọc ngay
              </Link>
            </div>
          </div>
        </div>
        <div className="tablet:col-span-5 mobile:col-span-12">
          <div className="max-h-[196px] mobile:min-w-[196px] mobile:min-h-[196px] tablet:aspect-square laptop:max-w-[196px] tablet:min-h-[100px] tablet:min-w-[100px] relative mobile:mx-auto">
            <Image
              width={200}
              height={200}
              src={item?.images ? `${process.env.API_URL}${item.images}` : ""}
              alt={item.title ? item.title : "tin-tuc-moi-len"}
              className="w-full h-full max-h-[196px] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentComponent;
