import {
  FetchContact,
  FetchImageContact,
  FetchPhoneNumber,
} from "@/apis/contactHome";
import ContactUs from "@/components/ContactUs";
import CustomContainer from "@/components/CustomContainer";
import CustomContainerLoading from "@/components/CustomContainerLoading";
import IntroduceComponent from "@/components/IntroduceComponent";
import NewsComponent from "@/components/NewsComponent";
import { apiService } from "@/services/api.service";
import type { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Dự Án",
  description: "Đây là dự án",
  icons: {
    icon: "/images/logo.png",
  },
};

const Loading = async () => {
  const searchData = {
    populate: ["intro.background.image.url", ""].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  const intro: any = await apiService.get(`/api/du-an?${searchParams}`);
  const data = intro.data;

  return (
    <div className="laptop:pt-[100px] pt-[78px]">
      <div className="relative w-full h-[18.5%] desktop:min-h-[682px] laptop:min-h-[455px] tablet:min-h-[400px] mobile:min-h-[200px] overflow-hidden">
        <Image
          src={`${process.env.API_URL}${data.attributes.intro.background.image.data.attributes.url}`}
          alt={
            data.attributes.intro.background.alt || "day la hinh anh san pham"
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
        <CustomContainerLoading />
      </div>
    </div>
  );
};

export default Loading;
