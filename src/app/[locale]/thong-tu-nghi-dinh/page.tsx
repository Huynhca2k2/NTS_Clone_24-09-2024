import ContactUs from "@/components/ContactUs";
import CustomContainer from "@/components/CustomContainer";
import IntroduceComponent from "@/components/IntroduceComponent";
import NewsComponent from "@/components/NewsComponent";
import { useState } from "react";
import Image from "next/image";
import { apiService } from "@/services/api.service";
import {
  FetchContact,
  FetchImageContact,
  FetchPhoneNumber,
} from "@/apis/contactHome";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Thông tu - Nghị định",
  description: "NTS Trang Chủ",
};

const ThongTuNghiDinh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const searchData = {
    populate: ["intro.background.image.url"].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  const intro: any = await apiService.get(
    `/api/thong-tu-nghi-dinh?${searchParams}`
  );
  const data = intro.data;
  const category: any = await apiService.get(`/api/custom-category`, {
    type: "thong-tu-nghi-dinh",
  });
  const categoryData = category.data;
  const contact = await FetchContact();
  const imageContact = await FetchImageContact();
  const phone = await FetchPhoneNumber();

  return (
    <div className="laptop:pt-[100px] pt-[78px]">
      <div className="relative w-full h-[18.5%] desktop:min-h-[682px] laptop:min-h-[455px] tablet:min-h-[400px] mobile:min-h-[200px] overflow-hidden">
        <Image
          src={`${process.env.API_URL}${data.attributes.intro.background.image.data.attributes.url}`}
          alt={
            data.attributes.intro.background.alt ||
            "day la hinh anh thong tu nghi dinh"
          }
          fill
          className="object-cover"
        />
      </div>

      <div className="custom-container px-4 laptop:max-w-[1024px] desktop:max-w-[1440px]">
        <IntroduceComponent
          title={data.attributes.intro.title}
          subtitle={data.attributes.intro.subtitle || ""}
          description={data.attributes.intro.description}
        />
        <CustomContainer datas={categoryData} />
      </div>

      <NewsComponent />
      <ContactUs
        contactHome={contact}
        images={imageContact}
        phoneNumber={phone}
      />
    </div>
  );
};

export default ThongTuNghiDinh;
