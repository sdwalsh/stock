import * as React from 'react';
import { Button, ButtonGroup, Card, H3, Overlay, EditableText, FormGroup, Label, InputGroup, Intent } from '@blueprintjs/core';

import { EmptyItem, Item, Shoe } from './Shoe';
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
  selected: number,
  editShoe: {
    brand: string,
    style: string,
    upc: string,
    size: number,
  }
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
      selected: 0,
      editShoe: {
        brand: '',
        style: '',
        upc: '',
        size: 0,
      },
      shoes: generateEmptyItems(props.x * props.y),
    }

    this.handleClick = this.handleClick.bind(this);
    this.createNewShoe = this.createNewShoe.bind(this);
    this.editShoe = this.editShoe.bind(this);
  }

  handleClick(id: number) {
    this.setState({
      selected: id,
      portal: true,
    });
  }

  createNewShoe() {

  }

  updateShoe() {
    
  }

  editShoe(value: string | number) {

  }

  genInventoryItems() {
    let i: JSX.Element[] = [];
    this.state.shoes.map((shoe, index) => {
      i.push(<InventoryItem key={index} id={index} handleClick={(id: number) => this.handleClick(id)} style={InventoryItemCSS} item={shoe} />);
    })
    return i;
  }

  genOverlayText(): JSX.Element {
    let shoe = this.state.shoes[this.state.selected];

    if(shoe instanceof Shoe) {
      this.setState({
        editShoe: {
          brand: shoe.brand,
          style: shoe.style,
          upc: shoe.upc,
          size: shoe.size,
        }
      });

      return(
        <div>
          <H3><EditableText onConfirm={(value) => this.editShoe(value)} defaultValue={shoe.brand} /> --- <EditableText onChange={(value) => this.editShoe(value)} defaultValue={shoe.style} /></H3>
          <p>Size: <EditableText onConfirm={(value) => this.editShoe(value)} defaultValue={shoe.size.toString()}/></p>
          <p>UPC: <EditableText onConfirm={(value) => this.editShoe(value)} defaultValue={shoe.upc} /></p>
          <ButtonGroup fill={true}>
            <Button onClick={() => this.updateShoe()} intent={Intent.PRIMARY} icon="plus">Update</Button>
          </ButtonGroup>
        </div>
      );
    }
    else {
      this.setState({
        editShoe: {
          brand: '',
          style: '',
          upc: '',
          size: 0,
        }
      });

      return (
        <div>
          <FormGroup>
            <H3>Add a New Item</H3>
            <Label>Brand: <InputGroup id="input-brand" placeholder="Brand" /></Label>
            <Label>Style: <InputGroup id="input-style" placeholder="Style" /></Label>
            <Label>UPC: <InputGroup id="input-upc" placeholder="UPC" /></Label>
            <Label>Size: <InputGroup id="input-size" placeholder="Size" /></Label>
            <ButtonGroup fill={true}>
              <Button onClick={() => this.createNewShoe()} intent={Intent.PRIMARY} icon="plus">Create</Button>
            </ButtonGroup>
          </FormGroup>
        </div>
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