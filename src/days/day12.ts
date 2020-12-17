import { Context } from '../context';
import { Day } from '../types';

enum CardinalDirections {
  'E',
  'S',
  'W',
  'N',
}

enum RotationModifier {
  L = -1,
  R = 1,
}

const movementModifiers = {
  E: (x, y, magnitude) => [x + magnitude, y],
  W: (x, y, magnitude) => [x - magnitude, y],
  S: (x, y, magnitude) => [x, y - magnitude],
  N: (x, y, magnitude) => [x, y + magnitude],
};

const moveTowardWaypoint = (x, y, wx, wy, magnitude) => [x + wx * magnitude, y + wy * magnitude, wx, wy];

const degreesToRadians = (angle) => (angle * Math.PI) / 180;

const rotatePoint = (x, y, rotation) =>
  [
    Math.cos(degreesToRadians(rotation)) * x + Math.sin(degreesToRadians(rotation)) * y,
    Math.cos(degreesToRadians(rotation)) * y - Math.sin(degreesToRadians(rotation)) * x,
  ].map((coord) => Math.round(coord));

const updateDirection = (currentDir, rotation) => {
  return (4 + currentDir + rotation / 90) % 4;
};

export const day12 = (context: Context): Day => {
  const directions = context
    .getDayInput(12)
    .map((row) => ({ command: row.slice(0, 1), magnitude: parseInt(row.slice(1), 10) }));

  const part1 = () => {
    const finalShipPosition = directions.reduce(
      ([x, y, dir], cur) => {
        if (['E', 'S', 'W', 'N'].includes(cur.command))
          return [...movementModifiers[cur.command](x, y, cur.magnitude), dir];
        if (['L', 'R'].includes(cur.command))
          return [x, y, updateDirection(dir, cur.magnitude * RotationModifier[cur.command])];
        if (['F'].includes(cur.command))
          return [...movementModifiers[CardinalDirections[dir]](x, y, cur.magnitude), dir];

        console.log('should never get here');
        return [x, y, dir];
      },
      [0, 0, 0],
    );

    return Math.abs(finalShipPosition[0]) + Math.abs(finalShipPosition[1]);
  };

  const part2 = () => {
    const finalShipPosition = directions.reduce(
      ([x, y, wx, wy], cur) => {
        if (['E', 'S', 'W', 'N'].includes(cur.command))
          return [x, y, ...movementModifiers[cur.command](wx, wy, cur.magnitude)];
        if (['L', 'R'].includes(cur.command))
          return [x, y, ...rotatePoint(wx, wy, cur.magnitude * RotationModifier[cur.command])];
        if (['F'].includes(cur.command)) return moveTowardWaypoint(x, y, wx, wy, cur.magnitude);

        console.log('should never get here');
        return [x, y, wx, wy];
      },
      [0, 0, 10, 1],
    );
    return Math.abs(finalShipPosition[0]) + Math.abs(finalShipPosition[1]);
  };
  return { part1, part2 };
};
