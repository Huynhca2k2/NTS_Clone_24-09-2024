"use client";

import { useEffect, useState } from "react";
import ArticleComponent from "@/components/ArticleComponent";
import { apiService } from "@/services/api.service";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { Pagination, PaginationProps } from "antd";
import NewsItem from "@/components/NewsItem";
import IntroduceComponent from "@/components/IntroduceComponent";
import ContactUs from "@/components/ContactUs";
import {
  FetchContact,
  FetchImageContact,
  FetchPhoneNumber,
} from "@/apis/contactHome";

const Page = ({ params }: any) => {
  const [cookies] = useCookies(["NEXT_LOCALE"]);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [contact, setContact] = useState<any>(null);
  const [imageContact, setImageContact] = useState<any>(null);
  const [phone, setPhone] = useState<any>(null);

  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response: any = await apiService.get(
          `/api/find-category/${params.slug}`,
          {
            page,
            pageSize,
          }
        );
        setCategoryData(response.data);
        setTotalArticles(response.meta.pagination.total);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [params.slug, page, pageSize]);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactData = await FetchContact();
        const imageContactData = await FetchImageContact();
        const phoneData = await FetchPhoneNumber();

        setContact(contactData);
        setImageContact(imageContactData);
        setPhone(phoneData);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className=" laptop:pt-[100px] pt-[78px]">
      <div className="laptop:max-w-[1024px] desktop:max-w-[1440px] mx-auto px-4">
        <IntroduceComponent
          subtitle="Sản Phẩm"
          title={categoryData?.title}
          description={categoryData?.description}
        />
        <div className="grid grid-cols-12 gap-8 overflow-hidden">
          {categoryData?.articles.length > 0 ? (
            categoryData?.articles.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="col-span-12 tablet:col-span-6 laptop:col-span-6 desktop:col-span-4 mb-[40px] max-w-[460px] mx-auto w-full"
                >
                  <NewsItem news={item} />
                </div>
              );
            })
          ) : (
            <div className="col-span-12">
              <p className="text-center text-black text-[32px] font-bold">
                Chưa có bài viết mới !!!
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center py-10">
          <Pagination
            current={page}
            total={totalArticles}
            pageSize={pageSize}
            onChange={onChange}
          />
        </div>
      </div>

      <ContactUs
        contactHome={contact}
        images={imageContact}
        phoneNumber={phone}
      />
    </div>
  );
};

export default Page;
