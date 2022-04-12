import api from "../../services/api";

export const getImages = async (
  page: number,
  setData: (value: {
    data: [];
    pagination: { total_pages: number; current_page: number };
  }) => void,
  setLoading: (value: boolean) => void
) => {
  try {
    setLoading(true);
    const response = await api.get(`/artworks`, {
      params: {
        page: page,
        limit: 27,
      },
    });

    if (response.status === 200) setData(response.data);
  } catch (error) {
    console.log("error: " + error);
  } finally {
    setLoading(false);
  }
};
