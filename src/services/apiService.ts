import axios from "axios";
import { routes } from "../utils/apiRoutes";

const apiClient = axios.create({
  baseURL: routes.homePage(),
});

export { apiClient, routes };
