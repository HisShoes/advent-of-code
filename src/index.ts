import { Context, createContext } from './context';
import { day11 } from './days/day11';
// import { day1 } from './days/day1';
// import { day10 } from './days/day10';
// import { day2 } from './days/day2';
// import { day3 } from './days/day3';
// import { day4 } from './days/day4';
// import { day5 } from './days/day5';
// import { day6 } from './days/day6';
// import { day7 } from './days/day7';
// import { day8 } from './days/day8';
// import { day9 } from './days/day9';

const context: Context = createContext();

const days = [day11];

days.forEach((day) => {
  const d = day(context);
  console.log(d.part1());
  console.log(d.part2());
});
