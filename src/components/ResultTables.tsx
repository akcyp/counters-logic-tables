// import { useReducer, useState } from 'react';
import { getCounterVal } from '../helpers/systems';
import './ResultsTables.css';

function ResultTable ({ table }: { table: (boolean | null)[][] }) {
  const mapToTd = (arr: (boolean | null)[]) => arr.map((v) => v === null ? '-' : Number(v).toString()).map((v,i) => <td key={i}>{v}</td>);
  return (
    <table>
      <thead>
        <tr>
          <th style={{fontSize: '8px'}}>Q3Q4<br/>Q1Q2</th>
          <th>00</th>
          <th>01</th>
          <th>11</th>
          <th>10</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>00</th>
          { mapToTd(table[0]) }
        </tr>
        <tr>
          <th>01</th>
          { mapToTd(table[1]) }
        </tr>
        <tr>
          <th>11</th>
          { mapToTd(table[2]) }
        </tr>
        <tr>
          <th>10</th>
          { mapToTd(table[3]) }
        </tr>
      </tbody>
    </table>
  );
}

function createPureTable (table: boolean[][], countSystem: 'SR' | 'JK' | 'D', direction: 'reverse' | 'forward', idx: number, csn: number) {
  const result: (boolean | null)[][] = [[],[],[],[]];
  for (let i = 0, l = table.length; i < l; i++) {
    const [q1, q2, q3, q4] = table[i].map(Number);
    const prev = table[i][idx];
    const next = (table[i + (direction === 'forward' ? 1 : -1)] || (direction === 'forward' ? table[0] : table[l - 1]))[idx];
    const r = getCounterVal(prev, next, countSystem, countSystem[csn]);
    const x = ['00', '01', '11', '10'].indexOf(`${q1}${q2}`);
    const y = ['00', '01', '11', '10'].indexOf(`${q3}${q4}`);
    result[x][y] = r;
  }
  return result;
}

function ResultTables ({ index, countSystem, direction, table }: { index: number, countSystem: 'SR' | 'JK' | 'D', direction: 'reverse' | 'forward', table: boolean[][] }) {
  return (
    <div className="result-table-container">
      { countSystem[0] && (
        <div className="result-one-table-container">
          <div>{countSystem[0]}{index+1}</div>
          <ResultTable table={createPureTable(table, countSystem, direction, index, 0)}/>
          <br/>
        </div>
      )}
      { countSystem[1] && (
        <div className="result-one-table-container">
          <div>{countSystem[1]}{index+1}</div>
          <ResultTable table={createPureTable(table, countSystem, direction, index, 1)} />
          <br/>
        </div>
      )}
    </div>
  );
}

export default ResultTables;
