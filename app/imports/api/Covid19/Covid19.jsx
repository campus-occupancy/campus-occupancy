/* PLAN TO ADD STUFF HERE */
import React, { useState, useEffect } from 'react';
import './CovidSliderstyle.css';
import LoadBuildingsTask from '../../../tasks/LoadBuildingsTask';
import CovidMap from './CovidMap';
import Legend from './Legend';
import Loading from './Loading';
import CovidSlider from './covidSlider';
import legendItems from '../../../entities/LegendItems';

const Covid19 = () => {
  const [buildings, setBuildings] = useState(['s']);
  const legendItemsInReverse = [...legendItems].reverse();
  const load = () => {
    const loadBuildingsTask = new LoadBuildingsTask();
    loadBuildingsTask.load(setBuildings);
  };

  useEffect(load, []);

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
      </div>);
};

export default Covid19;
