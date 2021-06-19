export type BoolNull = boolean | null;
export type BoolArray = BoolNull[];
export type BoolTable = BoolArray[];
export type Direction = 'forward' | 'reverse';
export type System = 'SR' | 'JK' | 'D';

export const systems = {
  SR: [[false, null], [true, false], [false, true], [null, false]],
  JK: [[false, null], [true, null], [null, true], [null, false]],
  D: [false, true, false, true]
};

export function getCounterVal (input: boolean, output: boolean, system: System, expected?: string): BoolNull {
  const index = Number(input) * 2 + Number(output);
  const vals = systems[system][index];
  if (!Array.isArray(vals)) return vals;
  if (expected === 'R' || expected === 'K') return vals[1];
  return vals[0];
};

export function getInitialTable (n: number, zeroMode = false) {
  if (zeroMode) return Array.from({length: 2**n}, () => Array.from({length: n}, () => false));
  return Array.from({length: 2**n}, (_, i) => i.toString(2).padStart(n, '0').split('').map(s => s === '1'));
};
