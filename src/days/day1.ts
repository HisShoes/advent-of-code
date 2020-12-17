/* eslint-disable no-restricted-syntax */
import { Context } from '../context';
import { Day } from '../types';

export const day1 = (context: Context): Day => {
  const findTripletTarget = (data, totalTarget) => {
    for (let i = 0; i < data.length; i += 1) {
      const target = totalTarget - data[i];
      const filteredData = data.filter((_, idx) => idx !== i);
      const result = context.findSumToTarget(filteredData, target);
      if (result.length > 0) {
        return data[i] * result.reduce((c, a) => c * a, 1);
      }
    }
    return -1;
  };

  const part1 = () => {
    const data = context
      .getDayInput(1)
      .sort()
      .map((s) => parseInt(s, 10));

    return context.findSumToTarget(data, 2020).reduce((c, a) => c * a, 1);
  };

  const part2 = () => {
    const data = context
      .getDayInput(1)
      .sort()
      .map((s) => parseInt(s, 10));

    return findTripletTarget(data, 2020);
  };

  return { part1, part2 };
};
