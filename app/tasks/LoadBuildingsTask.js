import papa from 'papaparse';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { features } from '../data/campusmap.json';
import legendItems from '../entities/LegendItems';
import DataItem from '../imports/ui/components/DataItem';
import { Datas } from '../imports/api/dataDensity/Datas';

/**
* File: LoadBuildingsTask
* Description: This task of this class is basically to gather data and parses it into a json file
* which is then used by the Covid components to display it on the map
 */

class LoadBuildingsTask {

  covid19DataUrl = 'https://raw.githubusercontent.com/HACC2020/data/main/uh_occupancy/2020-0824_1200pm-259pm_devices_1598317333.csv';



  setState = null;

 load = (setState) => {
    this.setState = setState;
    //const covid19Data = this.props.data;
    //this.#processCovidData(covid19Data);
    papa.parse(this.covid19DataUrl, {
      download: true,
      dynamicTyping: true,
      header: true,
      complete: (result) => {
        // console.log(result);
        this.#processCovidData(result.data); // read datas collection
        // this.#sliderProcessData(result.data);
      },
    });

  };

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
}

/** Require an array of Stuff documents in the props. */
DataItem.propTypes = {
  data: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default (LoadBuildingsTask);
