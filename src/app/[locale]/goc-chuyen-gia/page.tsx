"use server";
import {
  fetchArticlesGocChuyenGia,
  fetchExpertGocChuyenGia,
  fetchIntroGocChuyenGia,
} from "@/apis/gocChuyenGia";
import IntroduceComponent from "@/components/IntroduceComponent";
import { IntroduceModel } from "@/models/IntroduceModel";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ArticlesLayout from "./components/ArticlesLayout";
import ExpertItem from "./components/ExpertItem";
import { ExpertModel } from "@/models/ExpertModel";
import { ArticleModel } from "@/models/ArticleModel";
import { apiService } from "@/services/api.service";
import IntroduceNewComponent from "@/components/IntroduceNewComponent";
import { Divider } from "antd";
import SlideExpertLoading from "@/components/SlideExpertLoading";
import NewsLoading from "@/components/NewsLoading";

const ExpertCorner = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
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
  const article: any = await apiService.get(
    `/api/find-article?type=bai-viet-goc-chuyen-gia`
  );

  return (
    <div className="laptop:pt-[100px] pt-[78px]">
      <div className="pt-[40px]">
        <IntroduceNewComponent
          title={data.intro?.title || ""}
          subtitle={data.intro?.subtitle || ""}
          description={data.intro?.description || ""}
        />
      </div>
      <ExpertItem datas={data.experts} />
      <div className="laptop:max-w-[1024px] hidden tablet:block desktop:max-w-[1440px] mx-auto px-4">
        <Divider className="mt-[60px] mb-[40px] text-[#e5e7eb] border-[1px] " />
      </div>

      <ArticlesLayout datas={article} />
    </div>
  );
};

export default ExpertCorner;
