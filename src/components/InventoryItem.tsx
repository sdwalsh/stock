import * as React from 'react';
import { Button, ButtonGroup, Card, Elevation, Intent } from '@blueprintjs/core';
import { InventoryItemCSS } from './Styles';
import { Shoe, Item } from './Shoe';

export interface IIventoryItemProps {
  item: Item,
  style: React.CSSProperties,
}

export class InventoryItem extends React.Component <IIventoryItemProps, object> {
  render() {
    let s = this.props.item instanceof Shoe;

    return (
      <Card style={this.props.style} interactive={true} elevation={Elevation.TWO}>
        <ButtonGroup>
          <Button intent={Intent.PRIMARY} disabled={s}>Add</Button>
          <Button intent={Intent.PRIMARY} disabled={!s}>Edit</Button>
          <Button intent={Intent.DANGER} disabled={!s}>Remove</Button>
        </ButtonGroup>
      </Card>
    );
  }
}

export default InventoryItemCSS;