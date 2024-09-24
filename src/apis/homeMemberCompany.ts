import { apiService } from "@/services/api.service";

export const FetchHomeMember = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=HomeMemberCompany"
        )
        // Log the full response to see its structure

        // Try accessing the data attributes safely
        const introduceData = response.data?.attributes?.HomeMemberCompany;

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


export const FetchHomeMemberButton = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=HomeMemberCompany.ButtonHomeMember"
        )
        // Log the full response to see its structure

        // Try accessing the data attributes safely
        const introduceData = response.data?.attributes?.HomeMemberCompany.ButtonHomeMember;
       
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


export const FetchHomeMemberBox = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=HomeMemberBox"
        )
        // Log the full response to see its structure

        // Try accessing the data attributes safely
        const introduceData = response.data?.attributes?.HomeMemberBox;

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





export const FetchImageHomeMemberBox = async () => {
    try {
        // Make the API call
        const response: any = await apiService.get(
            "/api/home?populate=HomeMemberBox.ImageHomeChoose.image"
        );

        // Log the full response for debugging

        // Safely access the HomeMemberBox array from the API response
        const homeMemberBoxes = response.data?.attributes?.HomeMemberBox || [];

        // Map through the HomeMemberBox array to get the image URLs
        const imageUrls = homeMemberBoxes.map((box: any) => {
            const imageData = box?.ImageHomeChoose?.image?.data?.[0]?.attributes;

            if (imageData && imageData.url) {
                // Construct the full image URL using the API base URL
                return `${process.env.API_URL}${imageData.url}`;
            } else {
                // Return null or handle missing image data appropriately
                return null;
            }
        });

        // Filter out any null values (in case some entries are missing images)
        return imageUrls.filter((url: string | null) => url !== null);

    } catch (error) {
        console.error("Error fetching About Us image data:", error);
        throw error;
    }
};


export const FetchButtonHomeMemberBox = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=HomeMemberBox.ButtonHomeChoose"
        )
        // Log the full response to see its structure

        // Try accessing the data attributes safely
        const introduceData = response.data?.attributes?.HomeMemberBox[0].ButtonHomeChoose;
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