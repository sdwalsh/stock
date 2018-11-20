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
    }

    // Sometimes a controversial choice as it exposes more error space
    this.handleClick = this.handleClick.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
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

  // Controlled input function for text input (update onChange)
  // Details below:
  // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
  // https://blueprintjs.com/docs/#core/components/text-inputs
  handleFormUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    let v = {};
    switch(e.target.id) {
      case('input-brand'):
        v = { brand: e.target.value };
        break;
      case('input-style'):
        v = { style: e.target.value };
        break;
      case('input-size'):
        v = { size: e.target.value };
        break;
      case('input-upc'):
        v = { upc: e.target.value };
        break;
      default:
        break;
    }
    this.setState(state => ({
      form: {
        ...state.form,
        ...v,
      }
    }));
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

  createShoe() {
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
        <NewShoe handleFormUpdate={this.handleFormUpdate} createShoe={this.createShoe} />
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