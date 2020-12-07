import papa from 'papaparse';
import { features } from '../data/campusmap.json';
import legendItems from '../entities/LegendItems';

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
    papa.parse('2020-0824_600pm-859pm_devices_1598338888.csv', {
      download: true,
      dynamicTyping: true,
      header: true,
      complete: (result) => {
        console.log(result);
        this.#processCovidData(result.data);
        // this.#sliderProcessData(result.data);
      },
    });

  };

  #processCovidData = (covidBuildings) => {
    for (let i = 0; i < features.length; i++) {
      const building = features[i];
      // eslint-disable-next-line no-shadow
      const covidBuilding = covidBuildings.find((covidBuilding) => building.properties.Building === covidBuilding.Building);

      building.properties.confirmed = 0;
      building.properties.confirmedText = '0';

      if (covidBuilding != null) {
        const similarbuilding = covidBuildings.filter( age => age > 18 );
        console.log(similarbuilding);
        const confirmed = covidBuilding['Unique Clients'];
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

export default LoadBuildingsTask;
