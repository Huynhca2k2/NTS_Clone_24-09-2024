"use client";
import { FetchTinTuc } from "@/apis/tinTuc";
import { LeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import ArticleComponent from "./ArticleComponent";
import ContentComponent from "./ContentComponent";
import { ArticlesType } from "./types";
import { apiService } from "@/services/api.service";
import NewsItem from "./NewsItem";
import NewsPro from "./NewsPro";
import ButtonLeft from "./ButtonLeft";
import ButtonRight from "./ButtonRight";

interface Category {
  icon: JSX.Element;
  color?: string;
  label: string;
  key: string;
}
interface tintucProp {
  articles: ArticlesType[];
}

const News: React.FC<tintucProp> = ({ articles }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [articleByTag, setArticleByTag] = useState<ArticlesType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const Category = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M5 2a1 1 0 0 1 1 1v2.4a2.4 2.4 0 0 1 1.2.35V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.4a2.4 2.4 0 0 1 1.2-.35V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 7a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7zM4 9v10h16V9H4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "Xử lý nước",
      key: "xu-ly-nuoc",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
          />
        </svg>
      ),
      label: "Thiêt kế điện",
      key: "thiet-ke-dien",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3.75V5.25M12 18.75V20.25M16.25 5.783l1.045-1.805m-5.15 15.156-1.045 1.805M20.25 12h1.5M2.25 12h1.5M18.217 16.25l-1.805 1.045m-7.883-7.883-1.805-1.045M5.783 7.75 4.738 5.945m15.156 5.15 1.805 1.045M5.783 16.25l-1.805-1.045M12 8.25A3.75 3.75 0 1 0 12 15a3.75 3.75 0 0 0 0-7.5z"
          />
        </svg>
      ),
      label: "Khác",
      key: "khac",
    },

    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 21H4.5A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3h7.243a1.5 1.5 0 0 1 1.06.44l5.257 5.257a1.5 1.5 0 0 1 .44 1.06V19.5a1.5 1.5 0 0 1-1.5 1.5z"
          />
        </svg>
      ),
      label: "Thông tư - Nghị định",
      key: "thong-tu-nghi-dinh",
    },
  ];

  useEffect(() => {
    getArticleByTag();
  }, [activeIndex]);

  const getArticleByTag = async () => {
    const article: ArticlesType[] = await apiService.get(
      `/api/find-article-by-type-and-tag?type=bai-viet-tin-tuc&tag=${Category[activeIndex].key}`
    );
    setArticleByTag(article);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredArticles =
    searchTerm === ""
      ? Category[activeIndex].key === "khac"
        ? articles
        : articleByTag
      : (Category[activeIndex].key === "khac" ? articles : articleByTag).filter(
          (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
  const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    lineHeight: "28px",
    fontWeight: "bold",
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "normal",
  };

  const initialArticlesToShow = 3;
  const [articlesToShow, setArticlesToShow] = useState(initialArticlesToShow);
  const expertsSwiperRef = useRef<SwiperType | null>(null);
  const articlesSwiperRef = useRef<SwiperType | null>(null);
  const [currentExpertIndex, setCurrentExpertIndex] = useState(0);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const latestArticles = articles.slice(-3);

  //   if (expertsSwiperRef.current) {
  //     const newIndex = Math.max(currentExpertIndex - 4, 0);
  //     expertsSwiperRef.current.slideTo(newIndex);
  //     setCurrentExpertIndex(newIndex);
  //   }
  // };

  // const handleNextExpert = () => {
  //   if (expertsSwiperRef.current) {
  //     const maxIndex = experts.length - 4;
  //     const newIndex = Math.min(currentExpertIndex + 4, maxIndex);
  //     expertsSwiperRef.current.slideTo(newIndex);
  //     setCurrentExpertIndex(newIndex);
  //   }
  // };

  const handlePrevArticles = () => {
    if (articlesSwiperRef.current) {
      const newIndex = Math.max(currentArticleIndex - 1, 0);
      articlesSwiperRef.current.slideTo(newIndex);
      setCurrentArticleIndex(newIndex);
    }
  };

  const handleNextArticles = () => {
    if (articlesSwiperRef.current) {
      const maxIndex = latestArticles.length - 1;
      const newIndex = Math.min(currentArticleIndex + 1, maxIndex);
      articlesSwiperRef.current.slideTo(newIndex);
      setCurrentArticleIndex(newIndex);
    }
  };

  const loadMoreArticles = () => {
    setArticlesToShow((prev) => prev + 3);
  };

  return (
    <div className="laptop:max-w-[1024px] desktop:max-w-[1440px] mx-auto px-4 py-[32px] desktop:py-[50px]">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 tablet:col-span-6">
          <p className="font-bold text-[32px]">Tin nổi bật</p>
          <Swiper
            spaceBetween={18}
            slidesPerView={1}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            onSwiper={(swiper) => {
              articlesSwiperRef.current = swiper;
              setCurrentArticleIndex(swiper.activeIndex);
            }}
          >
            {articles.map((article, index) => (
              <SwiperSlide key={index}>
                <NewsPro news={article} />
              </SwiperSlide>
            ))}

            <div className="py-[24px] flex gap-[20px]">
              <div
                onClick={handlePrevArticles}
                className="w-[46px] h-[46px] cursor-pointer"
              >
                <ButtonLeft />
              </div>
              <div
                onClick={handleNextArticles}
                className="w-[46px] h-[46px] cursor-pointer"
              >
                <ButtonRight />
              </div>
            </div>
          </Swiper>
        </div>
        <div className="col-span-12 tablet:col-span-6">
          <p className="text-[24px] font-bold text-[#374151]">Tin mới lên</p>
          <div>
            {articles.slice(-3).map((article, index) => {
              return (
                <ContentComponent item={article} key={index} type="list" />
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
              value={searchTerm}
              onChange={handleSearch}
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
          {Category.map((category, index) => (
            <button
              key={index}
              className={`flex justify-between items-center h-9 px-[10px] py-2 border rounded-full duration-200
            ${
              activeIndex === index
                ? "bg-[#3B559E] text-white"
                : "bg-white text-[#3B559E] border-[#3B559E]"
            }
          `}
              onClick={() => setActiveIndex(index)} // Set active button index on click
              //onClick={() => handleChangeNews(index, category.key)}
            >
              <div className="flex items-center gap-1">
                <div className="flex justify-center items-center">
                  {React.cloneElement(category.icon, {
                    style: {
                      color: activeIndex === index ? "#fff" : "#3B559E",
                    },
                  })}
                </div>
                <p
                  className={`text-[12px] leading-5 font-medium ${
                    activeIndex === index ? "text-[#fff]" : "text-[#3B559E]"
                  }`}
                >
                  {category.label}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8 overflow-hidden w-full">
          {filteredArticles && filteredArticles.length === 0 ? (
            <div className="col-span-12">
              <p className="text-center text-black text-[32px] font-bold">
                Không có bài viết phù hợp
              </p>
            </div>
          ) : (
            filteredArticles.slice(0, articlesToShow).map((article, index) => (
              <div
                key={index}
                className="col-span-12 tablet:col-span-6 laptop:col-span-6 desktop:col-span-4 mb-[40px] max-w-[460px] mx-auto w-full"
              >
                <NewsItem news={article} />
              </div>
            ))
          )}
        </div>
        {articlesToShow < articles.length && (
          <div className="flex justify-center items-center w-full mb-10 ">
            <button
              className="inline-block px-4 py-2 border border-[#3B559E] text-[#3B559E] rounded-full hover:text-[#3B559E] duration-200"
              onClick={loadMoreArticles}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
