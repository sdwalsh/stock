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
  let css: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: columns,
  }

  return css;

}

export const GridRowCSS: React.CSSProperties = {

}

export const InventoryItemCSS: React.CSSProperties = {
  margin: '10px'
}