import { apiService } from "@/services/api.service";

export const FetchCategory = async () => {
    try {
        // Fetching the data from the API
        const response: any = await apiService.get(
            "/api/home?populate=HomeChoose"
        );

        // Log the full response to inspect structure


        // Access the attributes safely
        const introduceData = response.data?.attributes?.HomeChoose;

        // Check if the introduce data exists and map it to a usable format
        if (introduceData && Array.isArray(introduceData)) {
            // Map the introduce data to the structure your component expects
            const mappedData = introduceData.map((item: any) => ({
                id: item.id || null,
                title: item.title || "Untitled", // Default to 'Untitled' if title is missing
                description: item.description || "No description available",
                more: item.more || "Xem thêm",
                src: item.image?.url || "/images/default.png", // Use default image if none provided
            }));

            return mappedData;
        } else {
            throw new Error("Intro data not found or is not an array");
        }
    } catch (error) {
        console.error("Error fetching intro data:", error);
        throw error; // Re-throw error to handle it in the useEffect
    }
};


export const FetchImageCategory = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=HomeChoose.imageBlock"
        );

        // Log the full response to see its structure


        // Access the data attributes safely
        const imageUrls = response.data.attributes.HomeChoose;

        const url = imageUrls.map((imageUrl: any) => {

            const link = `${process.env.API_URL}${imageUrl.imageBlock.data[0].attributes.url}`

            return link;
        })
        return url;

    } catch (error) {
        console.error("Error fetching About Us image data:", error);
        throw error;
    }
};