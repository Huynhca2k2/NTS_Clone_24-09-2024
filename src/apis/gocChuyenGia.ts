import { apiService } from "@/services/api.service";

export const fetchIntroGocChuyenGia = async () => {
  try {
    const response: any = await apiService.get("api/doi-tac?populate=intro");
    const introduceData = response.data.attributes.intro;
    return introduceData;
  } catch (error) {
    console.error("Error fetching intro doi tac:", error);
    throw error;
  }
};

export const fetchExpertGocChuyenGia = async () => {
  try {
    const response: any = await apiService.get(
      "/api/trang-goc-chuyen-gia?populate=experts.avatar.url"
    );
    const expertData = response.data.attributes.experts;
    const experts = Array.isArray(expertData) ? expertData : [expertData];

    const expertsWithImages = experts.map((expert) => {
      const imageUrl = `${process.env.API_URL}${expert.avatar.url.data.attributes.url}`;
      const alt = expert.avatar.alt;
      return {
        ...expert,
        avatar: imageUrl,
        alt,
      };
    });

    return expertsWithImages;
  } catch (error) {
    console.error("Error fetching doi tac:", error);
    throw error;
  }
};

///api/trang-goc-chuyen-gia?populate=articles.picture.url

export const fetchArticlesGocChuyenGia = async () => {
  try {
    const response: any = await apiService.get(
      "/api/trang-goc-chuyen-gia?populate=articles.picture.url"
    );
    const articleData = response.data.attributes.articles;

    const articles = Array.isArray(articleData) ? articleData : [articleData];

    const articlesWithImages = articles.map((article) => {
      const imageUrl = article.picture.url.data.attributes.url;
      const alt = article.picture.alt;

      return {
        ...article,
        picture: imageUrl,
        alt,
      };
    });

    return articlesWithImages;
  } catch (error) {
    console.error("Error fetching doi tac:", error);
    throw error;
  }
};
