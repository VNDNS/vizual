import { generateData } from './generateData';
import { interpolate } from './interpolate';
import data from '../../../data.json';

export const generateInterpolatedData = (n: number, m: number, t: number, names?: string[]) => {
  return data.map((d) => ({value: interpolate(d.values, t), name: d.name}));
};
