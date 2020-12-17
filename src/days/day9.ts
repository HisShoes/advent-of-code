import { Context } from '../context';
import { Day } from '../types';

export const day9 = (context: Context): Day => {
  const findSumToTarget = (preamble, num) =>
    context.findSumToTarget(
      preamble.sort((a, b) => a - b),
      num,
    );

  const findInvalidNumber = (preamble, numberList) => {
    if (numberList.length === 0) return -1;

    if (findSumToTarget([...preamble], numberList[0]).length < 1) {
      return numberList[0];
    }

    return findInvalidNumber([...preamble, numberList[0]].slice(1), numberList.slice(1));
  };

  const findSliceThatSumsToTarget = (numbers, target) => {
    let start = 0,
      end = 0;

    while (start < numbers.length && end < numbers.length) {
      const curSlice = numbers.slice(start, end);
      const sumTotal = curSlice.reduce((c, a) => a + c, 0);
      if (sumTotal === target) return curSlice;
      if (sumTotal > target) start += 1;
      if (sumTotal < target) end += 1;
    }
    return [];
  };

  const numbers = context.getDayInput(9).map((n) => parseInt(n));
  const preambleCount = 25;
  const preamble = numbers.slice(0, preambleCount);
  const numberList = numbers.slice(preambleCount);
  const invalidNumber = findInvalidNumber(preamble, numberList);
  const sortedSumSlice = findSliceThatSumsToTarget(numbers, invalidNumber).sort((a, b) => a - b);

  const part1 = () => invalidNumber;
  const part2 = () => sortedSumSlice[0] + sortedSumSlice[sortedSumSlice.length - 1];
  return { part1, part2 };
};
