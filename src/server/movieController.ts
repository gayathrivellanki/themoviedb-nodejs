import Movie from "../types/movie";
import * as api from "../data/movieApi";
import MovieResponse from "../types/movieResponse";
import { promises as fs } from 'fs';

export async function getMoviesByYear(year: string, page: string): Promise<MovieResponse[]> {
  const pageInt = parseInt((page || "1") as string, 10);
  const yearInt = parseInt((year || new Date().getFullYear()) as string, 10);

  const movies = await api.getMoviesByYear(yearInt, pageInt);

  const credits = (await Promise.all(movies.map(movie => api.getMovieCredits(movie.id))));

  const response = movies.map(movie => {
    const editors = [] as string[];
    const movieCredits = credits.find(credit => credit.id === movie.id);

    if (movieCredits) {
      editors.push(...movieCredits.crew.filter(member => member.known_for_department.includes("Visual Effects") || member.known_for_department.includes("Editor")).map(member => member.name));
      editors.push(...movieCredits.cast.filter(member => member.known_for_department.includes("Visual Effects") || member.known_for_department.includes("Editor")).map(member => member.name));
    }

    return {
      title: movie.title,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      editors: editors,
    } as MovieResponse;
  });

  return Promise.resolve(response);
}