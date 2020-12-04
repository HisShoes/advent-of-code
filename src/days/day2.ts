import { Context } from '../context';
import { Day } from '../types';

type Policy = {
  first: string;
  second: string;
  letter: string;
};

const parseRules = (policyString) => {
  const matches = policyString.match(/([0-9]+)-([0-9]+) ([a-zA-Z])/);
  return {
    first: matches[1],
    second: matches[2],
    letter: matches[3],
  };
};

const parsePolicyAndPassword = (d) => ({
  policy: parseRules(d.split(': ')[0]),
  password: d.split(': ')[1],
});

const sledRentalPasswordValidator = (password, policy: Policy) => {
  const policyValidator = new RegExp(`(${policy.letter})`, `g`);
  const matches = (password.match(policyValidator) || []).length;
  if (matches < policy.first || matches > policy.second) {
    return false;
  }
  return true;
};

const tobogganCorpValidator = (password: string, policy: Policy) => {
  let valid = false;
  const first = password.charAt(parseInt(policy.first, 10) - 1);
  const second = password.charAt(parseInt(policy.second, 10) - 1);
  if (first === policy.letter) {
    valid = !valid;
  }
  if (second === policy.letter) {
    valid = !valid;
  }
  return valid;
};

const validPasswordsReducer = (validator) => (acc, curr) => {
  if (validator(curr.password, curr.policy)) {
    return acc + 1;
  }
  return acc;
};

export const day2 = (context: Context): Day => {
  const part1 = () => {
    const validCount = context
      .getDayInput(2)
      .map(parsePolicyAndPassword)
      .reduce(validPasswordsReducer(sledRentalPasswordValidator), 0);

    console.log(validCount);
    return validCount;
  };

  const part2 = () => {
    const validCount = context
      .getDayInput(2)
      .map(parsePolicyAndPassword)
      .reduce(validPasswordsReducer(tobogganCorpValidator), 0);

    console.log(validCount);
    return validCount;
  };

  return { part1, part2 };
};
