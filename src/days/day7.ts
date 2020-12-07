import { Context } from '../context';
import { Day } from '../types';

const parseRules = (rules) => {
  const map = {};
  for (const rule of rules) {
    const [container, contains] = rule.replace('.').split('contain');
    const [containerColor] = container.match(/(^[a-z]+ [a-z]+)/g);

    for (const colorBag of contains.match(/([a-z]+ [a-z]+) bag/g)) {
      const color = colorBag.replace(' bag', '');
      map[color] = map[color] ? [...map[color], containerColor] : [containerColor];
    }
  }

  return map;
};

const traverseContainmentMap = (searchColor, containmentMap) => {
  const traversedColorsSet = new Set();
  let possibleColors = [...containmentMap[searchColor]];
  while (possibleColors.length > 0) {
    const currentColor = possibleColors.pop();
    traversedColorsSet.add(currentColor);
    if (containmentMap[currentColor]) {
      possibleColors = [...possibleColors, ...containmentMap[currentColor]];
    }
  }
  return traversedColorsSet;
};

export const day7 = (context: Context): Day => {
  const rules = context.getDayInput(7);

  const part1 = () => {
    const colorContainedByMap = parseRules(rules);
    const ColorsContainingGold = traverseContainmentMap('shiny gold', colorContainedByMap);
    return ColorsContainingGold.size;
  };
  const part2 = () => {};
  return { part1, part2 };
};
