import { Context, createContext } from './context';
import { day1 } from './days/day1';
import { day2 } from './days/day2';
import { day3 } from './days/day3';
import { day4 } from './days/day4';
import { day5 } from './days/day5';
import { day6 } from './days/day6';
import { day7 } from './days/day7';
import { day8 } from './days/day8';

const context: Context = createContext();

const days = [day1, day2, day3, day4, day5, day6, day7, day8];

days.forEach((day) => {
  console.log(day(context).part1());
  console.log(day(context).part2());
});
