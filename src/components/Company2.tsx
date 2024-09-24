import { RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CompanyItemType2 } from "./types";

interface CompanyType2 {
  company: CompanyItemType2;
}

const Company2: React.FC<CompanyType2> = ({ company }) => {
  return (
    <div className="px-[24px] pb-[24px] pt-[100px] flex flex-col justify-between h-full">
      <div className="flex flex-col gap-[24px] mb-4">
        <div className="flex justify-center ">
          <div className="max-w-[200px] min-w-[100px] h-[100px] overflow-hidden">
            <Image
              src={`${process.env.API_URL}${company.logo.image.data.attributes.url}`}
              alt={
                company.logo.image.data.attributes.alt ||
                "day la hinh anh doi tac"
              }
              width={200}
              height={60}
              className="h-auto object-cover"
            />
          </div>
        </div>
        <h2 className="text-center font-semibold text-[28px] ">
          {company.name}
        </h2>
        <p className="text-[#6B7280] text-[18px] h-[85px] overflow-y-hidden line-clamp-3">
          {company.description}
        </p>
      </div>
      <Link
        href={company.website}
        className="flex justify-center"
        target="_blank"
      >
        <Button className="bg-white flex items-center hover:text-[#28A645] border-none rounded-[50px] gap-2 font-semibold text-base leading-6 w-[max-content] h-auto text-[#28A645] px-6 py-3 shadow-btn">
          Truy cập trang web <RightOutlined />
        </Button>
      </Link>
    </div>
  );
};

export default Company2;
