/* eslint-disable @typescript-eslint/no-loop-func */
import { Context } from '../context';
import { Day } from '../types';

enum TileState {
  FLOOR = '.',
  PERSON = '#',
  EMPTY = 'L',
}

const getAdjacentTiles = (seats, x, y) => [
  (seats[y] ?? [])[x - 1] ?? TileState.FLOOR,
  (seats[y] ?? [])[x + 1] ?? TileState.FLOOR,
  (seats[y - 1] ?? [])[x] ?? TileState.FLOOR,
  (seats[y + 1] ?? [])[x] ?? TileState.FLOOR,
  (seats[y - 1] ?? [])[x - 1] ?? TileState.FLOOR,
  (seats[y + 1] ?? [])[x + 1] ?? TileState.FLOOR,
  (seats[y - 1] ?? [])[x + 1] ?? TileState.FLOOR,
  (seats[y + 1] ?? [])[x - 1] ?? TileState.FLOOR,
];

const findFirstSeat = (seats, x, y, deltaX, deltaY) => {
  const newX = x + deltaX;
  const newY = y + deltaY;
  if (!seats[newY] || !seats[newY][newX]) return TileState.FLOOR;
  if (seats[newY][newX] !== TileState.FLOOR) return seats[newY][newX];
  return findFirstSeat(seats, newX, newY, deltaX, deltaY);
};

const getAdjacentSeats = (seats, x, y) => [
  findFirstSeat(seats, x, y, 1, 1),
  findFirstSeat(seats, x, y, 1, 0),
  findFirstSeat(seats, x, y, 0, 1),
  findFirstSeat(seats, x, y, 1, -1),
  findFirstSeat(seats, x, y, -1, 1),
  findFirstSeat(seats, x, y, -1, -1),
  findFirstSeat(seats, x, y, -1, 0),
  findFirstSeat(seats, x, y, 0, -1),
];

const processPerson = (adjacentSeats, antisocialTolerance) =>
  adjacentSeats.filter((s) => s === TileState.PERSON).length >= antisocialTolerance
    ? TileState.EMPTY
    : TileState.PERSON;

const processEmpty = (adjacentSeats) =>
  adjacentSeats.filter((s) => s === TileState.PERSON).length === 0 ? TileState.PERSON : TileState.EMPTY;

const processTile = (adjacentSeats, seat, antisocialTolerance = 4) => {
  if (seat === TileState.PERSON) return processPerson(adjacentSeats, antisocialTolerance);
  if (seat === TileState.EMPTY) return processEmpty(adjacentSeats);
  return seat;
};

const countFilledSeats = (seats) =>
  seats
    .join()
    .split(',')
    .filter((s) => s === TileState.PERSON).length;

export const day11 = (context: Context): Day => {
  const seats = context.getDayInput(11).map((row) => row.split(''));

  const part1 = () => {
    let newSeats = [...seats];
    let lastCount = -1;
    let newCount = countFilledSeats(newSeats);
    while (newCount !== lastCount) {
      lastCount = newCount;
      newSeats = newSeats.map((row, y) => row.map((seat, x) => processTile(getAdjacentTiles(newSeats, x, y), seat)));
      newCount = countFilledSeats(newSeats);
    }

    return newCount;
  };

  const part2 = () => {
    let newSeats = [...seats];
    let lastCount = -1;
    let newCount = countFilledSeats(newSeats);
    while (newCount !== lastCount) {
      lastCount = newCount;
      newSeats = newSeats.map((row, y) => row.map((seat, x) => processTile(getAdjacentSeats(newSeats, x, y), seat, 5)));
      newCount = countFilledSeats(newSeats);
    }

    return newCount;
  };
  return { part1, part2 };
};
