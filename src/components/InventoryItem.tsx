import * as React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { InventoryItemCSS } from './Styles';
import { Item } from './Shoe';

export interface IIventoryItemProps {
  id: number,
  item: Item,
  style: React.CSSProperties,
  handleClick: (id: number) => void,
}

export class InventoryItem extends React.Component <IIventoryItemProps, object> {

  onClick() {
    return this.props.handleClick(this.props.id);
  }

  render() {
    // let s = this.props.item instanceof Shoe;

    return (
      <Card onClick={() => this.onClick()} style={this.props.style} interactive={true} elevation={Elevation.TWO}>
        <p>Contents</p>
      </Card>
    );
  }
}

export default InventoryItemCSS;