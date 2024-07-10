import { BoolArray, BoolTable, Direction, getCounterVal, System } from '../helpers/systems';
import './ResultsTables.css';

function ResultTable ({ table }: { table: BoolTable }) {
  const mapToTd = (arr: BoolArray) => arr.map((v) => v === null ? '-' : Number(v).toString()).map((v,i) => <td key={i}>{v}</td>);
  return (
    <table>
      <thead>
        <tr>
          <th className="rotate">
            Q<small>B</small>
            Q<small>A</small>
            <hr/>
            Q<small>D</small>
            Q<small>C</small>
          </th>
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

function createPureTable (table: boolean[][], countSystem: System, direction: Direction, idx: number, csn: number) {
  const result: BoolTable = [[],[],[],[]];
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

function ResultTables ({ index, countSystem, direction, table }: { index: number, countSystem: System, direction: Direction, table: boolean[][] }) {
  return (
    <div className="result-table-container">
      { countSystem[0] && (
        <div className="result-table">
          <div>
            {countSystem[0]}
            <small>
              {['D', 'C', 'B', 'A'][index]}
            </small>
          </div>
          <ResultTable table={createPureTable(table, countSystem, direction, index, 0)}/>
        </div>
      )}
      { countSystem[1] && (
        <div className="result-table">
          <div>
            {countSystem[1]}
            <small>
              {['D', 'C', 'B', 'A'][index]}
            </small>
          </div>
          <ResultTable table={createPureTable(table, countSystem, direction, index, 1)} />
        </div>
      )}
    </div>
  );
}

export default ResultTables;
