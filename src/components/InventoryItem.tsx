import * as React from 'react';
import { Card, Elevation, H2, H4 } from '@blueprintjs/core';
import { InventoryItemCSS } from './Styles';
import { EmptyItem, Shoe } from './Shoe';

export interface IIventoryItemProps {
  id: number,
  item: (EmptyItem|Shoe),
  style: React.CSSProperties,
  handleClick: (id: number) => void,
}

export class InventoryItem extends React.Component <IIventoryItemProps, object> {

  onClick() {
    return this.props.handleClick(this.props.id);
  }

  render() {
    let contents: JSX.Element;
    if (this.props.item instanceof Shoe) {
      contents = (
        <div>
          <H2>{this.props.item.brand}</H2>
          <H4>{this.props.item.style}</H4>
          <p>size: <span style={{fontStyle: 'italic'}}>{this.props.item.size}</span> upc: <span style={{fontStyle: 'italic'}}>{this.props.item.upc}</span></p>
        </div>
      );
    }
    else {
      contents = (
        <div>
          <p>Place a shoe here</p>
        </div>
      );
    }

    return (
      <Card onClick={() => this.onClick()} style={this.props.style} interactive={true} elevation={Elevation.TWO}>
        {contents}
      </Card>
    );
  }
}

export default InventoryItemCSS;