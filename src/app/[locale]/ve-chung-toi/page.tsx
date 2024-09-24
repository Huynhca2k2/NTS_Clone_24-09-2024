"use server";

import {
  FetchContact,
  FetchImageContact,
  FetchPhoneNumber,
} from "@/apis/contactHome";
import ContactUs from "@/components/ContactUs";
import NewsComponent from "@/components/NewsComponent";
import { ContactType, phone } from "@/components/types";
import { apiService } from "@/services/api.service";
import Image from "next/image";
import React from "react";

const AboutUs = async () => {
  const contact = await FetchContact();
  const imageContact = await FetchImageContact();
  const phone = await FetchPhoneNumber();

  const searchData = {
    populate: [
      "logo.image.url",
      "imageBanner.image.url",
      "categorys",
    ].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  const aboutUs: any = await apiService.get(`/api/about-us?${searchParams}`);
  const aboutUses = aboutUs.data.attributes;


  const groupedCategories = {
    "tong-thau": aboutUses.categorys.filter(
      (item: any) => item.type === "tong-thau"
    ),
    "doi-tac-nuoc-ngoai": aboutUses.categorys.filter(
      (item: any) => item.type === "doi-tac-nuoc-ngoai"
    ),
    "chu-dau-tu-nuoc-ngoai": aboutUses.categorys.filter(
      (item: any) => item.type === "chu-dau-tu-nuoc-ngoai"
    ),
    "cong-ty-va-tap-doan": aboutUses.categorys.filter(
      (item: any) => item.type === "cong-ty-va-tap-doan"
    ),
  };

  return (
    <div className="laptop:pt-[100px] pt-[78px]">
      <div className="custom-container px-4 tablet:px-[120px] laptop:max-w-[1024px] desktop:max-w-[1440px]">
        <div className="mt-8 laptop:mt-[80px] flex flex-col gap-8 laptop:gap-[80px] items-center">
          <div>
            <Image
              width={500}
              height={100}
              src={`${process.env.API_URL}${aboutUses.logo.image.data.attributes.url}`}
              alt={aboutUses.logo.alt}
              className="laptop:w-[653px] tablet:w-[357px] mobile:w-[216px] h-auto object-cover"
            />
          </div>
          <div className="text-base tablet:text-[20px] font-medium leading-[25.6px] tablet:leading-8 text-black ">
            <p>{aboutUses.description}</p>
          </div>
          <div className="w-full">
            <Image
              width={1000}
              height={500}
              className="w-full laptop:h-[590px] tablet:h-[324px] h-[192px] object-center object-cover tablet:rounded-[32px]"
              src={`${process.env.API_URL}${aboutUses.imageBanner.image.data.attributes.url}`}
              alt={aboutUses.imageBanner.alt}
            />
          </div>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-[40px] overflow-hidden w-full">
            {groupedCategories["tong-thau"].length > 0 && (
              <div className="col-span-1">
                <h3 className="text-[#3B559E] font-bold text-[24px] leading-[38.4px]">
                  Các tổng thầu
                </h3>
                <ul className="list-disc pl-5">
                  {groupedCategories["tong-thau"].map((item: any) => (
                    <li
                      key={item.id}
                      className="text-base tablet:text-[20px] font-medium leading-[25.6px] tablet:leading-8 text-black mt-2"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {groupedCategories["doi-tac-nuoc-ngoai"].length > 0 && (
              <div className="col-span-1">
                <h3 className="text-[#3B559E] font-bold text-[24px] leading-[38.4px]">
                  Các đối tác nước ngoài
                </h3>
                <ul className="list-disc pl-5">
                  {groupedCategories["doi-tac-nuoc-ngoai"].map((item: any) => (
                    <li
                      key={item.id}
                      className="text-base tablet:text-[20px] font-medium leading-[25.6px] tablet:leading-8 text-black mt-2"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {groupedCategories["chu-dau-tu-nuoc-ngoai"].length > 0 && (
              <div className="col-span-1">
                <h3 className="text-[#3B559E] font-bold text-[24px] leading-[38.4px]">
                  Các chủ đầu tư nước ngoài
                </h3>
                <ul className="list-disc pl-5">
                  {groupedCategories["chu-dau-tu-nuoc-ngoai"].map(
                    (item: any) => (
                      <li
                        key={item.id}
                        className="text-base tablet:text-[20px] font-medium leading-[25.6px] tablet:leading-8 text-black mt-2"
                      >
                        {item.name}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            {groupedCategories["cong-ty-va-tap-doan"].length > 0 && (
              <div className="col-span-1">
                <h3 className="text-[#3B559E] font-bold text-[24px] leading-[38.4px]">
                  Các công ty và tập đoàn
                </h3>
                <ul className="list-disc pl-5">
                  {groupedCategories["cong-ty-va-tap-doan"].map((item: any) => (
                    <li
                      key={item.id}
                      className="text-base tablet:text-[20px] font-medium leading-[25.6px] tablet:leading-8 text-black mt-2"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="text-base tablet:text-[20px] font-medium leading-[25.6px] tablet:leading-8 text-black ">
            <p>{aboutUses.introEnd}</p>
          </div>
        </div>
      </div>
      <div className="hidden tablet:block laptop:hidden">
        <NewsComponent />
      </div>

      <ContactUs
        contactHome={contact}
        images={imageContact}
        phoneNumber={phone}
      />
    </div>
  );
};

export default AboutUs;
