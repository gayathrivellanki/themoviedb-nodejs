// movieController.test.ts
import { getMoviesByYear } from './movieController';
import * as movieApi from '../data/movieApi';
import Movie from '../types/movie';
import Credits from '../types/credits';

// Mock the movie API
jest.mock('../data/movieApi');
const mockedMovieApi = movieApi as jest.Mocked<typeof movieApi>;

describe('MovieController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMoviesByYear', () => {
    const mockMovies: Movie[] = [
      {
        id: 640146,
        title: 'Test Movie 1',
        release_date: '2023-01-01',
        vote_average: 7.5,
      },
      {
        id: 640147,
        title: 'Test Movie 2',
        release_date: '2023-02-01',
        vote_average: 8.0,
      }
    ];

    const mockCredits: Credits[] = [
      {
        id: 640146,
        cast: [
          {
            name: 'VFX Artist 1',
            known_for_department: 'Visual Effects',
          }
        ],
        crew: [
          {
            name: 'Editor',
            known_for_department: 'Editing',
          }
        ]
      },
      {
        id: 640147,
        cast: [],
        crew: []
      }
    ];

    it('should return formatted movie responses with editors', async () => {
      // Arrange
      mockedMovieApi.getMoviesByYear.mockResolvedValueOnce(mockMovies);
      mockedMovieApi.getMovieCredits
        .mockResolvedValueOnce(mockCredits[0])
        .mockResolvedValueOnce(mockCredits[1]);

      // Act
      const result = await getMoviesByYear('2023', '1');

      // Assert
      expect(result).toEqual([
        {
          title: 'Test Movie 1',
          release_date: '2023-01-01',
          vote_average: 7.5,
          editors: ['VFX Artist 1']
        },
        {
          title: 'Test Movie 2',
          release_date: '2023-02-01',
          vote_average: 8.0,
          editors: []
        }
      ]);

      expect(mockedMovieApi.getMoviesByYear).toHaveBeenCalledWith(2023, 1);
      expect(mockedMovieApi.getMovieCredits).toHaveBeenCalledTimes(2);
    });

    it('should handle empty year and page parameters', async () => {
      // Arrange
      const currentYear = new Date().getFullYear();
      mockedMovieApi.getMoviesByYear.mockResolvedValueOnce([]);
      
      // Act
      const result = await getMoviesByYear('', '');

      // Assert
      expect(result).toEqual([]);
      expect(mockedMovieApi.getMoviesByYear).toHaveBeenCalledWith(currentYear, 1);
    });

    it('should handle movies with no VFX editors', async () => {
      // Arrange
      mockedMovieApi.getMoviesByYear.mockResolvedValueOnce([mockMovies[0]]);
      mockedMovieApi.getMovieCredits.mockResolvedValueOnce({
        id: 1,
        cast: [],
        crew: []
      });

      // Act
      const result = await getMoviesByYear('2023', '1');

      // Assert
      expect(result).toEqual([
        {
          title: 'Test Movie 1',
          release_date: '2023-01-01',
          vote_average: 7.5,
          editors: []
        }
      ]);
    });
  });
});