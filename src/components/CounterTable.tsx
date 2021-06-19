import { useReducer, useState } from 'react';
import './CounterTable.css';
import ResultTables from './ResultTables';

import { Direction, getInitialTable, System } from '../helpers/systems';

type CounterTableState = {
  length: number;
  table: boolean[][];
};

type CounterTableAction = {
  type: 'reset' | 'zero'
} | {
  type: 'toggle',
  x: number,
  y: number
};

function counterTableReducer(state: CounterTableState, action: CounterTableAction) {
  switch (action.type) {
    case 'reset': return { length: 4, table: getInitialTable(4) };
    case 'zero': return { length: 4, table: getInitialTable(4, true) };
    case 'toggle': {
      const newTable = [...state.table.map(arr => [...arr])];
      newTable[action.y][action.x] = !newTable[action.y][action.x];
      return { length: state.length, table: newTable };
    }
  }
}

function CounterTable() {
  const [counterTable, dispatchCounterTable] = useReducer(counterTableReducer, {
    length: 4,
    table: getInitialTable(4)
  });
  const [countDirection, setCountDirection] = useState<Direction>('forward');
  const [countSystem, setCountSystem] = useState<System>('SR');
  return (
    <div className="cards">
      <div className="counter-table-container">
        <table>
          <thead>
            <tr>
              <th/>
              {Array.from({length: counterTable.length}, (_, n) => (
                <th key={n}>
                  Q
                  <small>
                    {['D', 'C', 'B', 'A'][n]}
                  </small>
                </th>
              ))}
              <th/>
            </tr>
          </thead>
          <tbody>
            {counterTable.table.map((bools, y) => (
              <tr key={y}>
                <th>{y}</th>
                {bools.map((b, x) => (
                  <td key={x} onClick={() => {
                    dispatchCounterTable({ type: 'toggle', x, y });
                  }}>
                    {Number(b)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="buttons-container">
          <button onClick={() => dispatchCounterTable({ type: 'zero' })}>
            Zero
          </button>
          <button onClick={() => setCountDirection(countDirection === 'forward' ? 'reverse' : 'forward')}>
            {countDirection}
          </button>
          <button onClick={() => setCountSystem(countSystem === 'D' ? 'SR' : (countSystem === 'SR' ? 'JK' : 'D'))}>
            {countSystem}
          </button>
        </div>
      </div>
      <div className="result-tables">
        {Array.from({length: counterTable.length}, (_, i) => (
          <ResultTables key={i} index={i} countSystem={countSystem} direction={countDirection} table={counterTable.table} />
        ))}
      </div>
    </div>
  );
}

export default CounterTable;
