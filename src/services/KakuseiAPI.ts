import { apiClient, routes } from "./apiService";

const KakuseiAPI = {
  getHomePage: async () => {
    const response = await apiClient.get(routes.homePage());
    return response.data;
  },

  getSearchResults: async (manga: string) => {
    const response = await apiClient.get(routes.searchPage(), {
      params: { manga },
    });
    return response.data;
  },

  getMangaDetails: async (manga: string) => {
    const response = await apiClient.get(routes.mangaPage(), {
      params: { manga },
    });
    return response.data;
  },

  getChapterDetails: async (manga: string) => {
    const response = await apiClient.get(routes.chapterPage(), {
      params: { manga },
    });
    return response.data;
  },

  getImageUrls: async (manga: string, cap: number) => {
    const response = await apiClient.get(routes.imagePage(), {
      params: { manga, cap },
    });
    return response.data;
  },
};

export default KakuseiAPI;
