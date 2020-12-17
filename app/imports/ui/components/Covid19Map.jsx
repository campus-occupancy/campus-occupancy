import React, { useRef } from 'react';
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


/* const options = _.map(ds => ({
      key: ds.dateTime,
      text: ds.dateTime,
      value: ds.dateTime,
    })); */
 const options = [
  { key: 1, text: '2020-0824_300am-559am', value: '2020-0824_300am-559am' },
  { key: 2, text: '2020-0824_600pm-859pm', value: '2020-0824_600pm-859pm' },
  { key: 3, text: '2020-0824_900am-1159am', value: '2020-0824_900am-1159am' },
];

class Covid19Map extends React.Component {

  constructor(props) {
    super(props);
    // console.log(this.props.datas);
    this.load();
    this.state = {
      features: undefined,
      target: '2020-0824_300am-559am',
    };
    this.getDates = this.getDates.bind(this);
  }

  load = () => {
    // this.setState = setState;
    const covid19Data = this.props.datas;
    //const stuffs = covid19Data.filter(stuffs => );
    // console.log(`This is the data${this.props.datas}`);
    this.#processCovidData(covid19Data);
  };

   getDates(event) {
     const targets = event.target.textContent;
    /* const temp = Datas.find({}).fetch();
    const dateTime = _.pluck(temp, 'dateTime');
    console.log(dateTime);
    console.log(_.extend({ }, dateTime));
    const data = _.extend({ }, dateTime);*/
     this.setState({
       target: targets,
     });
     console.log(targets);
  }

  // covidBuildings = this.props.datas;

  #processCovidData = (covidBuildings) => {
     let target = '2020-0824_300am-559am';
     if (this.state !== undefined) {
       target = this.state.target;
     }
    for (let i = 0; i < features.length; i++) {
      const building = features[i];
      // eslint-disable-next-line no-shadow,no-loop-func
      //const covidBuilding = covidBuildings.find((covidBuilding) => building.properties.Building === covidBuilding.Building);
      // eslint-disable-next-line no-shadow
      const covidBuilding = covidBuildings.find((covidBuilding) => building.properties.Building ===
          covidBuilding.Building && covidBuilding.dateTime === target);

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
                  onChange={this.getDates}
                  options={options}
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
