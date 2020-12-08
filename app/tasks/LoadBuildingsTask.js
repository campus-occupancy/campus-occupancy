import papa from 'papaparse';
import { _ } from 'meteor/underscore';
import { features } from '../data/campusmap.json';
import legendItems from '../entities/LegendItems';

/**
* File: LoadBuildingsTask
* Description: This task of this class is basically to gather data and parses it into a json file
* which is then used by the Covid components to display it on the map
 */

// eslint-disable-next-line no-unused-vars
let covidBuilding;

// let building;

class LoadBuildingsTask {

  covid19DataUrl = 'https://raw.githubusercontent.com/HACC2020/data/main/uh_occupancy/2020-0824_1200pm-259pm_devices_1598317333.csv';

  setState = null;

  load = (setState) => {
    this.setState = setState;
    papa.parse(this.covid19DataUrl, {
      download: true,
      dynamicTyping: true,
      header: true,
      complete: (result) => {
        // console.log(result);
        this.#processCovidData(result.data);
        // this.#sliderProcessData(result.data);
      },
    });

  };

  #processCovidData = (covidBuildings) => {
    // let confirmed;
    /* for (let i = 0; i < features.length; i++) {
      building = features[i];
      // eslint-disable-next-line no-shadow,no-loop-func
      covidBuilding = covidBuildings.find((covidBuilding) => building.properties.Building === covidBuilding.Building);

      building.properties.confirmed = 0;
      building.properties.confirmedText = '0';

      if (covidBuilding != null) {
        const confirmed = covidBuilding['Unique Clients'];
        // console.log(covidBuilding['Unique Clients']);
        building.properties.confirmed = confirmed;
        building.properties.confirmedText = confirmed;
      }
      this.#setBuildingColor(building);
    } */

    const output = [];
    const bybuilding = _.groupBy(covidBuildings, 'Building');
    // const output = [];
    // eslint-disable-next-line no-loop-func
    _.each(bybuilding, function (arrayOfColor) {
      const computedItem = { Building: '', 'Unique Clients': 0 };
      _.each(arrayOfColor, function (item) {
        computedItem.Building = item.Building;
        computedItem['Unique Clients'] += item['Unique Clients'];
      });
      output.push(computedItem);
    });

    // console.log(output);

    for (let i = 0; i < features.length; i++) {
      const building = features[i];
      // eslint-disable-next-line no-shadow,no-loop-func
      const samebuilding = output.find((samebuilding) => building.properties.Building === output[i].Building);
      console.log(typeof samebuilding);
      // console.log(`These are the output buildings:${output[i].Building}`);
      // console.log(`These are the building properties: ${building.properties.Building}`);
      building.properties.confirmed = 0;
      building.properties.confirmedText = '0';


        const confirmed = samebuilding['Unique Clients'];
        console.log(`These are the same: ${samebuilding['Unique Clients']}`);
        building.properties.confirmed = confirmed;
        building.properties.confirmedText = confirmed;

      this.#setBuildingColor(building);
    }

    // console.log(output);
    /* const similarbuildng = covidBuildings.filter(thing => thing['Unique Clients'] > 30);
    console.log(similarbuildng); */

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

export default LoadBuildingsTask;
