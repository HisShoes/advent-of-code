import { Context } from '../context';
import { Day } from '../types';

const uniqueFilter = (value, index, self) => self.indexOf(value) === index;

export const day6 = (context: Context): Day => {
  const groups = context.getDayInput(6, '\r\n\r\n').map((str) => str.split('\r\n'));
  const uniqueGroupAnswers = groups.map((str) => str.join('')).map((str) => str.split('').filter(uniqueFilter));

  const part1 = () => {
    return uniqueGroupAnswers.reduce((acc, cur) => acc + cur.length, 0);
  };

  const part2 = () => {
    return uniqueGroupAnswers
      .map((groupAnswers, index) =>
        groupAnswers.filter((answer) => groups[index].every((person) => person.indexOf(answer) > -1)),
      )
      .reduce((acc, cur) => acc + cur.length, 0);
  };

  return { part1, part2 };
};
