/* eslint-disable no-restricted-syntax */
import { Context } from '../context';

const findTarget = (data, target) => {
  const step = (start, end): number => {
    if (data[start] + data[end] === target) {
      return data[start] * data[end];
    }

    if (start > end) {
      return -1;
    }

    if (data[start] + data[end] > target) {
      return step(start, end - 1);
    }

    return step(start + 1, end);
  };

  return step(0, data.length - 1);
};

const findTripletTarget = (data, totalTarget) => {
  for (let i = 0; i < data.length; i += 1) {
    const target = totalTarget - data[i];
    const filteredData = data.filter((_, idx) => idx !== i);
    const result = findTarget(filteredData, target);
    if (result > -1) {
      console.log(data[i] * result);
      return data[i] * result;
    }
  }
  return -1;
};

export const day1 = (context: Context): Day => {
  const part1 = () => {
    const data = context
      .getDayInput(1)
      .sort()
      .map((s) => parseInt(s, 10));

    const result = findTarget(data, 2020);
    console.log(result);
    return result;
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
