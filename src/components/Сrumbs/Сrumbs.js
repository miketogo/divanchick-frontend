import React from 'react'
import { Link } from 'react-router-dom';

import './Сrumbs.css';





function Сrumbs(props) {

  return (

    <div className='crumbs'>
      {props.links && props.links.map((link, i) => (
        <div className='crumbs__link-container'>
          <Link className='crumbs__link' to={link.to}>{link.name}</Link>
          <p className='crumbs__link-separetor'>/</p>
        </div>
      ))}
    </div>

  );
}

export default Сrumbs;
