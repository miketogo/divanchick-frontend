import React from 'react'

import './CityPopup.css';





function CityPopup(props) {
  const [searchValue, setSearchValue] = React.useState('');




  function handleCitySelection(city) {
    localStorage.setItem('city', city.name);
    console.log(city.name)
    props.handleCityPopupClose()
  }
  function handleClose() {
    props.handleCityPopupClose()
  }
  function handleSearchChange(e) {
    setSearchValue(e.target.value)
  }
  return (
    <div className={`city-popup ${props.isCityPopupOpen ? 'city-popup_active' : ''}`}>
      <form className="city-popup__container">
        <svg onClick={() => { handleClose() }} className="city-popup__close" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 21L21 1M1 1L21 21" stroke="black" stroke-width="2" stroke-linecap="round" />
        </svg>
        <h2 className="city-popup__title">Укажите или выберите город</h2>
        <p className="city-popup__input-title">Поиск города</p>
        <div className="city-popup__input-container">
          <input placeholder="Введите название города" className="city-popup__input" name="search" type="text" value={searchValue} onChange={handleSearchChange} maxLength="50"></input>
          <svg className="city-popup__input-search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 21.8118C17.5228 21.8118 22 17.3729 22 11.8973C22 6.42174 17.5228 1.98289 12 1.98289C6.47715 1.98289 2 6.42174 2 11.8973C2 17.3729 6.47715 21.8118 12 21.8118ZM12 23.7947C18.6274 23.7947 24 18.468 24 11.8973C24 5.32662 18.6274 0 12 0C5.37258 0 0 5.32662 0 11.8973C0 18.468 5.37258 23.7947 12 23.7947Z" fill="#9B38DC" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0.292908 22.5979L3.79291 19.1278L5.20712 20.5299L1.70712 24L0.292908 22.5979Z" fill="#9B38DC" />
          </svg>
        </div>
        <div className="city-popup__cities">
          {props.cities.filter((item) => {
            if (item.name.toLowerCase().includes(searchValue.toLowerCase())) return true
            else return false
          }).length === 0 ?
            <p className={`city-popup__city-name`}>Такой город не найден</p>
            :

            props.cities.filter((item) => {
              if (item.name.toLowerCase().includes(searchValue.toLowerCase())) return true
              else return false
            }).map((item, i) => (
              <div onClick={() => { handleCitySelection(item) }} key={`city-popup__city${i}`} className="city-popup__city">
                <div className={`city-popup__city-radio ${props.cityValue === item.name ? 'city-popup__city-radio_selected' : ''}`}></div>
                <p className={`city-popup__city-name`}>{item.name}</p>
              </div>
            ))}

        </div>
      </form>

    </div>
  );
}

export default CityPopup;
