import React from 'react';
import { Map, GeoJSON, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import datas from '../../../data/campusmap.json';

const CovidMap = () => {
  const mapStyle = {
    fillColor: 'white',
    weight: 0,
    color: 'black',
    fillOpacity: 0.8,
  };

  const onEachBuilding = (building, layer) => {
    // eslint-disable-next-line no-param-reassign
    layer.options.fillColor = building.properties.color;
    const name = building.properties.Building;
    const confirmedText = building.properties.confirmedText;
    layer.bindPopup(`${name}, Occupancy: ${confirmedText}`);
  };

  // eslint-disable-next-line consistent-return
  /* const filterBuilding = (building) => {
    if (building.properties.Building === 'Art') return true;
  }; */

  return (<Map style={{ height: '90vh' }} zoom={17} center={[21.29930, -157.81563]} scrollWheelZoom={false}>
        <GeoJSON
            style={mapStyle}
            data={datas}
            onEachFeature={onEachBuilding}
            // filter={filterBuilding}
        />;
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
  );

};

export default CovidMap;
