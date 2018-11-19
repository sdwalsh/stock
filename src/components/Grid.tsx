import * as React from 'react';
import { Card, Overlay } from '@blueprintjs/core';

import { EmptyItem, Item } from './Shoe';
import { InventoryItem } from './InventoryItem';
import { InventoryItemCSS, GridCSS } from './Styles';

/*
  Grid Prop and State Interfaces
*/

export interface IGridProps {
  x: number,
  y: number,
}

export interface IGridState {
  x: number,
  y: number,
  portal: boolean,
  shoes: Item[],
}

// Generate n number of Empty Items
function generateEmptyItems(n: number) {
  let s: Item[] = [];
  for(let x = 0; x < n; x++) {
    s.push(new EmptyItem())
  }
  return s;
}

export class Grid extends React.Component<IGridProps, IGridState> {
  constructor(props: IGridProps) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y,
      portal: false,
      shoes: generateEmptyItems(props.x * props.y),
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id: number) {
    console.log(id);
    this.setState({portal: true})
  }

  genInventoryItems() {
    let i: JSX.Element[] = [];
    this.state.shoes.map((shoe, index) => {
      i.push(<InventoryItem key={index} id={index} handleClick={(id: number) => this.handleClick(id)} style={InventoryItemCSS} item={shoe} />);
    })
    return i;
  }

  render() {
    return(
      <div style={GridCSS()}>
        <Overlay usePortal={true} isOpen={this.state.portal} onClose={() => this.setState({portal: false})}>
          <Card style={{margin: '100px', position: 'relative'}}>
            <h3>Overlaid contents...</h3>
          </Card>
        </Overlay>
        { this.genInventoryItems() }
      </div>
    );
  }

}

export default Grid;