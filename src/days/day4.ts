import { Context } from '../context';
import { Day } from '../types';

type Passport = {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
};

type ValidationFunction = (p: Passport) => Boolean;

const checkNumberMinMax = (num, min, max) => parseInt(num) >= min && parseInt(num) <= max;

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const validations: ValidationFunction[] = [
  ({ byr }) => checkNumberMinMax(byr, 1920, 2002),
  ({ iyr }) => checkNumberMinMax(iyr, 2010, 2020),
  ({ eyr }) => checkNumberMinMax(eyr, 2020, 2030),
  ({ hgt }) => {
    switch (hgt.slice(-2)) {
      case 'cm':
        return checkNumberMinMax(hgt.slice(0, -2), 150, 193);
      case 'in':
        return checkNumberMinMax(hgt.slice(0, -2), 59, 76);
      default:
        return false;
    }
  },
  ({ hcl }) => hcl.slice(0, 1) === '#' && hcl.slice(1).length === 6 && parseInt(hcl.slice(1)) !== NaN,
  ({ ecl }) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(ecl) > -1,
  ({ pid }) => pid.length === 9 && parseInt(pid) !== NaN,
];

const validatePassportKeys = (passport) => requiredFields.every((key) => passport[key]);

const validatePassportValues = (passport) => validations.every((validation) => validation(passport));

export const day4 = (context: Context): Day => {
  const passports = context
    .getDayInput(4, '\r\n\r\n')
    .map((passport) =>
      passport
        .replace(/\r\n/g, ' ')
        .split(' ')
        .map((pair) => pair.split(':'))
        .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), <Passport>{}),
    )
    .filter(validatePassportKeys);

  const part1 = () => {
    return passports.length;
  };

  const part2 = () => {
    return passports.filter(validatePassportValues).length;
  };

  return { part1, part2 };
};
