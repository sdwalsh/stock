import * as React from 'react';
import { Card, Overlay, } from '@blueprintjs/core';

import { EmptyItem, Item, Shoe } from './Shoe';
import { InventoryItem } from './InventoryItem';
import { InventoryItemCSS, GridCSS } from './Styles';
import NewShoe from './NewShoe';
import ShoeDetail from './ShoeDetail';

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
  form: {
    brand: string,
    style: string,
    upc: string,
    size: string,
  }
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
      form: {
        brand: '',
        style: '',
        upc: '',
        size: '',
      },
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

  // Controlled input function for EditableText (update onChange)
  handleEditableText(type: string, value: string) {
    let v = {};
    v[type] = value;
    this.setState(state => ({
      form: {
        ...state.form,
        ...v,
      }
    }));
  }

  createShoe(shoe: {brand: string, style: string, upc: string, size: string}) {
    let shoes = [...this.state.shoes];
    shoes[this.state.selected] = new Shoe(this.state.form.brand, this.state.form.style, this.state.form.upc, this.state.form.size);
    this.setState({portal: false, shoes: shoes});
  }

  deleteShoe() {
    let shoes = [...this.state.shoes];
    shoes[this.state.selected] = new EmptyItem();

    // clear form state
    let form = {
      brand: '',
      style: '',
      upc: '',
      size: '',
    }
    this.setState({portal: false, form: form, shoes: shoes});
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
      return(
        <ShoeDetail shoe={shoe} handleEditableText={(type: string, value: string) => this.handleEditableText(type, value)} createShoe={this.createShoe} deleteShoe={this.deleteShoe} />
      );
    }
    else {
      return (
        <NewShoe createShoe={this.createShoe} />
      );
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