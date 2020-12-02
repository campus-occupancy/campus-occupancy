import React from 'react';

// eslint-disable-next-line react/prop-types
const Legend = ({ legendItems }) => (
      <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
          }}
      >
        {/* eslint-disable-next-line react/prop-types */}
        {legendItems.map((item) => (
            <div
                key={item.title}
                style={{
                  backgroundColor: item.color,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center', // vertical
                  justifyContent: 'center', // horiztontal
                  color: item.textColor != null ? item.textColor : 'black',
                  fontWeight: 'bolder',
                  fontSize: '1em',
                  height: '10vh',
                }}
            >
              <span>{item.title}</span>
            </div>
        ))}
      </div>
  );

export default Legend;
