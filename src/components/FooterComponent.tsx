"use server";

import { FooterModel } from "@/models/footerModel";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import IconPhone from "./IconPhone";
import IconMap from "./IconMap";
import Image from "next/image";
import { apiService } from "@/services/api.service";

const FooterComponent = async () => {
  const searchData = {
    populate: [
      "logo.image",
      "socialNetwork.logo.image",
      "imageProtect.image",
      "backlink",
    ].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  const contact: any = await apiService.get(`/api/contact?${searchParams}`);

  const itemsFooter: any[] = contact.data.attributes.backlink;

  // Lọc các mục theo category
  const services = itemsFooter.filter((item) => item.category === "dich-vu");
  const products = itemsFooter.filter((item) => item.category === "san-pham");
  const aboutUs = itemsFooter.filter(
    (item) => item.category === "ve-chung-toi"
  );

  return (
    <footer>
      <div className="grid grid-cols-1 laptop:grid-cols-12 px-[16px] desktop:px-[135px] desktop:pt-[75px] pt-[40px] pb-4 bg-[#3B559E] gap-4">
        <div className="mobile:col-span-12 laptop:col-span-3">
          <div className=" mobile:col-span-12  laptop:col-span-3">
            <div className="flex-col justify-start items-start gap-4 flex w-full">
              <div className="px-2 pb-4 rounded-lg flex-col justify-start items-start gap-4 flex">
                <Image
                  src={`${process.env.API_URL}${contact.data.attributes.logo.image.data.attributes.url}`}
                  alt={contact.data.attributes.logo.alt}
                  width={304}
                  height={45}
                />
              </div>
              <div className="justify-start items-center gap-2.5 desktop:inline-flex mobile:flex">
                <div className=" justify-center items-center desktop:inline-flex mobile:flex">
                  <div className="">
                    <a
                      href={`tel:${contact.data.attributes.phone}`}
                      target="_blank"
                    >
                      <IconPhone />
                    </a>
                  </div>
                </div>
                <a
                  href={`tel:${contact.data.attributes.phone}`}
                  target="_blank"
                  className="text-white text-sm font-medium  leading-snug hover:text-[#28A645] transition-colors ease-linear"
                >
                  {contact.data.attributes.phone}
                </a>
              </div>
              <div className="justify-start items-center gap-2.5 desktop:inline-flex mobile:flex">
                <div className=" justify-center items-center flex">
                  <div className=" relative">
                    <a
                      href={contact.data.attributes.urlAddress}
                      target="_blank"
                    >
                      <IconMap />
                    </a>
                  </div>
                </div>
                <a
                  href={contact.data.attributes.urlAddress}
                  target="_blank"
                  className=" text-white text-sm font-medium  leading-snug desktop:max-w-[300px] laptop:w-full hover:text-[#28A645] transition-colors ease-linear"
                >
                  {contact.data.attributes.address}
                </a>
              </div>
              <div className="w-full desktop:max-w-[312px] desktop:max-h-[312px] mobile:w-full mobile:h-full">
                <div className="mobile:!aspect-[1.55] desktop:!aspect-[6/5]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9277600307532!2d106.77582227570356!3d10.816840358445626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317526f09a002519%3A0x5490599bcffafcdb!2zMTUgxJAuIFPhu5EgMywgS2h1IGTDom4gY8awIEdpYSBIb8OgLCBRdeG6rW4gOSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1716304643844!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    className="border-none"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile:col-span-12 laptop:col-start-4 laptop:col-end-13 desktop:pl-[40px] laptop:pl-[24px] desktop:flex justify-between mobile:grid mobile:grid-cols-2 gap-4">
          {/* Dịch vụ */}
          <div className="mobile:col-span-1 flex-1">
            <p className="text-white text-lg font-semibold leading-relaxed pr-2">
              Dịch vụ
            </p>
            <div className="min-h-24 flex-col justify-start items-start gap-3 inline-flex mt-6">
              {services.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="text-white text-base font-normal leading-normal hover:text-[#28A645] transition-colors ease-linear"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Sản phẩm */}
          <div className="mobile:col-span-1 flex-1">
            <p className="text-white text-lg font-semibold leading-relaxed pr-2">
              Sản phẩm
            </p>
            <div className="min-h-24 flex-col justify-start items-start gap-3 inline-flex mt-6">
              {products.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="text-white text-base font-normal leading-normal hover:text-[#28A645] transition-colors ease-linear"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Về chúng tôi */}
          <div className="mobile:col-span-1 flex-1">
            <p className="text-white text-lg font-semibold leading-relaxed pr-2">
              Công ty Kỹ thuật NTS
            </p>
            <div className="min-h-24 flex-col justify-start items-start gap-3 inline-flex mt-6">
              {aboutUs.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="text-white text-base font-normal leading-normal hover:text-[#28A645] transition-colors ease-linear"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Theo dõi */}
          <div className="mobile:col-span-1 flex-1">
            <div className="flex flex-col gap-6">
              <p className="text-white text-lg font-semibold  leading-relaxed pr-2">
                Theo dõi chúng tôi trên
              </p>
              <div className="flex-col justify-start items-start gap-[25px] flex">
                <div className="grid grid-cols-5 gap-[15px]">
                  {contact.data.attributes.socialNetwork.map(
                    (item: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white w-8 h-8 rounded-full flex items-center justify-center"
                      >
                        <Link href={item.link} target="_blank">
                          <Image
                            width={20}
                            height={20}
                            className="w-auto h-[20px]"
                            src={`${process.env.API_URL}${item.logo.image.data.attributes.url}`}
                            alt={item.logo.alt}
                          />
                        </Link>
                      </div>
                    )
                  )}
                </div>
                <Image
                  width={186}
                  height={70}
                  src={`${process.env.API_URL}${contact.data.attributes.imageProtect.image.data.attributes.url}`}
                  alt={contact.data.attributes.imageProtect.alt}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" tablet:block w-full px-2 py-4 border-t bg-[#3B559E] border-white justify-center items-center gap-2.5 inline-flex">
        <div className="text-center text-white text-base font-normal leading-normal">
          <p>{contact.data.attributes.paperRegister}</p>
          <p>Copyright 2024 © NTSE.VN</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
