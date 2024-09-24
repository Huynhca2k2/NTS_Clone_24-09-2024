"use client";
import { DateTime } from "@/utils/dateTime";
import { RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArticlesType } from "./types";

interface Props {
  item: ArticlesType;
  type?: "card" | "list";
  showButton?: boolean;
  showDate?: boolean;
  stylesTitle?: React.CSSProperties;
  stylesDescription?: React.CSSProperties;
  styleImage?: React.CSSProperties;
}
const ArticleComponent = (props: Props) => {
  console.log("props", props);
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
    <div className="flex ">
      {type === "card" ? (
        <div className="relative ">
          <div
            style={{
              height: styleImage?.height || "385px",
              width: styleImage?.width || "600px",
              position: "relative",
            }}
          >
            <Image
              fill
              src={item.images ? `${process.env.API_URL}${item.images}` : ""}
              alt={item.alt ? item.alt : "article"}
            />
          </div>

          {showDate && (
            <div className="bg-[#ECECECB2]  w-[88px] h-[34px] justify-center flex items-center text-black text-xs px-2 py-1 absolute top-4 left-4 rounded-full">
              {item.createdAt
                ? DateTime.getTimeOrDate(new Date(item.createdAt))
                : "N/A"}
            </div>
          )}

          <div className="flex flex-col w-[370px] h-[168px] gap-4 my-6 items-start">
            <h2
              className="text-[24px] font-bold line-clamp-2"
              style={stylesTitle}
            >
              {item?.title}
            </h2>
            <p
              className="text-[18px] leading-[28px] font-normal line-clamp-2"
              style={stylesDescription}
            >
              {item?.description}
            </p>

            {showButton && (
              <Link
                href={item.slug || "#"}
                className="inline-block px-4 py-2 border bg-[#3B559E] border-[#3B559E] text-white rounded-full duration-200  hover:text-white"
                style={{ maxWidth: "fit-content" }} // Ensures width fits content
              >
                Xem chi tiết
                <RightOutlined className="text-white ml-2" />
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 h-[263px] bg-white border border-t-2 border-[#DFE4EA] border-t-[#3B559E] mb-4">
          <div className="flex justify-center items-center">
            <div className="w-[293px] h-[263px] flex flex-col justify-center mr-4 gap-2">
              <div className="bg-[#ECECECB2] text-black text-xs px-2 py-1 w-[90px] h-[30px] flex items-center justify-center rounded-[8px]">
                {item.createdAt
                  ? DateTime.getTimeOrDate(new Date(item.createdAt))
                  : "N/A"}
              </div>
              <h2 className="line-clamp-2 text-[16px] font-medium">
                {item.title}
              </h2>
              <p className="line-clamp-3 text-[14px]">{item.description}</p>
              <Link
                className="w-[120px] h-[40px]  gap-2 rounded-[50px] shadow-btn text-[#3B559E] hover:text-[#3B559E] font-medium text-4 leading-6 mt-4 flex justify-center items-center"
                href={item.slug || "#"}
              >
                Đọc ngay
              </Link>
            </div>
            <div className="w-[196px] h-[196px]">
              <Image
                width={196}
                height={196}
                src={item.images ? `${process.env.API_URL}${item.images}` : ""}
                alt="article"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleComponent;
