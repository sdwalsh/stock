import * as React from 'react';
import { Button, ButtonGroup, FormGroup, H3, InputGroup, Intent, Label } from '@blueprintjs/core';

export interface INewShoeProps {
  createShoe: (shoe: {brand: string, style: string, upc: string, size: string}) => void,
}

export interface INewShoeState {
  brand: string,
  style: string,
  upc: string,
  size: string,
}

export class NewShoe extends React.Component<INewShoeProps, INewShoeState> {
  constructor(props: INewShoeProps) {
    super(props);

    this.state = {
      brand: '',
      style: '',
      upc: '',
      size: '',
    };

    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    };
    this.setState(state => ({
      ...state,
      ...v
    }));
  }

  handleClick() {
    // Copy state and empty it
    let s = Object.assign({}, this.state)
    this.setState({
      brand: '',
      style: '',
      upc: '',
      size: '',
    });

    return this.props.createShoe(s);
  }

  render() {
    return (
      <FormGroup>
        <H3>Add a New Item</H3>
        <Label>Brand: <InputGroup onChange={this.handleFormUpdate} id="input-brand" placeholder="Brand" /></Label>
        <Label>Style: <InputGroup onChange={this.handleFormUpdate} id="input-style" placeholder="Style" /></Label>
        <Label>UPC: <InputGroup onChange={this.handleFormUpdate} id="input-upc" placeholder="UPC" /></Label>
        <Label>Size: <InputGroup onChange={this.handleFormUpdate} id="input-size" placeholder="Size" /></Label>
        <ButtonGroup fill={true}>
          <Button onClick={this.handleClick} intent={Intent.PRIMARY} icon="plus">Create</Button>
        </ButtonGroup>
      </FormGroup>
    );
  }
  
}

export default NewShoe;