import * as React from 'react';
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
  shoes: Item[]
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
      shoes: generateEmptyItems(props.x * props.y),
    }
  }

  genInventoryItems() {
    let i: JSX.Element[] = [];
    this.state.shoes.map((shoe, index) => {
      i.push(<InventoryItem style={InventoryItemCSS} item={shoe} />);
    })
    return i;
  }

  render() {
    return(
      <div style={GridCSS()}>
        { this.genInventoryItems() }
      </div>
    );
  }

}

export default Grid;