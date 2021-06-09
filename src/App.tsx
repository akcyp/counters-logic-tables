import React from 'react';
import './App.css';

import CounterTable from './components/CounterTable';

function App() {
  return (
    <div className="App">
      <header>
        <div>Logic maps generator</div>
      </header>
      <main>
        <CounterTable />
      </main>
    </div>
  );
}

export default App;
