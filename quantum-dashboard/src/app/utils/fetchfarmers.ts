const baseUrl = '/api/farmer';
export const fetchFarmers = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch farmers");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching farmers:", error);
    throw error;
  }
};
