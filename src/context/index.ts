import * as fs from 'fs';

const getDayInput = (dayNumber: number, splitBy = '\n'): string[] =>
  fs.readFileSync(`./inputs/day${dayNumber}`, 'utf8').split(splitBy);

export const createContext = () => ({
  getDayInput,
});

export type Context = ReturnType<typeof createContext>;
