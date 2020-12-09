import { Context } from '../context';
import { Day } from '../types';

type Command = { op: string; arg: number };

const processCode = (commands, visitedMap = {}) => {
  const processLine = (accumulator, index) => {
    if (visitedMap[index] || index >= commands.length) {
      return [accumulator, index];
    }
    visitedMap[index] = true;
    switch (commands[index].op) {
      case 'jmp':
        return processLine(accumulator, index + commands[index].arg);
      case 'acc':
        return processLine(accumulator + commands[index].arg, index + 1);
      case 'nop':
        return processLine(accumulator, index + 1);
    }
  };
  return processLine;
};

const fixCode = (commands: Command[]) => {
  let curFixIndex = 0;

  const changeNearestJmpNop = ({ op, arg }: Command, index) => {
    if (curFixIndex === index) {
      if (op === 'jmp') return { op: 'nop', arg };
      if (op === 'nop') return { op: 'jmp', arg };
      curFixIndex += 1;
    }
    return { op, arg };
  };

  let endIndex = 0;
  let result = 0;
  while (endIndex < commands.length || curFixIndex >= commands.length) {
    [result, endIndex] = processCode(commands.map(changeNearestJmpNop))(0, 0);
    curFixIndex += 1;
  }
  return result;
};

export const day8 = (context: Context): Day => {
  const commands: Command[] = context
    .getDayInput(8)
    .map((r) => r.split(' '))
    .map(([op, arg]) => ({ op, arg: parseInt(arg) }));

  const part1 = () => processCode(commands)(0, 0);
  const part2 = () => fixCode(commands);
  return { part1, part2 };
};
