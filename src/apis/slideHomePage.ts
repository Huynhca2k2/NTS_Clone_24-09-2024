
import { apiService } from "@/services/api.service";

export const FetchSlideHome = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=SlideBanner.image"
        );

        // Log the full response to see its structure


        // Access the data attributes safely
        const imageUrls = response.data.attributes.SlideBanner;

        const url = imageUrls.map((imageUrl: any) => {

            const link = `${process.env.API_URL}${imageUrl.image.data[0].attributes.url}`
            return link;
        })
        return url;

    } catch (error) {
        console.error("Error fetching About Us image data:", error);
        throw error;
    }
};