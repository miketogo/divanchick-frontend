import './FiltersPopup.css';
import React from "react";
import Filters from '../SubCategory/Filters/Filters';






function FiltersPopup({isFilterPopupOpen, handleFilterPopupClose, setFiltersUpd, filters, handleUpdateByFilters, handleResetFilters }) {
  return (
    <div className={`filters-popup ${isFilterPopupOpen ? 'filters-popup_active' : ''}`}>
      <div className={`filters-popup__container ${isFilterPopupOpen ? 'filters-popup__container_active' : ''}`}>
        <div className="filters-popup__close" onClick={handleFilterPopupClose}>
          <svg className="filters-popup__close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 18L18 2M2 2L18 18" stroke="black" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="filters-popup__title">Фильтры</p>
        <div className="filters-popup__filters">
          <Filters handleResetFilters={handleResetFilters} setFiltersUpd={setFiltersUpd} filters={filters}  handleUpdateByFilters={handleUpdateByFilters} />
        </div>
      </div>
      <div className={`filters-popup__background ${isFilterPopupOpen ? 'filters-popup__background_active' : ''}`} onClick={handleFilterPopupClose}>

      </div>
    </div>
  );
}

export default FiltersPopup;
