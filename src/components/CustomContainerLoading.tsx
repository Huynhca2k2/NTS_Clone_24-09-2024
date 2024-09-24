"use client";
import { Button, Skeleton } from "antd";
import React from "react";

export default function CustomContainerLoading() {
  console.log("no da vao day");
  const datas = [
    {
      title: "Category 1",
      slug: "category-1",
      type: "san-pham",
      articles: [
        {
          title: "Article 1",
          description: "Description for article 1",
          slug: "/article-1",
        },
        {
          title: "Article 2",
          description: "Description for article 2",
          slug: "/article-2",
        },
        {
          title: "Article 3",
          description: "Description for article 3",
          slug: "/article-3",
        },
      ],
    },
    {
      title: "Category 1",
      slug: "category-1",
      type: "san-pham",
      articles: [
        {
          title: "Article 1",
          description: "Description for article 1",
          slug: "/article-1",
        },
        {
          title: "Article 2",
          description: "Description for article 2",
          slug: "/article-2",
        },
        {
          title: "Article 3",
          description: "Description for article 3",
          slug: "/article-3",
        },
      ],
    },
    {
      title: "Category 1",
      slug: "category-1",
      type: "san-pham",
      articles: [
        {
          title: "Article 1",
          description: "Description for article 1",
          slug: "/article-1",
        },
        {
          title: "Article 2",
          description: "Description for article 2",
          slug: "/article-2",
        },
        {
          title: "Article 3",
          description: "Description for article 3",
          slug: "/article-3",
        },
      ],
    },
  ];
  console.log("no da vao day");

  return (
    <div className="desktop:px-[120px] mt-[40px] flex flex-col gap-[4rem]">
      {datas.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <div className="text-gray-700 tablet:text-[28px] mobile:text-lg font-bold leading-[44.80px] flex justify-between items-center mb-8">
            <div className="flex items-center capitalize gap-6">
              <div className="p-4 bg-gray-200 w-[400px] rounded shadow animate-pulse"></div>
            </div>
            <div className="w-[120px] hidden tablet:block p-5 bg-gray-200 rounded-[50px] shadow animate-pulse"></div>
          </div>

          {section.articles.map((article: any, articleIndex: number) => (
            <div
              className="text-gray-500 tablet:text-2xl mobile:text-base font-bold cursor-pointer leading-[38.40px] flex items-center justify-between w-full desktop:pt-6 desktop:pb-0 pl-2 tablet:mb-6 mobile:mb-2 border-b-2 border-zinc-200 flex-col overflow-hidden"
              key={articleIndex}
            >
              <div className="flex w-full justify-between items-center">
                <div className="p-3 bg-gray-200 w-[200px] rounded shadow animate-pulse"></div>
                <div className="p-4 bg-gray-200 rounded-full shadow animate-pulse" />
              </div>

              <div
                className={`transform origin-top transition-all desktop:mt-4 w-full overflow-hidden duration-300 ease-in-out `}
              ></div>
            </div>
          ))}

          <div className="w-[120px] tablet:hidden p-5 bg-gray-200 rounded-[50px] shadow animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}
