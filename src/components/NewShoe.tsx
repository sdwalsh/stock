import * as React from 'react';
import { Button, ButtonGroup, FormGroup, H3, InputGroup, Intent, Label } from '@blueprintjs/core';

export interface INewShoeProps {
  handleFormUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void,
  createShoe: () => void,
}

export class NewShoe extends React.Component<INewShoeProps, object> {
  render() {
    return (
      <FormGroup>
        <H3>Add a New Item</H3>
        <Label>Brand: <InputGroup onChange={this.props.handleFormUpdate} id="input-brand" placeholder="Brand" /></Label>
        <Label>Style: <InputGroup onChange={this.props.handleFormUpdate} id="input-style" placeholder="Style" /></Label>
        <Label>UPC: <InputGroup onChange={this.props.handleFormUpdate} id="input-upc" placeholder="UPC" /></Label>
        <Label>Size: <InputGroup onChange={this.props.handleFormUpdate} id="input-size" placeholder="Size" /></Label>
        <ButtonGroup fill={true}>
          <Button onClick={this.props.createShoe} intent={Intent.PRIMARY} icon="plus">Create</Button>
        </ButtonGroup>
      </FormGroup>
    );
  }
  
}

export default NewShoe;