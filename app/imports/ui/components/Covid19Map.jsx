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
   { key: 2, text: '2020-0824_600am-859am', value: '2020-0824_600am-859am' },
   { key: 3, text: '2020-0824_900am-1159am', value: '2020-0824_900am-1159am' },
   { key: 4, text: '2020-0824_1200pm-259pm', value: '2020-0824_1200pm-259pm' },
   { key: 5, text: '2020-0824_300pm-559pm', value: '2020-0824_300pm-559pm' },
   { key: 6, text: '2020-0824_600pm-859pm', value: '2020-0824_600pm-859pm' },
   { key: 7, text: '2020-0824_900pm-1159pm', value: '2020-0824_900pm-1159pm' },
   { key: 8, text: '2020-0825_1200am-259am', value: '2020-0825_1200am-259am' },
   { key: 9, text: '2020-0825_300am-559am', value: '2020-0825_300am-559am' },
   { key: 10, text: '2020-0825_600am-859am', value: '2020-0825_600am-859am' },
   { key: 11, text: '2020-0825_900am-1159am', value: '2020-0825_900am-1159am' },
   { key: 12, text: '2020-0825_1200pm-259pm', value: '2020-0825_1200pm-259pm' },
   { key: 13, text: '2020-0825_300pm-559pm', value: '2020-0825_300pm-559pm' },
   { key: 14, text: '2020-0825_600pm-859pm', value: '2020-0825_600pm-859pm' },
   { key: 15, text: '2020-0825_900pm-1159pm', value: '2020-0825_900pm-1159pm' },
   { key: 16, text: '2020-0826_1200am-259am', value: '2020-0826_1200am-259am' },
   { key: 17, text: '2020-0826_300am-559am', value: '2020-0826_300am-559am' },
   { key: 18, text: '2020-0826_600am-859am', value: '2020-0826_600am-859am' },
   { key: 19, text: '2020-0826_900am-1159am', value: '2020-0826_900am-1159am' },
   { key: 20, text: '2020-0826_1200pm-259pm', value: '2020-0826_1200pm-259pm' },
   { key: 21, text: '2020-0826_300pm-559pm', value: '2020-0826_300pm-559pm' },
   { key: 22, text: '2020-0826_600pm-859pm', value: '2020-0826_600pm-859pm' },
   { key: 23, text: '2020-0826_900pm-1159pm', value: '2020-0826_900pm-1159pm' },
   { key: 24, text: '2020-0827_1200am-259am', value: '2020-0827_1200am-259am' },
   { key: 25, text: '2020-0827_300am-559am', value: '2020-0827_300am-559am' },
   { key: 26, text: '2020-0827_600am-859am', value: '2020-0827_600am-859am' },
   { key: 27, text: '2020-0827_900am-1159am', value: '2020-0827_900am-1159am' },
   { key: 28, text: '2020-0827_1200pm-259pm', value: '2020-0827_1200pm-259pm' },
   { key: 29, text: '2020-0827_300pm-559pm', value: '2020-0827_300pm-559pm' },
   { key: 30, text: '2020-0827_600pm-859pm', value: '2020-0827_600pm-859pm' },
   { key: 31, text: '2020-0827_900pm-1159pm', value: '2020-0827_900pm-1159pm' },
   { key: 32, text: '2020-0828_1200am-259am', value: '2020-0828_1200am-259am' },
   { key: 33, text: '2020-0828_300am-559am', value: '2020-0828_300am-559am' },
   { key: 34, text: '2020-0828_600am-859am', value: '2020-0828_600am-859am' },
   { key: 35, text: '2020-0828_900am-1159am', value: '2020-0828_900am-1159am' },
   { key: 36, text: '2020-0828_1200pm-259pm', value: '2020-0828_1200pm-259pm' },
   { key: 37, text: '2020-0828_300pm-559pm', value: '2020-0828_300pm-559pm' },
   { key: 38, text: '2020-0828_600pm-859pm', value: '2020-0828_600pm-859pm' },
   { key: 39, text: '2020-0828_900pm-1159pm', value: '2020-0828_900pm-1159pm' },
   { key: 40, text: '2020-0829_1200am-259am', value: '2020-0829_1200am-259am' },
   { key: 41, text: '2020-0829_300am-559am', value: '2020-0829_300am-559am' },
   { key: 42, text: '2020-0829_600am-859am', value: '2020-0829_600am-859am' },
   { key: 43, text: '2020-0829_900am-1159am', value: '2020-0829_900am-1159am' },
   { key: 44, text: '2020-0829_1200pm-259pm', value: '2020-0829_1200pm-259pm' },
   { key: 45, text: '2020-0829_300pm-559pm', value: '2020-0829_300pm-559pm' },
   { key: 46, text: '2020-0829_600pm-859pm', value: '2020-0829_600pm-859pm' },
   { key: 47, text: '2020-0829_900pm-1159pm', value: '2020-0829_900pm-1159pm' },
   { key: 48, text: '2020-0830_1200am-259am', value: '2020-0830_1200am-259am' },
   { key: 49, text: '2020-0830_300am-559am', value: '2020-0830_300am-559am' },
   { key: 50, text: '2020-0830_600am-859am', value: '2020-0830_600am-859am' },
   { key: 51, text: '2020-0830_900am-1159am', value: '2020-0830_900am-1159am' },
   { key: 52, text: '2020-0830_1200pm-259pm', value: '2020-0830_1200pm-259pm' },
   { key: 53, text: '2020-0830_300pm-559pm', value: '2020-0830_300pm-559pm' },
   { key: 54, text: '2020-0830_600pm-859pm', value: '2020-0830_600pm-859pm' },
   { key: 55, text: '2020-0830_900pm-1159pm', value: '2020-0830_900pm-1159pm' },
   { key: 56, text: '2020-0831_1200am-259am', value: '2020-0831_1200am-259am' },
];

