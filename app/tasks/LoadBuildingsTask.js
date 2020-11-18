import papa from 'papaparse';
import { features } from '../data/campusmap.json';

class LoadBuildingsTask {
  load = (setState) => {
    setState(features);
  }
}

export default LoadBuildingsTask;
