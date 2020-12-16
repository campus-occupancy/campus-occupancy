import React from 'react';

const Loader = () => <div
    style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <div className="spinner-grow text-success" role="status">
    <span className="sr-only">Loading...</span>
  </div>
  <div className="spinner-grow text-info" role="status">
    <span className="sr-only">Loading...</span>
  </div>
  <div className="spinner-grow text-success" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>;

export default Loader;