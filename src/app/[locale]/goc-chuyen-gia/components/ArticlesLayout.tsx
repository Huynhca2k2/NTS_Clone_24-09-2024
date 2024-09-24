"use client";
import ButtonLeft from "@/components/ButtonLeft";
import ButtonRight from "@/components/ButtonRight";
import ContentComponent from "@/components/ContentComponent";
import NewsItem from "@/components/NewsItem";
import NewsPro from "@/components/NewsPro";
import { ArticlesType } from "@/components/types";
import { apiService } from "@/services/api.service";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

interface ArticleItemProps {
  datas: ArticlesType[];
}

const ArticlesLayout: React.FC<ArticleItemProps> = ({ datas }) => {
 const outstandingArticles = datas.filter(
   (article) => article.outstanding === true
 );
  const articlesSwiperRef = useRef<SwiperType | null>(null);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const latestArticles = outstandingArticles.slice(-3);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [articlesToShow, setArticlesToShow] = useState(6);
  const [articleByTag, setArticleByTag] = useState<ArticlesType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [subCategorys, setSubCategorys] = useState<any[]>([]);

  const loadMoreArticles = () => {
    setArticlesToShow((prev) => prev + 6);
  };

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

  useEffect(() => {
    getSubCategoeyType();
  }, []);

  const getSubCategoeyType = async () => {
    const subCategorys: any[] = await apiService.get(
      `/api/sub-categories-by-type?type=goc-chuyen-gia`
    );
    setSubCategorys(subCategorys);
    if (subCategorys.length > 0) {
      setActiveIndex(0);
      await getArticleByTag(subCategorys[0].id); 
    }
  };

  useEffect(() => {
    if (subCategorys.length > 0) {
      getArticleByTag(subCategorys[activeIndex].id);
    }
  }, [activeIndex, subCategorys]);

  const getArticleByTag = async (subCategoryId: string) => {
    const article: ArticlesType[] = await apiService.get(
      `api/articles-by-sub-category-id?id=${subCategoryId}`
    );
    setArticleByTag(article);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredArticles =
    searchQuery === ""
      ? activeIndex === -1
        ? datas
        : articleByTag
      : (activeIndex === -1 ? datas : articleByTag).filter((article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
 
  return (
    <div className="laptop:max-w-[1024px] desktop:max-w-[1440px] mx-auto px-4 pb-[32px] desktop:pb-[50px]">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 tablet:col-span-6">
          <p className="text-[35px] font-bold">Góc chuyên gia</p>
          <Swiper
            spaceBetween={18}
            slidesPerView={1}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            onSwiper={(swiper) => {
              articlesSwiperRef.current = swiper;
              setCurrentArticleIndex(swiper.activeIndex);
            }}
          >
            {latestArticles.map((article, index) => (
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
          <div className="mt-[52px]">
            {datas.slice(-3).map((article, index) => (
              <ContentComponent item={article} key={index} type="list" />
            ))}
          </div>
        </div>
      </div>
      <Divider className="my-[40px]" />

      <div className="flex flex-col items-center w-full">
        <div className="flex tablet:flex-row mobile:flex-col w-full justify-between gap-4">
          <p className="text-[35px] font-bold">Tất cả tin tức</p>
          <div className="relative flex items-center">
            <input
              value={searchQuery}
              onChange={handleSearch}
              type="text"
              placeholder="Nhập từ khóa tìm kiếm"
              className="focus:outline-none laptop:p-[24px] tablet:pr-[40px] laptop:pr-[68px] mobile:px-[24px] mobile:py-[3px] mobile:w-full tablet:w-fit rounded-[56px] border border-[#DFE4EA] bg-[#FFFFFF] placeholder:font-[300] placeholder:italic placeholder:text-[#8899A8]"
            />
            <Button className="w-[56px] h-[56px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[2%] top-[10px] mobile:hidden laptop:flex">
              <SearchOutlined className="text-[24px] text-white" />
            </Button>
            <Button className="w-[32px] h-[32px] bg-[#3B559E] mx-0 flex justify-center items-center rounded-[50px] absolute right-[0px] mobile:top-[0px] tablet:top-[10px] laptop:top-0 mobile:flex laptop:hidden">
              <SearchOutlined className="text-white" />
            </Button>
          </div>
        </div>

        <div className="flex gap-4 flex-row items-center flex-wrap justify-start w-full py-[50px]">
          {subCategorys.map((subCategory, index) => (
            <button
              key={index}
              className={`flex justify-between items-center h-9 px-[10px] py-2 border rounded-full duration-200
            ${
              activeIndex === index
                ? "bg-[#3B559E] text-white"
                : "bg-white text-[#3B559E] border-[#3B559E]"
            }
          `}
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex items-center gap-1">
                <p
                  className={`text-[12px] leading-5 font-medium ${
                    activeIndex === index ? "text-[#fff]" : "text-[#3B559E]"
                  }`}
                >
                  {subCategory.nameSubCategory}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8 overflow-hidden w-full">
          {filteredArticles.length === 0 ? (
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
        {articlesToShow < datas.length && (
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

export default ArticlesLayout;
