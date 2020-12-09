import * as fs from 'fs';

const getDayInput = (dayNumber: number, splitBy = '\n'): string[] =>
  fs.readFileSync(`./inputs/day${dayNumber}`, 'utf8').split(splitBy);

const findSumToTarget = (data, target) => {
  const step = (start, end): number[] => {
    if (data[start] + data[end] === target) {
      return [data[start], data[end]];
    }

    if (start > end) {
      return [];
    }

    if (data[start] + data[end] > target) {
      return step(start, end - 1);
    }

    return step(start + 1, end);
  };

  return step(0, data.length - 1);
};

export const createContext = () => ({
  getDayInput,
  findSumToTarget,
});

export type Context = ReturnType<typeof createContext>;
