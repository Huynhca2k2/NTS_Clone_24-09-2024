import { apiService } from "@/services/api.service";



export const FetchProjectHomePage = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=ProjectHomePage"
        )
        // Log the full response to see its structure

        // Try accessing the data attributes safely
        const introduceData = response.data?.attributes?.ProjectHomePage;

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


export const FetchBlockProjectHomePage = async () => {
    try {
        const response: any = await apiService.get(
            "/api/home?populate=BlockProject "
        )
        // Log the full response to see its structure

        // Try accessing the data attributes safely
        const introduceData = response.data?.attributes?.BlockProject;

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


export const FetchImageBlockProject = async () => {
    try {
        const response: any = await apiService.get("/api/home?populate=BlockProject.ImageBanner.image");

        // Log the full response to see its structure


        // Safeguard: Check if data and attributes are present
        const blockProjects = response?.data?.attributes?.BlockProject;

        if (!blockProjects) {
            throw new Error("BlockProjects data is not available");
        }

        // Safeguard: Ensure blockProjects is an array
        if (!Array.isArray(blockProjects)) {
            throw new Error("BlockProjects should be an array");
        }

        const imageUrls = blockProjects.map((blockProject: any) => {
            // Safeguard: Check if ImageBanner and image are available
            const imageBanner = blockProject?.ImageBanner;
            const imageData = imageBanner?.image?.data?.[0]?.attributes;

            if (!imageData) {
                //console.warn("Image data not found for block project:", blockProject);
                return null; // Skip this item
            }

            const imageUrl = imageData.url;
            const link = `${process.env.API_URL}${imageUrl}`;

            return link;
        }).filter((url: any) => url !== null); // Filter out any null values

        return imageUrls;

    } catch (error) {
        console.error("Error fetching BlockProject image data:", error);
        throw error;
    }
};