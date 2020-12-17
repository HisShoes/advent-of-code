import { Context } from '../context';
import { Day } from '../types';

export const day13 = (context: Context): Day => {
  const input = context.getDayInput(13);
  const shipArrives = parseInt(input.slice(0, 1)[0], 10);
  const busTimes = input.slice(1)[0].split(',');

  const part1 = () =>
    busTimes
      .filter((time) => time !== 'x')
      .map((time) => parseInt(time, 10))
      .map((time) => ({ id: time, earliestArrival: Math.ceil(shipArrives / time) * time }))
      .map(({ id, earliestArrival }) => ({
        id,
        earliestArrival,
        potentialResult: id * (earliestArrival - shipArrives),
      }))
      .sort((a, b) => a.earliestArrival - b.earliestArrival)[0].potentialResult;

  const part2 = () => {};
  return { part1, part2 };
};
