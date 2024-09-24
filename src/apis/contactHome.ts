import { apiService } from "@/services/api.service";

export const FetchContact = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=footerContact"
        )
        // Log the full response to see its structure

        // Try accessing the data attributes safely
        const introduceData = response.data?.attributes?.footerContact;

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

export const FetchImageContact = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=footerContact.ImageBackground.image"
        );

        // Log the full response to understand its structure


        // Access the image URL from the correct location in the response
        const imageBackground = response.data?.attributes?.footerContact?.ImageBackground?.image?.data;

        

        // Ensure imageBackground is an array before using map
        if (!Array.isArray(imageBackground)) {
            throw new Error("Expected imageBackground to be an array.");
        }

        // Map over the image URLs if available
        const urls = imageBackground.map((imageData: any) => {
            if (imageData?.attributes?.url) {
                const link = `${process.env.API_URL}${imageData.attributes.url}`;
                return link;
            }
            throw new Error("Image URL is missing in the response data.");
        });

        return urls;




    } catch (error) {
        console.error("Error fetching contact image data:", error);
        throw error;
    }
};

export const FetchPhoneNumber = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=footerContact.buttonFooter"
        )
        // Log the full response to see its structure

        // Try accessing the data attributes safely
        const introduceData = response.data?.attributes?.footerContact.buttonFooter;

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