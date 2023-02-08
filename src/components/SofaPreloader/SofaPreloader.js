import React from 'react';
import './SofaPreloader.css';

const SofaPreloader = () => {
  return (
    <div className="sofa-preloader-container">
      <div className="sofa-preloader">
        <div className="sofa-preloader__base"></div>
        <div className="sofa-preloader__cushion cushion-1"></div>
        <div className="sofa-preloader__cushion cushion-2"></div>
        <div className="sofa-preloader__cushion cushion-3"></div>
        <div className="sofa-preloader__armrest armrest-1"></div>
        <div className="sofa-preloader__armrest armrest-2"></div>
      </div>
    </div>
  );
};

export default SofaPreloader;
