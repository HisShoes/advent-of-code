import { Context } from '../context';
import { Day } from '../types';

type Counts = {
  1: number;
  2: number;
  3: number;
};

const count = (acc: Counts, cur, index, array) => {
  const diff = cur - array[index - 1];
  if (diff === 0 || index - 1 < 0) return acc;
  return { ...acc, [diff]: acc[diff] + 1 };
};

const emptyCount = (): Counts => ({ 1: 0, 2: 0, 3: 0 });

const countVariations = () => {
  const cache = {
    1: 1,
    2: 1,
    3: 2,
    4: 4,
    5: 7,
  };

  const theCount = (arr) => cache[arr.length];

  return theCount;
};

export const day10 = (context: Context): Day => {
  const ratings = context
    .getDayInput(10)
    .map((jolts) => parseInt(jolts))
    .sort((a, b) => a - b);
  ratings.unshift(0);
  ratings.push(ratings[ratings.length - 1] + 3);

  const part1 = () => {
    const ratingsCount = ratings.reduce(count, emptyCount());
    return ratingsCount[1] * ratingsCount[3];
  };

  const part2 = () => {
    const variationSlices: number[][] = [];
    let start = 0;
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i + 1] > ratings[i] + 1) {
        variationSlices.push(ratings.slice(start, i + 1));
        start = i + 1;
      }
    }

    return variationSlices
      .filter((a) => a.length > 1)
      .map(countVariations())
      .reduce((acc, cur) => acc * cur, 1);
  };
  return { part1, part2 };
};
