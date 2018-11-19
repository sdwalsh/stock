import { CSSProperties } from 'react';
import { DisplayProperty } from 'csstype';

/*
  CSS Styles

  Using CSS Grid
  https://caniuse.com/#feat=css-grid
  ~88.3% (firefox, chrome, safari, edge)
*/

export function GridCSS(columns: DisplayProperty = 'repeat(5, 20%)') {
  let GridRowCSS: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: columns,
    gridRowGap: '10em',
    gridColumnGap: '5em',
  }

  return GridRowCSS;

}

export const GridRowCSS: React.CSSProperties = {

}

export const InventoryItemCSS: React.CSSProperties = {
}