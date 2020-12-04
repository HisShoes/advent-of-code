import { Context } from '../context';

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
    const count = countTreesForTrajectory(1, 3);
    console.log(count);
    return count;
  };

  const part2 = () => {
    const counts = [
      countTreesForTrajectory(1, 1),
      countTreesForTrajectory(1, 3),
      countTreesForTrajectory(1, 5),
      countTreesForTrajectory(1, 7),
      countTreesForTrajectory(2, 1),
    ];
    const result = counts.reduce((acc, cur) => acc * cur, 1);
    console.log(result);
    return counts;
  };

  return { part1, part2 };
};
