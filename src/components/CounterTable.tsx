import { useReducer, useState } from 'react';
import './CounterTable.css';
import ResultTables from './ResultTables';

import { getInitialTable } from '../helpers/systems';

type CounterTableState = {
  length: number;
  table: boolean[][];
};

type CounterTableAction = {
  type: 'increaseLength' | 'decreaseLength' | 'reset'
} | {
  type: 'toggle',
  x: number,
  y: number
};

function counterTableReducer(state: CounterTableState, action: CounterTableAction) {
  switch (action.type) {
    case 'reset': return { length: 3, table: getInitialTable(3) };
    case 'toggle': {
      const newTable = [...state.table.map(arr => [...arr])];
      newTable[action.y][action.x] = !newTable[action.y][action.x];
      return { length: state.length, table: newTable };
    }
    case 'increaseLength': {
      if (state.length > 3) break;
      return { length: state.length + 1, table: getInitialTable(state.length + 1) };
    }
    case 'decreaseLength': {
      if (state.length < 3) break;
      return { length: state.length - 1, table: getInitialTable(state.length - 1) };
    }
  }
  return state;
}

function CounterTable() {
  const [counterTable, dispatchCounterTable] = useReducer(counterTableReducer, {
    length: 4,
    table: getInitialTable(4)
  });
  const [countDirection, setCountDirection] = useState<'forward' | 'reverse'>('forward');
  const [countSystem, setCountSystem] = useState<'SR' | 'JK' | 'D'>('SR');
  return (
    <div className="counter-system">
      <div className="counter-table-container">
        <table className="counter-table">
          <thead>
            <tr>
              <td onClick={() => {
                // dispatchCounterTable({ type: 'decreaseLength' });
              }}>-</td>
              {Array.from({length: counterTable.length}, (_, n) => (
                <th key={n}>Q{n+1}</th>
              ))}
              <td onClick={() => {
                // dispatchCounterTable({ type: 'increaseLength' });
              }}>+</td>
            </tr>
          </thead>
          <tbody>
            {counterTable.table.map((bools, y) => (
              <tr key={y}>
                <th>{y}</th>
                {bools.map((b, x) => (
                  <td key={x} onClick={() => {
                    dispatchCounterTable({ type: 'toggle', x, y });
                  }}>{Number(b)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="buttons-div">
          <button onClick={() => {
            dispatchCounterTable({ type: 'reset' });
          }}>Reset</button>
          <button onClick={() => setCountDirection(countDirection === 'forward' ? 'reverse' : 'forward')}>{countDirection}</button>
          <button onClick={() => setCountSystem(countSystem === 'D' ? 'SR' : (countSystem === 'SR' ? 'JK' : 'D'))}>{countSystem}</button>
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
