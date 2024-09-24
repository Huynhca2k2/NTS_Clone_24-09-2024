"use client";
import React, { useState } from "react";
import { Divider, Layout } from "antd";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import "../styles/globals.css";
import { on } from "events";
import ArrowRight from "./ArrowRight";
import IconArrowSub from "./IconArrowSub";
import { usePathname } from "next/navigation";

interface SubUrlItem {
  title?: string;
  slug?: string;
}

interface UrlItem {
  title?: string;
  slug?: string;
  description?: string;
  articles?: SubUrlItem[];
}

interface Props {
  lable?: string;
  title?: string;
  language?: string;
  urls?: UrlItem[];
  slug: string;
  onclick?: () => void;
}

const ChildrenHeaderComponent: React.FC<Props> = (props: Props) => {
  const { lable, title, slug, language, urls = [], onclick } = props;
  const { Sider, Content } = Layout;

  // const getNumColumns = () => {
  //   if (window.innerWidth >= 1024) return 3;
  //   return 1;
  // };

  const divideArray = (array: UrlItem[], numColumns: number) => {
    const result: UrlItem[][] = Array.from({ length: numColumns }, () => []);
    array.forEach((item, index) => {
      result[index % numColumns].push(item);
    });
    return result;
  };

  const sortedUrls = [...urls].sort((a, b) => {
    if (a.description && !b.description) return -1;
    if (!a.description && b.description) return 1;
    return 0;
  });

  // const columns = divideArray(sortedUrls, getNumColumns());

  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (event: React.MouseEvent, label: string) => {
    event.stopPropagation(); // Prevent event from bubbling up
    setActiveItem((prev) => (prev === label ? null : label));
  };

  const pathname = usePathname();
  return (
    <div className="flex flex-row h-full gap-[32px]">
      <div className="lg:block hidden !bg-white h-full max-w-[300px]">
        <div className="flex flex-col gap-[32px] ">
          <h2 className="text-[40px] font-bold font-sans text-[#3b559e] block pr-[10px]">
            {lable}
          </h2>
          <p className="line-clamp-3 text-[#637381] leading-6">{title}</p>
          <button className="bg-[#3B559E] text-white w-[126px] h-[48px] leading-[24px] rounded-[50px]">
            Xem thêm
          </button>
        </div>
      </div>
      <div className="">
        <Divider
          type="vertical"
          className="h-full border-[2px] mx-0 rounded-[2px] border-[#28A645]"
        />
      </div>

      <div className="w-full">
        <div className="flex flex-col flex-wrap lg:flex-row w-full h-full gap-[30px]">
          {urls.map((item, index) => {
            return (
              <div
                className="w-[calc(33.333%-20px)] flex flex-col gap-[1rem]"
                key={index}
              >
                <Link
                  href={
                    pathname === "/" || pathname === "/en"
                      ? slug === "/ve-chung-toi"
                        ? `${language}/${item.slug}`
                        : `${language}${slug}/${item.slug}`
                      : `${item.slug}`
                  }
                  className="flex h-[118px] flex-col justify-between"
                >
                  <div className="flex flex-row items-center justify-between h-[36px]">
                    <div className="text-[18px] h-full text-black font-semibold hover:text-[#28a645]">
                      {item.title}
                    </div>
                    <div>
                      <ArrowRight />
                    </div>
                  </div>
                  <div className="text-slate-400 text-[15px] flex-1 font-normal leading-[22px] pr-[18px] mt-4 line-clamp-3">
                    {item.description}
                  </div>
                </Link>
                {item.articles?.map((subItem, index) => {
                  return (
                    <Link
                      href={subItem.slug ? `/${language}/${subItem.slug}` : "/"}
                      key={index}
                      className="text-black  hover:text-[#28A645] transition-colors ease-linear text-base font-semibold leading-normal w-full"
                    >
                      <div className="flex flex-row items-center justify-between">
                        <div className="!line-clamp-1">{subItem.title}</div>
                        <div>
                          <IconArrowSub />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChildrenHeaderComponent;
