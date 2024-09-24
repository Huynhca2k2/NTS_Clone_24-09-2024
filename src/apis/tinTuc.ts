
import { apiService } from "@/services/api.service";

export const FetchTinTuc = async () => {
  try {
    const response: any = await apiService.get(
      "/api/articles/?filters[type][$eq]=bai-viet-tin-tuc&populate=picture.image"
    );

    // Access the 'data' field safely
    const articlesData = response?.data;

    if (articlesData) {
      return articlesData.map((article: any) => ({
        id: article.id,
        title: article.attributes.title,
        description: article.attributes.description,
        createdAt: article.attributes.createdAt,
        type: article.attributes.type,
        images: article.attributes.picture.image.data.attributes.url
      }));
    } else {
      throw new Error("No article data found in the response");
    }
  } catch (error) {
    console.error("Error fetching articles data:", error);
    throw error;
  }
};
