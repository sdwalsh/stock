import * as React from 'react';
import { EmptyItem, Item } from './Shoe';
import { InventoryItem } from './InventoryItem';
import { InventoryItemCSS } from './Styles';

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
  shoes: Item[]
}

// Generate n number of Empty Items
function generateEmptyItems(n: number) {
  let s: Item[] = new Array(n);
  
  s = s.map((shoe, index) => {
    return new EmptyItem();
  })
  return s;
}

export class Grid extends React.Component<IGridProps, IGridState> {
  constructor(props: IGridProps) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y,
      shoes: generateEmptyItems(props.x * props.y),
    }
  }

  render() {
    return(
      <InventoryItem style={InventoryItemCSS} item={this.state.shoes[0]} />
    );
  }

}

export default Grid;