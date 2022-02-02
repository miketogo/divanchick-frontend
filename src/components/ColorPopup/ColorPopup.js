import './ColorPopup.css';
import React from "react";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';




function ColorPopup(props) {





  return (
    <div className={`color-popup ${props.isColorPopupOpen ? 'color-popup_active' : ''}`}>
      <div className={`color-popup__container ${props.isColorPopupOpen ? 'color-popup__container_active' : ''}`}>
        <div className="color-popup__close-and-title">
          <p className="color-popup__title">Выберете цвет</p>
          <div className="color-popup__close" onClick={props.handleColorPopupClose}>
            <svg className="color-popup__close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18L18 2M2 2L18 18" stroke="black" strokeWidth="3.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="color-popup__items" id='color-popup-items'>
          {/* {props.selectedColor && props.selectedColor} */}
          {props.availibleColors && props.availibleColors.map((item, i) => (
            <Link key={`color-popup__item${i}`} className={`color-popup__item ${props.selectedColor.toLowerCase() === item.name.toLowerCase() ? 'color-popup__item_active' : ''}`} to={item.link} onClick={props.handleColorPopupClose}>
              <p className={`color-popup__item-text ${props.selectedColor.toLowerCase() === item.name.toLowerCase() ? 'color-popup__item-text_active' : ''}`} >{item.name}</p>
            </Link>
          ))}
        </div>

      </div>
      <div className={`color-popup__background ${props.isColorPopupOpen ? 'color-popup__background_active' : ''}`} onClick={props.handleColorPopupClose}>

      </div>
    </div>
  );
}

export default ColorPopup;
