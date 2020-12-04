import * as fs from 'fs';

const getDayInput = (dayNumber: number): string[] => fs.readFileSync(`./inputs/day${dayNumber}`, 'utf8').split('\n');

export const createContext = () => ({
  getDayInput,
});

export type Context = ReturnType<typeof createContext>;
