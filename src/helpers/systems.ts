export const systems: {
  SR: (boolean | null)[][],
  JK: (boolean | null)[][],
  D: (boolean | null)[]
} = {
  SR: [[false, null], [true, false], [false, true], [null, false]],
  JK: [[false, null], [true, null], [null, true], [null, false]],
  D: [false, true, false, true]
};
export function getCounterVal (input: boolean, output: boolean, system: 'SR' | 'JK' | 'D', expected?: string): boolean | null {
  const index = Number(input) * 2 + Number(output);
  const vals = systems[system][index];
  if (!Array.isArray(vals)) return vals;
  if (expected === 'R' || expected === 'K') return vals[1];
  return vals[0];
}

export function getInitialTable (n: number, zeroMode = false) {
  if (zeroMode) return Array.from({length: 2**n}, () => Array.from({length: n}, () => false));
  return Array.from({length: 2**n}, (_, i) => i.toString(2).padStart(n, '0').split('').map(s => s === '1'));
}
