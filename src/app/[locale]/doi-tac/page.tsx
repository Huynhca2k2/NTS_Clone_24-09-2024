"use server";

import IntroduceComponent from "@/components/IntroduceComponent";
import Image from "next/image";
import { apiService } from "@/services/api.service";
import Company2 from "@/components/Company2";
import { CompanyItemType2 } from "@/components/types";

const Operation = async () => {
  const searchData = {
    populate: [
      "intro.background.image.url",
      "partner.logo.image.url",
    ].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  const intro: any = await apiService.get(`/api/doi-tac?${searchParams}`);
  const data = intro.data;

  return (
    <div className="laptop:pt-[100px] pt-[78px] pb-[80px]">
      <div className="relative w-full h-[18.5%] desktop:min-h-[682px] laptop:min-h-[455px] tablet:min-h-[400px] mobile:min-h-[200px] overflow-hidden">
        <Image
          src={`${process.env.API_URL}${data.attributes.intro.background.image.data.attributes.url}`}
          alt={
            data.attributes.intro.background.alt || "day la hinh anh doi tac"
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
        <div className="grid grid-cols-12 desktop:gap-[50px] tablet:gap-[32px]">
          {data.attributes.partner &&
            data.attributes.partner.map((item: CompanyItemType2, i: number) => {
              return (
                <div
                  key={i}
                  className="col-span-12 tablet:col-span-6 desktop:col-span-4 pb-[32px] desktop:pb-[0px] "
                >
                  <div className="border border-[#DFE4EA] desktop:h-[470px] mobile:h-[520px] relative">
                    <Company2 company={item} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Operation;
