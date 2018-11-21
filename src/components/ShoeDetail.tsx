import * as React from 'react';
import { Button, ButtonGroup, EditableText, H2, H4, Intent } from '@blueprintjs/core';
import { Shoe } from './Shoe';

export interface IShoeDetailProps {
  shoe: Shoe,
  handleEditableText: (type: string, value: string) => void,
  createShoe: (shoe: {brand: string, style: string, upc: string, size: string}) => void,
  deleteShoe: () => void,
}

export class ShoeDetail extends React.Component<IShoeDetailProps, object> {
  render() {
    return (
      <div>
        <H2><EditableText onChange={(value) => this.props.handleEditableText('brand', value)} defaultValue={this.props.shoe.brand} /></H2>
        <H2><EditableText onChange={(value) => this.props.handleEditableText('style', value)} defaultValue={this.props.shoe.style} /></H2>
        <H4>Size: <EditableText onChange={(value) => this.props.handleEditableText('size', value)} defaultValue={this.props.shoe.size}/></H4>
        <H4>UPC: <EditableText onChange={(value) => this.props.handleEditableText('upc', value)} defaultValue={this.props.shoe.upc} /></H4>
        <ButtonGroup fill={true}>
          <Button onClick={this.props.deleteShoe} intent={Intent.DANGER} icon="trash">Delete</Button>
          <Button onClick={this.props.createShoe} intent={Intent.PRIMARY} icon="refresh">Update</Button>            
        </ButtonGroup>
      </div>
    )
  }
}

export default ShoeDetail;