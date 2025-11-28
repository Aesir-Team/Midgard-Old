import axios from "axios";
import GetMangaProvider, { MangaProvider } from "../../shared/providers/manga";

const api = axios.create({
  baseURL: GetMangaProvider(MangaProvider.LER_MANGA),
});

export default api;
