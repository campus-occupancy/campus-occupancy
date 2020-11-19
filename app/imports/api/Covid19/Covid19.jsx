/* PLAN TO ADD STUFF HERE */
import React, { useState, useEffect } from 'react';
import LoadBuildingsTask from '../../../tasks/LoadBuildingsTask';
import CovidMap from './CovidMap';
import Legend from './Legend';
import Loading from './Loading';

const Covid19 = () => {
  const [buildings, setBuildings] = useState([]);

  const load = () => {
    const loadBuildingsTask = new LoadBuildingsTask();
    loadBuildingsTask.load(setBuildings);
  };

  useEffect(load, []);

  return (
      <div>
        {buildings.length === 0 ? <Loading/> : <div><CovidMap/><Legend/></div>}
      </div>); // I plan to make legend the slider
};

export default Covid19;
