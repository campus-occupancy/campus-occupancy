import React from 'react';
import { _ } from 'meteor/underscore';
import './CovidSliderstyle.css';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'semantic-ui-react';
import { features } from '../../../data/campusmap.json';
import legendItems from '../../../entities/LegendItems';
import CovidMap from '../../api/Covid19/CovidMap';
import Legend from '../../api/Covid19/Legend';
import CovidSlider from '../../api/Covid19/covidSlider';
import { Datas } from '../../api/dataDensity/Datas';

function getDate(date) {
  const dateTime = _.pluck(Datas.collection.find({ densityData: date }).fetch(), 'dateTime');
  console.log(dateTime);
  return _.extend({ }, dateTime);
}
/* const options = _.map(ds => ({
      key: ds.dateTime,
      text: ds.dateTime,
      value: ds.dateTime,
    })); */
 const options = [
  { key: 1, text: 'Choice 1', value: 1 },
  { key: 2, text: 'Choice 2', value: 2 },
  { key: 3, text: 'Choice 3', value: 3 },
];

class Covid19Map extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.datas);
    this.load();
    this.state = {
      features: undefined,
    };
  }

  load = () => {
    // this.setState = setState;
    const covid19Data = this.props.datas;
    // console.log(`This is the data${this.props.datas}`);
    this.#processCovidData(covid19Data);

  };

  // covidBuildings = this.props.datas;

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
    // const mapData = processCovidData(this.props.datas);
    const legendItemsInReverse = [...legendItems].reverse();

    return (
        <div>
          <div className='container'>
            <div className="text-block">
              <Menu compact>
              <Dropdown
                  text='Date/time'
                  options={options}
                  onChange={this.getDate}
                  simple item
              />
            </Menu></div>
          </div>
            <CovidMap/>
          <Legend legendItems={legendItemsInReverse}/>
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
