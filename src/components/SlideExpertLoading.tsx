"use client";
import React from "react";

const SlideExpertLoading = () => {
  const items = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-12 gap-4 laptop:max-w-[1024px] desktop:max-w-[1440px] mx-auto mt-8 px-12 overflow-hidden max-h-[330px]">
      {items.map((_, index) => (
        <div
          key={index}
          className="w-full relative col-span-12 mobile:col-span-12 tablet:col-span-6 laptop:col-span-4 desktop:col-span-3 max-h-[330px] min-h-[330px] mx-auto overflow-hidden flex flex-col items-center justify-center bg-gray-300 animate-pulse"
        >
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
          <div className="desktop:px-[32px] laptop:px-[8px] mobile:px-[16px] py-[16px] bg-[#F5F3FF] text-center absolute mobile:top-[70%] tablet:top-[70%] laptop:top-[63%] desktop:top-[230px] left-1/2 transform -translate-x-1/2 w-max min-w-[140px] desktop:max-w-[263px] laptop:max-w-[234px]">
            <h2 className="p-2 bg-gray-200 shadow animate-pulse"></h2>
            <p className="p-2 bg-gray-200 shadow animate-pulse mt-2"></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideExpertLoading;
