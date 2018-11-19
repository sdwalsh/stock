import * as React from 'react';
import { Shoe } from './Shoe';

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
  shoes: Shoe[]
}

class Grid extends React.Component<IGridProps, IGridState> {

}

export default Grid;