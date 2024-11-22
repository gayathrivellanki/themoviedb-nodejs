import apiClient from "./api";
import { getMovieCredits, getMoviesByYear } from './movieApi';

// Mock the API client
jest.mock('./api', () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

const mockedAxios = apiClient as jest.Mocked<typeof apiClient>;

describe('getMoviesByYear', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of movies', async () => {
    const mockResponse = {
      "page": 1,
      "results": [
        {
          "adult": false,
          "backdrop_path": "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
          "genre_ids": [
            28,
            12,
            878
          ],
          "id": 640146,
          "original_language": "en",
          "original_title": "Ant-Man and the Wasp: Quantumania",
          "overview": "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
          "popularity": 9272.643,
          "poster_path": "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
          "release_date": "2023-02-15",
          "title": "Ant-Man and the Wasp: Quantumania",
          "video": false,
          "vote_average": 6.5,
          "vote_count": 1856
        },
      ],
      "total_pages": 38020,
      "total_results": 760385
    };

    mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockResponse });

    const movies = await getMoviesByYear(2024, 1);
    expect(movies).toBeInstanceOf(Array);

    const movie = movies[0];
    expect(movies.length).toBe(1);
    expect(movie.id).toBe(640146);
  });
});

describe('getMovieCredits', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the credits for a movie', async () => {
    const mockResponse = {
      "id": 550,
      "cast": [
        {
          "adult": false,
          "gender": 2,
          "id": 819,
          "known_for_department": "Acting",
          "name": "Edward Norton",
          "original_name": "Edward Norton",
          "popularity": 26.99,
          "profile_path": "/8nytsqL59SFJTVYVrN72k6qkGgJ.jpg",
          "cast_id": 4,
          "character": "The Narrator",
          "credit_id": "52fe4250c3a36847f80149f3",
          "order": 0
        }
      ],
      "crew": [
        {
          "adult": false,
          "gender": 2,
          "id": 819,
          "known_for_department": "Editing",
          "name": "Edward Norton",
          "original_name": "Edward Norton",
          "popularity": 26.99,
          "profile_path": "/8nytsqL59SFJTVYVrN72k6qkGgJ.jpg",
          "cast_id": 4,
          "character": "The Narrator",
          "credit_id": "52fe4250c3a36847f80149f3",
          "order": 0
        }
      ]
    }

    mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockResponse });

    const credits = await getMovieCredits(550);
    expect(credits).toHaveProperty('id', 550);
    expect(credits.cast).toBeInstanceOf(Array);
    expect(credits.crew).toBeInstanceOf(Array);

    const castMember = credits.cast[0];
    expect(castMember).toHaveProperty('name', 'Edward Norton');

    const crewMember = credits.crew[0];
    expect(crewMember).toHaveProperty('name', 'Edward Norton');

    expect(credits.cast.length).toBe(1);
    expect(credits.crew.length).toBe(1);
  });
});
