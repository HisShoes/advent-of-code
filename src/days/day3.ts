import { Context } from '../context';
import { Day } from '../types';

enum SlopeMap {
  TREE = '#',
  SLOPE = '.',
}

export const day3 = (context: Context): Day => {
  const data = context.getDayInput(3).map((a) => a.split(''));

  const capWidth = (n) => n % data[0].length;

  const countTreesForTrajectory = (down, right) => {
    let x = 0;
    let count = 0;

    for (let y = 0; y < data.length; y += down) {
      if (data[y][x] === SlopeMap.TREE) {
        count += 1;
      }
      x = capWidth(x + right);
    }

    return count;
  };

  const part1 = () => {
    return countTreesForTrajectory(1, 3);
  };

  const part2 = () => {
    return [
      countTreesForTrajectory(1, 1),
      countTreesForTrajectory(1, 3),
      countTreesForTrajectory(1, 5),
      countTreesForTrajectory(1, 7),
      countTreesForTrajectory(2, 1),
    ].reduce((acc, cur) => acc * cur, 1);
  };

  return { part1, part2 };
};
