import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const apiKey = process.env.TMDB_ACCESS_TOKEN;

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
  timeout: 10000,
});

export default apiClient;
