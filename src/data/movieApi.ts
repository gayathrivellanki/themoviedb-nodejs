import apiClient from "./api";
import Movie from "../types/movie";
import Credits from "../types/credits";

export async function getMoviesByYear(year: number, page: number): Promise<Movie[]> {
  const response = await apiClient.get(`/discover/movie?language=en-US&page=${page}&primary_release_year=${year}&sort_by=popularity.desc`);

  if (response.status === 200) {
    return response.data.results;
  }

  return [];
}

export async function getMovieCredits(movieId: number): Promise<Credits> {
  const response = await apiClient.get(`/movie/${movieId}/credits`);

  if (response.status === 200) {
    return response.data;
  }
  return { id: movieId, cast: [], crew: [] } as Credits;
}