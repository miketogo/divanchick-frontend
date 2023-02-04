import React from 'react'
import { Link } from 'react-router-dom';

import './Сrumbs.css';





function Сrumbs({links}) {

  return (

    <div className='crumbs'>
      {links && links.map((link, i) => (
        <div className='crumbs__link-container' key={`crumbs__link-container${i}`}>
          <Link className='crumbs__link' to={link.to}>{link.name}</Link>
          <p className='crumbs__link-separetor'>/</p>
        </div>
      ))}
    </div>

  );
}

export default Сrumbs;
