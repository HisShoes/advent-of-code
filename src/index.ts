import { Context, createContext } from './context';
import { day1 } from './days/day1';
import { day2 } from './days/day2';
import { day3 } from './days/day3';
import { day4 } from './days/day4';
import { day5 } from './days/day5';

const context: Context = createContext();

const days = [day1(context), day2(context), day3(context), day4(context), day5(context)];

days.forEach((day) => {
  console.log(day.part1());
  console.log(day.part2());
});
