import { Context, createContext } from './context';
import { day1 } from './days/day1';
import { day2 } from './days/day2';
import { day3 } from './days/day3';

const context: Context = createContext();

const days = {
  day1: day1(context),
  day2: day2(context),
  day3: day3(context),
};

days.day3.part2();
