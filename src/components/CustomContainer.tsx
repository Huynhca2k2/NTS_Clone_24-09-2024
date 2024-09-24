"use client";
import { Button, Skeleton } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import IconRight from "./IconRight";
import ArrowRight from "./ArrowRight";
interface categoryData {
  datas: any[];
}
const CustomContainer: React.FC<categoryData> = ({ datas }) => {
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleItemClick = (index: string) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <div className="desktop:px-[120px] mt-[40px] flex flex-col gap-[4rem]">
      {datas.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <div className="text-gray-700 tablet:text-[28px] mobile:text-lg font-bold  leading-[44.80px] flex justify-between items-center mb-8">
            <div className="flex items-center capitalize gap-6">
              <h2>{section.title}</h2>
            </div>

            <Link
              href={`${section.type}/${section.slug}`}
              className="py-2 px-4 flex flexd-row "
            >
              <Button className="mobile:hidden hidden tablet:inline-flex h-12 px-6 py-3 rounded-[50px] border border-[#3B559E] text-[#3B559E] justify-center items-center gap-2 hover:!border-[#28A645] hover:!text-[#28A645] transition-colors ease-linear">
                <div className="text-center  text-base font-bold  leading-normal hover:text-[#28A645] transition-colors ease-linear">
                  Xem tất cả
                </div>
                <IconRight />
              </Button>
            </Link>
          </div>
          {section.articles.map((article: any, articleIndex: number) => (
            <div
              className=" text-gray-500 tablet:text-2xl mobile:text-base font-bold cursor-pointer leading-[38.40px] flex items-center justify-between w-full desktop:pt-6  desktop:pb-0 pl-2 tablet:mb-6 mobile:mb-2 border-b-2 border-zinc-200 flex-col overflow-hidden"
              key={articleIndex}
            >
              <div
                key={articleIndex}
                className="flex w-full justify-between items-center "
                onClick={() =>
                  handleItemClick(`${sectionIndex}-${articleIndex}`)
                }
              >
                <p className="line-clamp-1">{article.title}</p>
                <div
                  className={`transition-transform duration-300  p-4  ${
                    selectedIndex === `${sectionIndex}-${articleIndex}`
                      ? "rotate-90"
                      : ""
                  }`}
                >
                  <ArrowRight />
                </div>
              </div>

              <div
                className={`transform origin-top transition-all desktop:mt-4 w-full overflow-hidden duration-300 ease-in-out ${
                  selectedIndex === `${sectionIndex}-${articleIndex}`
                    ? "max-h-96 pb-4  desktop:pb-4 mt-4"
                    : "max-h-0"
                } `}
              >
                {selectedIndex === `${sectionIndex}-${articleIndex}` && (
                  <>
                    <div className="text-slate-400 tablet:text-xl mobile:text-base font-extralight  tablet:leading-loose mb-4 select-none line-clamp-2">
                      {article?.description || "No description provided"}
                    </div>
                    <a
                      className=" h-10 px-4 py-2 laptop:mb-0 bg-transparent border border-[#3B559E] rounded-[32px] justify-center items-center gap-2.5 inline-flex"
                      href={`${article.slug}`}
                    >
                      <p className="text-center text-[#3B559E] text-base font-bold  leading-normal">
                        Xem thêm
                      </p>
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
          <Link
            href={`/san-pham/${section.slug}`}
            className="py-2 px-4 flex flexd-row "
          >
            <Button className="mt-4 tablet:hidden h-12 px-6 py-3 rounded-[50px] border border-[#3B559E] text-[#3B559E] justify-center items-center gap-2 inline-flex hover:!border-[#28A645] hover:!text-[#28A645] transition-colors ease-linear">
              <div className="text-center  text-base font-bold  leading-normal hover:text-[#28A645] transition-colors ease-linear">
                Xem tất cả
              </div>
              <IconRight />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CustomContainer;
