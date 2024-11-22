import Crew from './crew';
import Cast from './cast';

export default interface Credits {
  id: number;
  crew: Crew[];
  cast: Cast[];
}