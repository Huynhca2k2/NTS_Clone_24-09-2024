import { apiService } from "@/services/api.service";


export const FetchBanner = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=banner "
        )
        // Log the full response to see its structure

        // Try accessing the data attributes safely
        const introduceData = response.data?.attributes?.banner;

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


export const FetchImageBanner = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=banner.ImageBanner.image"
        );

        // Log the full response to understand its structure
        
        // Access the data attributes safely
        const banners = response.data?.attributes?.banner;
        if (!banners || !Array.isArray(banners)) {
            throw new Error("Unexpected response structure or 'banner' is not an array.");
        }

        // Collect image URLs from all banners
        const imageUrls = banners.flatMap((banner: any) => {
            // Check if ImageBanner and its image data exist
            if (banner?.ImageBanner?.image?.data) {
                return banner.ImageBanner.image.data.map((imageData: any) => {
                    // Extract the URL from the image data
                    const url = imageData?.attributes?.url;
                    if (url) {
                        return `${process.env.API_URL}${url}`;
                    }
                    throw new Error("Image URL is missing in the response data.");
                });
            }
            return []; // Return an empty array if no image data is present
        });

        
        return imageUrls;

    } catch (error) {
        console.error("Error fetching image data:", error);
        throw error;
    }
};
