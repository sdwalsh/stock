import * as React from 'react';
import { H1 } from '@blueprintjs/core';
import './App.css';
import { Grid } from './components/Grid';

class App extends React.Component {
  public render() {
    let rootCSS = {
      maxWidth: '800px',
      margin: '25px auto',
    }

    return (
      <div style={rootCSS} className="App">
        <H1>Inventory Grid</H1>
        <Grid x={5} y={5} />
      </div>
    );
  }
}

export default App;
