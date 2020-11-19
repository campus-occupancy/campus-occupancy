import papa from 'papaparse';
import { features } from '../data/campusmap.json';

class LoadBuildingsTask {
  covid19DataUrl = 'https://raw.githubusercontent.com/HACC2020/data/main/uh_occupancy/2020-0824_1200pm-259pm_devices_1598317333.csv';

  setState = null;

  load = (setState) => {
    this.setState = setState;
    papa.parse(this.covid19DataUrl, {
      download: true,
      header: true,
      complete: (result) => this.#processCovidData(result.data),
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
        const confirmed = Number(covidBuilding.UniqueClients);
        building.properties.confirmed = confirmed;
        building.properties.confirmedText = confirmed;
      }

    }

    this.setState(features);

  };
}

export default LoadBuildingsTask;
