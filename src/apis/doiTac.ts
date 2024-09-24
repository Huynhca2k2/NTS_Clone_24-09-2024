import { apiService } from "@/services/api.service";

export const fetchDoiTac = async () => {
  try {
    const response: any = await apiService.get("api/doi-tac");
    const doiTacData = response.data;
    return doiTacData;
  } catch (error) {
    console.error("Error fetching doi tac:", error);
    throw error;
  }
};
