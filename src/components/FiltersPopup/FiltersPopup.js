import './FiltersPopup.css';
import React from "react";
import Filters from '../SubCategory/Filters/Filters';






function FiltersPopup(props) {
  return (
    <div className={`filters-popup ${props.isFilterPopupOpen ? 'filters-popup_active' : ''}`}>
      <div className={`filters-popup__container ${props.isFilterPopupOpen ? 'filters-popup__container_active' : ''}`}>
        <div className="filters-popup__close"  onClick={props.handleFilterPopupClose}>
          <svg className="filters-popup__close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 18L18 2M2 2L18 18" stroke="black" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="filters-popup__title">Фильтры</p>
        <div className="filters-popup__filters">
          <Filters setFiltersUpd={props.setFiltersUpd} filters={props.filters}/>
        </div>
      </div>
      <div className={`filters-popup__background ${props.isFilterPopupOpen ? 'filters-popup__background_active' : ''}`} onClick={props.handleFilterPopupClose}>

      </div>
    </div>
  );
}

export default FiltersPopup;
