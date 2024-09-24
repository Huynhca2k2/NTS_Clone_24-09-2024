"use client";

import { RightOutlined } from "@ant-design/icons";
import { Button, Carousel } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { companyMemberType } from "./types";
import {
  FetchButtonHomeMemberBox,
  FetchHomeMember,
  FetchHomeMemberBox,
  FetchImageHomeMemberBox,
} from "@/apis/homeMemberCompany";
import Company from "./Company";

interface MemberCompaniesProps {
  memberCompany: companyMemberType;
  companies: any[];
  imageHomeMember: any[];
  buttonMemberBox: any;
}
const companyMemberInit = {
  title: "Các Công Ty Thành Viên",
  description: "",
  more: "",
};
const MemberCompanies: React.FC<MemberCompaniesProps> = (
  {
    // memberCompany,
    // companies,
    // imageHomeMember,
    //buttonMemberBox,
  }
) => {
  const [memberCompany, setMemberCompany] =
    useState<companyMemberType>(companyMemberInit);
  const [companies, setCompanies] = useState<any[]>([]);
  const [imageHomeMemberBox, setImageHomeMemberBox] = useState<string[]>([]);
  const [buttonData, setButtonData] = useState<any>(null);
  useEffect(() => {
    // Fetching intro data from the API
    const fetchIntroData = async () => {
      try {
        const fetchedIntroData = await FetchHomeMember();

        setMemberCompany(fetchedIntroData); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };

    // Call the function to fetch the data
    fetchIntroData();
  }, []);

  useEffect(() => {
    const fetchCompaniesData = async () => {
      try {
        const fetchedCompaniesData = await FetchHomeMemberBox();
        setCompanies(fetchedCompaniesData);
      } catch (error) {
        console.error("Error fetching companies data:", error);
      }
    };
    fetchCompaniesData();
  }, []);

  useEffect(() => {
    const fetchImageHomeMemberBoxData = async () => {
      try {
        const fetchedImageData = await FetchImageHomeMemberBox();
        setImageHomeMemberBox(fetchedImageData);
      } catch (error) {
        console.error("Error fetching Home Member Box image data:", error);
      }
    };
    fetchImageHomeMemberBoxData();
  }, []);

  useEffect(() => {
    const fetchButtonData = async () => {
      try {
        const fetchedButtonData = await FetchButtonHomeMemberBox();
        setButtonData(fetchedButtonData);
      } catch (error) {
        console.error("Error fetching button data:", error);
      }
    };
    fetchButtonData();
  }, []);
  return (
    <main className="mt-[112px] relative">
      <Image
        width={2000}
        height={1000}
        src="/images/imgMemberCompany.png"
        alt="img member company"
        className="w-full h-[790px] object-cover"
      />

      <div className="absolute w-full px-4 tablet:px-0 tablet:w-[572px] flex flex-col gap-6 items-center left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-6  items-center">
          <h1 className="font-semibold text-black text-[28px] tablet:text-[40px] laptop:text-[48px] tablet:leading-[76.8px]">
            {companyMemberInit.title}
          </h1>
          <h4 className="text-black font-medium text-base tablet:text-[18px] leading-[28.8px] text-center ">
            {memberCompany.description}
          </h4>
          <Button className="bg-[#28A645]  hover:!text-[#28A645] rounded-[50px] text-base leading-6 !w-[max-content] border-custom text-white !h-auto px-6 py-3">
            {memberCompany?.more || "Xem thêm"}
          </Button>
        </div>

        <div className=" shadow-custom w-[360px]">
          <Carousel className="" dots={true} autoplay>
            {companies.map((item, index) => {
              return (
                <div key={index}>
                  <Company
                    company={item}
                    imageHomeMemberBox={imageHomeMemberBox}
                    index={index}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </main>
  );
};

export default MemberCompanies;
