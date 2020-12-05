import { Context } from '../context';
import { Day } from '../types';

enum BinaryDirections {
  UPPER = 'B',
  LOWER = 'F',
}

const binaryTraversal = (bstring: BinaryDirections[], low, high) => {
  if (low === high || bstring.length === 0) return low;

  const delta = (high + 1 - low) / 2;
  if (bstring[0] === BinaryDirections.UPPER) {
    return binaryTraversal(bstring.slice(1), low + delta, high);
  }

  return binaryTraversal(bstring.slice(1), low, high - delta);
};

const findSeatPosition = ([rows, columns]) => {
  const row = binaryTraversal(rows, 0, 127);
  const column = binaryTraversal(columns, 0, 7);
  return row * 8 + column;
};

export const day5 = (context: Context): Day => {
  const seatNumbers = context
    .getDayInput(5, '\n')
    .map((pass) => pass.replace(/R/g, BinaryDirections.UPPER).replace(/L/g, BinaryDirections.LOWER))
    .map((pass) => [pass.slice(0, 7).split(''), pass.slice(7).split('')])
    .map(findSeatPosition)
    .sort((a, b) => b - a);

  const part1 = () => seatNumbers[0];

  const part2 = () => {
    for (let i = 0; i < seatNumbers.length - 1; i += 1) {
      if (seatNumbers[i] === seatNumbers[i + 1] + 2) {
        return seatNumbers[i] - 1;
      }
    }
  };

  return { part1, part2 };
};
