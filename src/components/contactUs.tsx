"use client";

import { PhoneOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Space, Typography } from "antd";
import Image from "next/image";

const { Text, Link } = Typography;
import React, { useEffect, useState } from "react";
import { ContactType, phone } from "./types";
import {
  FetchContact,
  FetchImageContact,
  FetchPhoneNumber,
} from "@/apis/contactHome";

const contactData = {
  title: "Khởi đầu dự án của bạn ngay thôi",
  subTitle: "Liên hệ với chúng tôi",
  srcDecktop: "/images/CTA_Desktop.png",
  phoneNumber: "0888 167 247",
};

interface ContactTypeProps {
  contactHome: string;
  images: string[];
  phoneNumber: string;
}

const ContactUs: React.FC<ContactTypeProps> = () => {
  const [contact, setContact] = useState<ContactType | null>(null);
  const [imageContact, setImageContact] = useState<string[]>([]);
  const [phoneNumberContact, setPhoneNumberContact] = useState<phone | null>(
    null
  );
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const fetchedContactData = await FetchContact();
        setContact(fetchedContactData);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    const fetchImageContactData = async () => {
      try {
        const fetchedImageContactData = await FetchImageContact();
        setImageContact(fetchedImageContactData);
      } catch (error) {
        console.error("Error fetching image contact data:", error);
      }
    };

    const fetchPhoneNumber = async () => {
      try {
        const fetchedPhone = await FetchPhoneNumber();
        setPhoneNumberContact(fetchedPhone);
      } catch (error) {
        console.error("Error fetching image contact data:", error);
      }
    };
    fetchPhoneNumber();
    fetchContactData();
    fetchImageContactData();
  }, []);

  return (
    <div className=" laptop:max-w-[1024px] desktop:max-w-[1440px] mx-auto my-[80px] custom-container px-4">
      <div className="relative h-[265px]">
        <Image
          src={imageContact[0] || "/images/CTA_Desktop.png"}
          alt={contactData.subTitle}
          className="object-cover w-full h-full object-center"
          width={400}
          height={100}
        />

        <div className="h-full w-full absolute p-10 laptop:px-20 left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col tablet:flex-row justify-between items-center">
          <div className="flex flex-col gap-4">
            <Text className="!font-medium !text-[15px] laptop:!text-base !leading-6 text-white">
              {contact?.footerPreamble}
            </Text>
            <h1 className="font-bold text-white laptop:text-[40px] text-[24px]">
              {contact?.FooterTitle}
            </h1>
          </div>
          <Button
            shape="round"
            className="bg-[#28A645] border-none text-white !font-medium !text-base !leading-6 hover:!text-[#28A645]"
            icon={<PhoneOutlined />}
            size={"large"}
          >
            Gọi ngay {phoneNumberContact?.number}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
