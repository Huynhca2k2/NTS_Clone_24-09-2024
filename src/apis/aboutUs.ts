import { apiService } from "@/services/api.service";

export const FetchAboutUs = async () => {
  try {
    const response: any = await apiService.get(
      "/api/home?populate=ContentTypeAboutUs"
    );
    // Log the full response to see its structure

    // Try accessing the data attributes safely
    const introduceData = response.data?.attributes?.ContentTypeAboutUs;

    // Check if the data exists, and return it if found
    if (introduceData) {
      return introduceData;
    } else {
      throw new Error("intro data not found in the response");
    }
  } catch (error) {
    console.error("Error fetching About Us intro data:", error);
    throw error;
  }
};

export const FetchImageAboutUs = async () => {
  try {
    const response: any = await apiService.get(
      "/api/home?populate=ImageAboutUs.image"
    );

    // Log the full response to see its structure

    // Access the data attributes safely
    const imageUrls = response.data.attributes.ImageAboutUs;

    const url = imageUrls.map((imageUrl: any) => {
      const link = `${process.env.API_URL}${imageUrl.image.data[0].attributes.url}`;
      return link;
    });
    return url;
  } catch (error) {
    console.error("Error fetching About Us image data:", error);
    throw error;
  }
};
