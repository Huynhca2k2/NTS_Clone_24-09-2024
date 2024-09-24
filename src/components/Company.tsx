import { RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CompanyProps {
  company: CompanyItemProps;
  imageHomeMemberBox: string[];
  index: number;
}

interface CompanyItemProps {
  id: number;
  title: string;
  description: string;
  alt?: string;
}

const Company: React.FC<CompanyProps> = ({
  company,
  imageHomeMemberBox,
  index,
}) => {
  return (
    <div
      key={index}
      className="p-[24px] w-full h-[417px] flex flex-col justify-center items-center gap-6"
    >
      <Image
        height={100}
        width={200}
        src={imageHomeMemberBox[index] || "/images/irricadTextLogo1.png"}
        alt={company.alt || "hình ảnh company"}
        className="max-h-[50px] w-full object-contain"
      />

      <h2 className="font-semibold text-[#111928] text-[28px] leading-[44.8px]">
        {company.title}
      </h2>
      <h4 className="font-base text-[#6B7280] text-[18px] leading-[28.8px] text-justify line-clamp-3">
        {company.description}
      </h4>
      <Link href="/" passHref>
        <Button className="bg-white flex items-center hover:text-[#28A645] border-none rounded-[50px] gap-2 font-medium text-base leading-6 w-[max-content] h-auto text-[#28A645] px-6 py-3 shadow-btn">
          Truy cập trang web <RightOutlined />
        </Button>
      </Link>
    </div>
  );
};

export default Company;
