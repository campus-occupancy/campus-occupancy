import papa from 'papaparse';
import { features } from '../data/campusmap.json';
import legendItems from '../entities/LegendItems';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { _ } from 'meteor/underscore';
import { Datas } from '../imports/api/dataDensity/Datas';

/**
* File: LoadBuildingsTask
* Description: This task of this class is basically to gather data and parses it into a json file
* which is then used by the Covid components to display it on the map
 */
class LoadBuildingsTask {

  setState = null;
  // I removed the papaparse, since I dont think its possible to use in on the colelction
  load = (setState) => {
    this.setState = setState;
    // So to avoid removing all the work you have done, I tried to just work with the collection dirrection
    const test = Datas.find({}).fetch(); // load the datas from collection
    console.log(test);
    this.#processCovidData(test);
  };

  #processCovidData = (covidBuildings) => {
    for (let i = 0; i < features.length; i++) {
      const building = features[i];
      // eslint-disable-next-line no-shadow
      const covidBuilding = covidBuildings.find((covidBuilding) => {
        return building.properties.Building === covidBuilding.Building });

      building.properties.confirmed = 0;
      building.properties.confirmedText = '0';

      if (covidBuilding != null) {
        console.log(covidBuilding);
        const confirmed = covidBuilding['Unique'];
        building.properties.confirmed = confirmed;
        building.properties.confirmedText = confirmed;
      }
      this.#setBuildingColor(building);
    }

    this.setState(features);

  };
  /**
   * Ideally I want this to filter data in a similar way to #processCovidData, but it needs to connect to the slider somehow
   */
 /* #sliderProcessData = () => {
    for (let i = 0; i < features.length; i++) {
      const building = features[i];
      // eslint-disable-next-line no-shadow
      const covidBuilding = covidBuildings.find((covidBuilding) => building.properties.Building === covidBuilding.Building);

      building.properties.confirmed = 0;
      building.properties.confirmedText = '0';

      if (covidBuilding != null) {
        const confirmed = covidBuilding['Unique Clients'];
        building.properties.confirmed = confirmed;
        building.properties.confirmedText = confirmed;
      }
      this.#setBuildingColor(building);
    }

    this.setState(features);

  };
  } */

  #setBuildingColor = (building) => {
    const legendItem = legendItems.find((item) => item.isFor(building.properties.confirmed));

    // eslint-disable-next-line no-param-reassign
    if (legendItem != null) building.properties.color = legendItem.color;
  };
}
LoadBuildingsTask.propTypes = {
  datas: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Datas');
  return {
    datas: Datas.find({}).fetch(),
    ready: subscription.ready(),
  };
})(LoadBuildingsTask);

export default LoadBuildingsTask;
