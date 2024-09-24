import { apiService } from "@/services/api.service";
import IntroduceNewComponent from "@/components/IntroduceNewComponent";
import { Divider } from "antd";
import SlideExpertLoading from "@/components/SlideExpertLoading";
import NewsLoading from "@/components/NewsLoading";

const loading = async () => {
  const searchData = {
    populate: [
      "intro.background.image.url",
      "experts.avatar.image.url",
    ].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  const intro: any = await apiService.get(
    `/api/trang-goc-chuyen-gia?${searchParams}`
  );
  const data = intro.data.attributes;

  return (
    <div className="laptop:pt-[100px] pt-[78px]">
      <div className="pt-[40px]">
        <IntroduceNewComponent
          title={data.intro?.title || ""}
          subtitle={data.intro?.subtitle || ""}
          description={data.intro?.description || ""}
        />
      </div>

      <SlideExpertLoading />
      <div className="laptop:max-w-[1024px] hidden tablet:block desktop:max-w-[1440px] mx-auto px-4">
        <Divider className="mt-[60px] mb-[40px] text-[#e5e7eb] border-[1px] " />
      </div>
      <NewsLoading />
    </div>
  );
};

export default loading;
