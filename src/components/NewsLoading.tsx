"use client";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Layout } from "antd";
import React from "react";
import Image from "next/image";

const NewsLoading: React.FC = () => {
  const articles = [1, 2, 3];

  const listNews = [1, 2, 3, 4, 5, 6];
  return (
    <div className="laptop:max-w-[1024px] desktop:max-w-[1440px] mx-auto px-4 py-[32px] desktop:py-[50px]">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 tablet:col-span-6">
          <p className="font-bold h-[32px] w-[180px] bg-gray-200 shadow animate-pulse"></p>
          <div className="laptop:min-h-[760px] laptop:h-[760px] tablet:min-h-[686px] tablet:h-[686px] mobile:min-h-[670px] mobile:h-[670px]">
            <div className="py-[16px] relative overflow-hidden desktop:h-full min-h-[400px] max-h-[400px] rounded-2xl desktop:rounded-none">
              <div className="w-auto h-full min-h-[400px] object-cover rounded-2xl desktop:rounded-none bg-gray-200 shadow animate-pulse" />
            </div>
            <h2 className="p-5 bg-gray-200 shadow animate-pulse desktop:text-[40px] mt-4 laptop:text-[28px] mobile:text-[18px] laptop:leading-[56px] mobile:leading-[25.2px]"></h2>
            <p className="p-2 bg-gray-200 shadow animate-pulse tablet:my-[24px] mobile:my-4 desktop:text-[24px] laptop:text-[20px] mobile:text-base"></p>
            <p className="p-2 bg-gray-200 shadow animate-pulse tablet:my-[24px] mobile:my-4 desktop:text-[24px] laptop:text-[20px] mobile:text-base w-[95%]"></p>
            <p className="p-2 bg-gray-200 shadow animate-pulse tablet:my-[24px] mobile:my-4 desktop:text-[24px] laptop:text-[20px] mobile:text-base"></p>
            <p className="p-2 bg-gray-200 shadow animate-pulse tablet:my-[24px] mobile:my-4 desktop:text-[24px] laptop:text-[20px] mobile:text-base w-[90%]"></p>
            <button className=" bg-gray-200 shadow animate-pulse w-[120px] h-[40px] font-bold bg-transparent flex items-center rounded-[50px] "></button>
          </div>
          <div className="flex flex-row gap-4 mt-6">
            <div className="p-6 bg-gray-200 rounded-full shadow animate-pulse" />
            <div className="p-6 bg-gray-200 rounded-full shadow animate-pulse" />
          </div>
        </div>

        <div className="col-span-12 tablet:col-span-6 mt-[60px] tablet:mt-0">
          <p className="font-bold h-[32px] w-[180px] bg-gray-200 shadow animate-pulse"></p>
          <div>
            {articles.map((_, index) => {
              return (
                <div className="py-[16px]" key={index}>
                  <div className="p-[24px] grid grid-cols-12 gap-4 items-center box-tin-tuc-noi-bat">
                    <div className="tablet:col-span-7 mobile:col-span-12">
                      <div className="flex flex-col gap-[16px]">
                        <div className="h-6 px-2 py-1 w-[120px] animate-pulse bg-indigo-100 rounded-md justify-start items-center gap-2 inline-flex">
                          <div className=""></div>
                        </div>
                        <h2 className="p-4 bg-gray-200 shadow animate-pulse"></h2>
                        <p className="p-2 bg-gray-200 shadow animate-pulse"></p>
                        <p className="p-2 bg-gray-200 shadow animate-pulse w-[95%]"></p>
                        <div className="bg-gray-200 rounded-full shadow animate-pulse w-[120px] h-[32px]"></div>
                      </div>
                    </div>
                    <div className="tablet:col-span-5 mobile:col-span-12">
                      <div className="max-h-[196px] mobile:min-w-[196px] flex items-center justify-center mobile:min-h-[196px] tablet:aspect-square laptop:max-w-[196px] tablet:min-h-[100px] tablet:min-w-[100px] relative mobile:mx-auto bg-gray-300 animate-pulse">
                        <svg
                          className="w-10 h-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Divider className="my-[40px]" />
      <div className="flex flex-col items-center w-full">
        <div className="flex tablet:flex-row mobile:flex-col w-full justify-between gap-4">
          <p className="text-[35px] font-bold">Tất cả tin tức</p>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm"
              className="focus:outline-none laptop:p-[24px] tablet:pr-[40px] laptop:pr-[68px] mobile:px-[24px]  mobile:py-[3px] mobile:w-full tablet:w-fit rounded-[56px] border border-[#DFE4EA] bg-[#FFFFFF] placeholder:font-[300] placeholder:italic placeholder:text-[#8899A8]"
            />
            <Button className="w-[56px] h-[56px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[2%] top-[10px] mobile:hidden laptop:flex">
              <SearchOutlined className="text-[24px] text-white" />
            </Button>
            <Button className="w-[32px] h-[32px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[0px] mobile:top-[0px] tablet:top-[10px] laptop:top-0 mobile:flex laptop:hidden">
              <SearchOutlined className=" text-white" />
            </Button>
          </div>
        </div>

        <div className="flex gap-4 flex-row items-center flex-wrap justify-start w-full py-[50px]">
          <div className="bg-gray-200 rounded-full shadow animate-pulse w-[100px] h-[32px]"></div>
          <div className="bg-gray-200 rounded-full shadow animate-pulse w-[100px] h-[32px]"></div>
          <div className="bg-gray-200 rounded-full shadow animate-pulse w-[100px] h-[32px]"></div>
        </div>

        <div className="grid grid-cols-12 gap-8 overflow-hidden w-full">
          {listNews.map((_, index) => (
            <div
              key={index}
              className="col-span-12 tablet:col-span-6 laptop:col-span-6 desktop:col-span-4 mb-[40px] max-w-[460px] mx-auto w-full"
            >
              <div>
                <div className="relative">
                  <div className="flex flex-col items-center justify-center max-h-[280px] laptop:h-[280px] tablet:h-[220px] mobile:min-h-[220px] tablet:min-h-[280px] relative overflow-hidden ">
                    <div className="w-full h-full flex items-center justify-center max-h-[280px] bg-gray-300 animate-pulse laptop:h-[280px] tablet:h-[220px] mobile:min-h-[220px] tablet:min-h-[280px">
                      <svg
                        className="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-[10%] left-[5%]">
                    <span className="text-[18px] px-[50px] animate-pulse p-[10px] time-up font-[300]"></span>
                  </div>
                </div>
                <div className="mt-[24px] mb-[16px]">
                  <h2 className="p-5 bg-gray-200 shadow animate-pulse desktop:text-[40px] mt-4 laptop:text-[28px] mobile:text-[18px] laptop:leading-[56px] mobile:leading-[25.2px] w-[90%]"></h2>
                </div>
                <p className="p-2 bg-gray-200 shadow animate-pulse"></p>
                <p className="p-2 bg-gray-200 shadow animate-pulse w-[95%] mt-4"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsLoading;
