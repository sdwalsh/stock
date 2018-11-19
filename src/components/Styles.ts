import { CSSProperties } from 'react';
import { DisplayProperty } from 'csstype';

/*
  CSS Styles

  Using CSS Grid
  https://caniuse.com/#feat=css-grid
  Global ~88.3% (firefox, chrome, safari, edge, partial IE)
  US ~90.0% (firefox, chrome, safari, edge,  partial IE)
*/

export function GridCSS(columns: DisplayProperty = 'repeat(5, 20%)') {
  let GridRowCSS: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: columns,
    gridRowGap: '2em',
    gridColumnGap: '1em',
  }

  return GridRowCSS;

}

export const GridRowCSS: React.CSSProperties = {

}

export const InventoryItemCSS: React.CSSProperties = {
}