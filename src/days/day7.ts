import { Context } from '../context';
import { Day } from '../types';

type ColorRule = {
  quantity: number;
  color: string;
};

type ContainmentMap = {
  [color: string]: ColorRule[];
};

const extractColorFromRule = (colorRule: ColorRule) => colorRule.color;

const parseRulesBottomUp = (rules) => {
  const map = {};
  for (const rule of rules) {
    const [container, contains] = rule.replace('.').split('contain');
    const [containerColor] = container.match(/(^[a-z]+ [a-z]+)/g);

    contains.split(',').forEach((colorRuleString) => {
      const [_, quantity, color] = /(\d+) ([a-z]+ [a-z]+)/g.exec(colorRuleString) ?? [];
      if (color) {
        const colorRule: ColorRule = { quantity: parseInt(quantity), color: containerColor };
        map[color] = map[color] ? [...map[color], colorRule] : [colorRule];
      }
    });
  }

  return map;
};

const colorOnlyTraverseContainmentMap = (searchColor, containmentMap: ContainmentMap) => {
  const traversedColorsSet = new Set();
  let possibleColors = [...containmentMap[searchColor].map(extractColorFromRule)];
  while (possibleColors.length > 0) {
    const currentColor = possibleColors.pop();
    traversedColorsSet.add(currentColor);
    if (currentColor && containmentMap[currentColor]) {
      possibleColors = [...possibleColors, ...containmentMap[currentColor].map(extractColorFromRule)];
    }
  }
  return traversedColorsSet;
};

const parseRulesTopDown = (rules) => {
  const map = {};
  for (const rule of rules) {
    const [container, contains] = rule.split('contain');
    const [containerColor] = container.match(/(^[a-z]+ [a-z]+)/g);
    contains.split(',').forEach((colorRuleString) => {
      const [_, quantity, color] = /(\d+) ([a-z]+ [a-z]+)/g.exec(colorRuleString) ?? [];
      if (color) {
        const colorRule: ColorRule = { quantity: parseInt(quantity), color };
        map[containerColor] = map[containerColor] ? [...map[containerColor], colorRule] : [colorRule];
      }
    });
  }

  return map;
};

const countContainedBags = (searchColor, containmentMap: ContainmentMap) => {
  let count = 0;
  let possibleColors = [searchColor];
  while (possibleColors.length > 0) {
    const currentColor = possibleColors.pop();
    if (!containmentMap[currentColor]) continue;
    for (const color of containmentMap[currentColor]) {
      if (color.color) {
        count += color.quantity;
        for (let i = 0; i < color.quantity; i += 1) possibleColors.push(color.color);
      }
    }
  }
  return count;
};

export const day7 = (context: Context): Day => {
  const rules = context.getDayInput(7);

  const part1 = () => colorOnlyTraverseContainmentMap('shiny gold', parseRulesBottomUp(rules)).size;

  const part2 = () => countContainedBags('shiny gold', parseRulesTopDown(rules));

  return { part1, part2 };
};
