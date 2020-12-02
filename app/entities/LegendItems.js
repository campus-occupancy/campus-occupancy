/*
* FILE: LegendItems.js
* DESCRIPTION: This file builds out a data structure that represents the legend
*/
import LegendItem from './LegendItem';

/*
* Function Name: legendItems
* DESCRIPTION: This is a list of legend items
*/
const legendItems = [
  new LegendItem(
      '30+',
      '#EA2027',
      (cases) => cases >= 30,
      'white',
  ),
  new LegendItem(
      '20 - 29',
      '#d35400',
      (cases) => cases >= 20 && cases < 30,
      'white',
  ),
  new LegendItem(
      '10 - 19',
      '#f39c12',
      (cases) => cases >= 10 && cases < 20,
  ),
  new LegendItem(
      '0 - 9',
      '#2ecc71',
      (cases) => cases >= 0 && cases < 10,
  ),
];

export default legendItems;
