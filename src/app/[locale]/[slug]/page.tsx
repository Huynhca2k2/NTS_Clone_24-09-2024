import { apiService } from "@/services/api.service";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: any) => {
  const shouldPopulateCategory = true; // Set this condition based on your requirements

  const baseUrl = `api/articles?filters[slug][$eq]=${params.slug}`;
  const populateCategory = shouldPopulateCategory ? "&populate=category" : "";

  const response: any = await apiService.get(`${baseUrl}${populateCategory}`);

  if (!response.data || response.data.length === 0) {
    notFound(); // Redirect to 404 page
  }
  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case "san-pham":
        return "Sản phẩm";
      case "du-an":
        return "Dự án";
      case "dich-vu":
        return "Dịch vụ";
      case "thong-tu-nghi-dinh":
        return "Thông tư - Nghị định";
      default:
        return type;
    }
  };

  const categoryAttributes =
    response.data[0].attributes.category?.data?.attributes;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h-[68px] mt-[100px] bg-[#F9FAFB] w-full flex justify-center items-center">
        <div className="w-[1440px]">
          <p className="text-left flex gap-[10px] ">
            <span className="text-[#637381]">Trang chủ</span>
            <span className="text-[#637381]">/</span>
            {shouldPopulateCategory && categoryAttributes && (
              <>
                <span className="text-[#637381]">{`${getTypeDisplayName(
                  categoryAttributes.type
                )}`}</span>
                <span className="text-[#637381]">/</span>
                <span className="text-[#637381]">{`${categoryAttributes.title}`}</span>
                <span className="text-[#637381]">/</span>
              </>
            )}
            <span className="text-[#1F2A37]">{`${response.data[0].attributes.title}`}</span>
          </p>
        </div>
      </div>
      <div className="prose w-[1440px] max-w-none">
        {categoryAttributes && (
          <p className="text-center pt-8 font-medium text-5 leading-6 text-[#28A645] uppercase">
            {getTypeDisplayName(categoryAttributes.type)}
          </p>
        )}
        <h1 className="text-center pt-4">
          {response.data[0].attributes.title}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: response.data[0].attributes.content,
          }}
        />
      </div>
    </div>
  );
};

export default page;
