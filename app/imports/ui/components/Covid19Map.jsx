import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import papa from 'papaparse';
import { Datas } from '../../api/dataDensity/Datas';
import { features } from '../../../data/campusmap.json';
import legendItems from '../../../entities/LegendItems';
import LoadBuildingsTask from '../../../tasks/LoadBuildingsTask';
import Loading from '../../api/Covid19/Loading';
import CovidSlider from '../../api/Covid19/covidSlider';
import CovidMap from '../../api/Covid19/CovidMap';
import Legend from '../../api/Covid19/Legend';

/*

const Covid19 = () => {
  const [buildings, setBuildings] = useState([]); // possibly have to change this line
  const legendItemsInReverse = [...legendItems].reverse();

  const load = (setState) => {
    this.setState = setState;
    const covid19Data = this.props.data;
    this.processCovidData(covid19Data);

  };

  useEffect(load, []);
  return (
      <div>
        {buildings.length === 0 ? <Loading/> : <div>
          <div className='container'>
            <div className="text-block"><CovidSlider/></div>
          </div>
          <CovidMap/>

        </div>
        }
      </div>);
}; */

 class Covid19Map extends React.Component {
   constructor(props) {
     super(props);
     console.log(this.props.datas);
     this.load();
     console.log(this.load);
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
     console.log(`This is the data${this.props.datas}`);
     this.#processCovidData(covid19Data);

   };

    //covidBuildings = this.props.datas;

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
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  renderPage() {
     // const mapData = processCovidData(this.props.datas);
     const legendItemsInReverse = [...legendItems].reverse();

    return (
        <div>
           <div>
            <div className='container'>
              <div className="text-block"><CovidSlider/></div>
            </div>
            <CovidMap/>
            <Legend legendItems={legendItemsInReverse}/>
          </div>
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
