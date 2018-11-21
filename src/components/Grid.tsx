import * as React from 'react';
import { Card, Overlay, } from '@blueprintjs/core';

import { EmptyItem, Item, Shoe } from './Shoe';
import { InventoryItem } from './InventoryItem';
import { InventoryItemCSS, GridCSS } from './Styles';
import NewShoe from './Overlays/NewShoe';
import ShoeDetail from './Overlays/ShoeDetail';

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
  selected: number,
  shoes: (EmptyItem|Shoe)[],
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
      selected: 0,
      shoes: generateEmptyItems(props.x * props.y),
    };

    // Sometimes a controversial choice as it exposes more error space
    this.handleClick = this.handleClick.bind(this);
    this.createShoe = this.createShoe.bind(this);
    this.deleteShoe = this.deleteShoe.bind(this);
  }

  // Function to pass down to Inventory Item
  handleClick(id: number) {
    this.setState({
      selected: id,
      portal: true,
    });
  }

  createShoe(shoe: {brand: string, style: string, upc: string, size: string}) {
    let shoes = this.state.shoes.slice(0);
    shoes[this.state.selected] = new Shoe(shoe.brand, shoe.style, shoe.upc, shoe.size);
    this.setState({portal: false, shoes: shoes});
  }

  deleteShoe() {
    let shoes = [...this.state.shoes];
    shoes[this.state.selected] = new EmptyItem();
    this.setState({portal: false, shoes: shoes});
  }

  // Generate Cards
  genInventoryItems() {
    let i: JSX.Element[] = [];
    this.state.shoes.map((shoe, index) => {
      i.push(<InventoryItem key={index} id={index} handleClick={(id: number) => this.handleClick(id)} style={InventoryItemCSS} item={shoe} />);
    })
    return i;
  }

  // Generate Overlay Portal
  genOverlayText(): JSX.Element {
    let shoe = this.state.shoes[this.state.selected];
    if(shoe instanceof Shoe) {
      return(<ShoeDetail shoe={shoe} createShoe={this.createShoe} deleteShoe={this.deleteShoe} />);
    } else {
      return (<NewShoe createShoe={this.createShoe} />);
    }
  }

  render() {
    return(
      <div style={GridCSS()}>
        <Overlay usePortal={true} isOpen={this.state.portal} onClose={() => this.setState({portal: false})}>
          <Card style={{margin: '100px', position: 'relative'}}>
            { this.genOverlayText() }
          </Card>
        </Overlay>
        { this.genInventoryItems() }
      </div>
    );
  }

}

export default Grid;