import type { Metadata } from "next";
import { FetchTinTuc } from "@/apis/tinTuc";

import { apiService } from "@/services/api.service";

import News from "@/components/News";
import NewsLoading from "@/components/NewsLoading";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "",
  icons: {
    icon: "/images/logo.png",
  },
};

const NewsPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const searchData = {
    populate: [
      "intro.background.image.url",
      "news.avatar.image.url",
    ].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  const intro: any = await apiService.get(`/api/du-an?${searchParams}`);
  const data = intro.data.attributes;
  const article: any = await apiService.get(
    `/api/find-article?type=bai-viet-tin-tuc`
  );

  return (
    <div className="laptop:pt-[100px] pt-[78px]">
      <News articles={article} />
    </div>
  );
};

export default NewsPage;
