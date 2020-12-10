import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Datas } from '../../api/dataDensity/Datas';
import { features } from '../../../data/campusmap.json';
import legendItems from '../../../entities/LegendItems';
import LoadBuildingsTask from '../../../tasks/LoadBuildingsTask';
import Loading from '../../api/Covid19/Loading';
import CovidSlider from '../../api/Covid19/covidSlider';
import CovidMap from '../../api/Covid19/CovidMap';
import Legend from '../../api/Covid19/Legend';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
 class Covid19Map extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  covidBuildings = this.props.datas;

  #processCovidData = (covidBuildings) => {
    for (let i = 0; i < features.length; i++) {
      const building = features[i];
      // eslint-disable-next-line no-shadow,no-loop-func
      const covidBuilding = covidBuildings.find((covidBuilding) => building.properties.Building === covidBuilding.Building);

      building.properties.confirmed = 0;
      building.properties.confirmedText = '0';

      if (covidBuilding != null) {
        const confirmed = covidBuilding['Unique Clients'];
        // console.log(covidBuilding['Unique Clients']);
        building.properties.confirmed = confirmed;
        building.properties.confirmedText = confirmed;
      }
      this.#setBuildingColor(building);
    }

    this.setState(features);

  };

  #setBuildingColor = (building) => {
    const legendItem = legendItems.find((item) => item.isFor(building.properties.confirmed));

    // eslint-disable-next-line no-param-reassign
    if (legendItem != null) building.properties.color = legendItem.color;
  };

  Covid19 = () => {
    const [buildings, setBuildings] = useState([]); // possibly have to change this line

    const load = () => { // have to change this line
      const loadBuildingsTask = new LoadBuildingsTask();
      loadBuildingsTask.load(setBuildings);
    };

    useEffect(load, []);
  };

  renderPage() {
    const legendItemsInReverse = [...legendItems].reverse();
    const [buildings, setBuildings] = useState([]); // possibly have to change this line

    return (
        <div>
          {buildings.length === 0 ? <Loading/> : <div>
            <div className='container'>
              <div className="text-block"><CovidSlider/></div>
            </div>
            <CovidMap/>
            <Legend legendItems={legendItemsInReverse}/>
          </div>
          }
        </div>

    );
  }
}
/** Require an array of Stuff documents in the props. */
Covid19Map.propTypes = {
  datas: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Data documents.
  const subscription = Meteor.subscribe('Datas');
  return {
    datas: Datas.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Covid19Map);