class Covid19Map extends React.Component {

  constructor(props) {
    super(props);
    // console.log(this.props.datas);
    this.load();
    this.state = {
      features: undefined,
      target: undefined,
      refresh: false,
    };
    this.getDates = this.getDates.bind(this);
  }

  load = () => {
    // this.setState = setState;
    const covid19Data = this.props.datas;
    // const stuffs = covid19Data.filter(stuffs => );
    // console.log(`This is the data${this.props.datas}`);
    this.#processCovidData(covid19Data);
  };

   getDates(event) {
     const targets = event.target.textContent;
    /* const temp = Datas.find({}).fetch();
    const dateTime = _.pluck(temp, 'dateTime');
    console.log(dateTime);
    console.log(_.extend({ }, dateTime));
    const data = _.extend({ }, dateTime); */
     this.setState({
       target: targets,
     });
     this.#processCovidData(this.props.datas.filter((dates) => targets === dates.dateTime));
     console.log(targets);
  }

  // covidBuildings = this.props.datas;

  #processCovidData = (covidBuildings) => {
     /*let target = '2020-0824_300am-559am';
     if (this.state !== undefined) {
       target = this.state.target;
     }*/
    for (let i = 0; i < features.length; i++) {
      const building = features[i];
      // eslint-disable-next-line no-shadow,no-loop-func
      // const covidBuilding = covidBuildings.find((covidBuilding) => building.properties.Building === covidBuilding.Building);
      // eslint-disable-next-line no-shadow
      const covidBuilding = covidBuildings.find((covidBuilding) => building.properties.Building ===
          covidBuilding.Building);

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
    this.setState({ refresh: true });
  }

  #setBuildingColor = (building) => {
    const legendItem = legendItems.find((item) => item.isFor(building.properties.confirmed));

    // eslint-disable-next-line no-param-reassign
    if (legendItem != null) building.properties.color = legendItem.color;
  }

  render() {
    // const mapData = processCovidData(this.props.datas);
    const legendItemsInReverse = [...legendItems].reverse();

    if (this.state.refresh === false) {
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

    this.setState({ refresh: false });
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
