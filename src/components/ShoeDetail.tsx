import * as React from 'react';
import { Button, ButtonGroup, EditableText, H2, H4, Intent } from '@blueprintjs/core';
import { Shoe } from './Shoe';

export interface IShoeDetailProps {
  shoe: Shoe,
  createShoe: (shoe: {brand: string, style: string, upc: string, size: string}) => void,
  deleteShoe: () => void,
}

export interface IShoeDetailState {
  brand: string,
  style: string,
  upc: string,
  size: string,  
}

export class ShoeDetail extends React.Component<IShoeDetailProps, IShoeDetailState> {
  constructor(props: IShoeDetailProps) {
    super(props);

    this.state = {
      brand: '',
      style: '',
      upc: '',
      size: '',
    };

    this.handleEditableText = this.handleEditableText.bind(this);
  }

  // Controlled input function for EditableText (update onChange)
  handleEditableText(type: string, value: string) {
    let v = {};
    v[type] = value;
    this.setState(state => ({
      ...state,
      ...v,
    }));
  }

  handleClick(type: string) {
    switch(type) {
      case('delete'):
        return this.props.deleteShoe();
      case('update'):
        let s = Object.assign({}, this.state)
        this.setState({
          brand: '',
          style: '',
          upc: '',
          size: '',
        });
        return this.props.createShoe(s);
      default:
        return;
    }    
  }

  render() {
    return (
      <div>
        <H2><EditableText onChange={(value) => this.handleEditableText('brand', value)} defaultValue={this.props.shoe.brand} /></H2>
        <H2><EditableText onChange={(value) => this.handleEditableText('style', value)} defaultValue={this.props.shoe.style} /></H2>
        <H4>Size: <EditableText onChange={(value) => this.handleEditableText('size', value)} defaultValue={this.props.shoe.size}/></H4>
        <H4>UPC: <EditableText onChange={(value) => this.handleEditableText('upc', value)} defaultValue={this.props.shoe.upc} /></H4>
        <ButtonGroup fill={true}>
          <Button onClick={() => this.handleClick('delete')} intent={Intent.DANGER} icon="trash">Delete</Button>
          <Button onClick={() => this.handleClick('update')} intent={Intent.PRIMARY} icon="refresh">Update</Button>            
        </ButtonGroup>
      </div>
    )
  }
}

export default ShoeDetail;