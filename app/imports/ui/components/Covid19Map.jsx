import React from 'react';
import PropTypes from 'prop-types';
import { features } from '../../../data/campusmap.json';
import legendItems from '../../../entities/LegendItems';
import CovidMap from '../../api/Covid19/CovidMap';
import Legend from '../../api/Covid19/Legend';

 class Covid19Map extends React.Component {
   constructor(props) {
     super(props);
     console.log(this.props.datas);
     this.load();
     this.state = {
       Buildings: undefined,
     };
   }

   handleChange = event => {
     this.setState({
       buildings: event.target.buildings[0],
     });
   };

   load = () => {
     // this.setState = setState;
     const covid19Data = this.props.datas;
     // console.log(`This is the data${this.props.datas}`);
     this.#processCovidData(covid19Data);

   };

    // covidBuildings = this.props.datas;

   #processCovidData = (covidBuildings) => {
     for (let i = 0; i < features.length; i++) {
       const building = features[i];
       // eslint-disable-next-line no-shadow,no-loop-func
       const covidBuilding = covidBuildings.find((covidBuilding) => building.properties.Building === covidBuilding.Building);

       building.properties.confirmed = 0;
       building.properties.confirmedText = '0';

       if (covidBuilding != null) {
         const confirmed = covidBuilding.Unique;
         // console.log(covidBuilding['Unique Clients']);
         building.properties.confirmed = confirmed;
         building.properties.confirmedText = confirmed;
       }
       this.#setBuildingColor(building);
     }

     this.setState(features);

   }

   #setBuildingColor = (building) => {
     const legendItem = legendItems.find((item) => item.isFor(building.properties.confirmed));

     // eslint-disable-next-line no-param-reassign
     if (legendItem != null) building.properties.color = legendItem.color;
   }

  render() {
     // const mapData = processCovidData(this.props.datas);
     const legendItemsInReverse = [...legendItems].reverse();

    return (
        <div>
            <div className='container'>
            </div>
            <CovidMap/>
            <Legend legendItems={legendItemsInReverse}/>
        </div>
        // <div> THIS IS A MAP</div>

    );
  }
}
/** Require an array of Stuff documents in the props. */
Covid19Map.propTypes = {
  datas: PropTypes.array.isRequired,
  // ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default (Covid19Map);
