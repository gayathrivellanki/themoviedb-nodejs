import { Router } from 'express';
import {getMoviesByYear} from './MovieController';

const movieRouter = Router();

movieRouter.get('/', async (req, res) => {
  const { page, year } = req.query;

  const response = await getMoviesByYear(year as string, page as string);

  res.json(response);
});

export default movieRouter;
