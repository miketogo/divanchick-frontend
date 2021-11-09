import React from 'react'
import Header from '../Header/Header';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import CityPopup from '../CityPopup/CityPopup';
import Footer from '../Footer/Footer';

const categories = [
  {
    name: 'Мягкая мебель',
    link: '/category'
  },
  {
    name: 'Кухня',
    link: '/category2'
  },
  {
    name: 'Сантехника',
    link: '/category3'
  },
  {
    name: 'Спальня',
    link: '/category4'
  },
  {
    name: 'Прихожая',
    link: '/category5'
  },
  {
    name: 'Детская',
    link: '/category6'
  },
  {
    name: 'Шкафы-купе',
    link: '/category7'
  },
  {
    name: 'Офис',
    link: '/category8'
  },
  {
    name: 'Малая-форма',
    link: '/category9'
  },
]

const cities = [
  {
    name: 'Тобольск'
  },
  {
    name: 'Ханты - Мансийск'
  },
  {
    name: 'Нефтеюганск'
  },
  {
    name: 'Сургут'
  },
  {
    name: 'Лангепас'
  },
  {
    name: 'Мегион'
  },
  {
    name: 'Нижневартовск'
  },
]


function App() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isCityPopupOpen, setCityPopupOpen] = React.useState(false);
  const [cityValue, setCityValue] = React.useState('');

  React.useEffect(() => {
    let city = localStorage.getItem('city')
    if(city) setCityValue(city)
  }, [isCityPopupOpen]);

  function handleResize() {
    setScreenWidth(window.innerWidth)
    window.removeEventListener('resize', handleResize);
  }
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function handleCityPopupOpen(){
    setCityPopupOpen(true)
  }
  function handleCityPopupClose(){
    setCityPopupOpen(false)
  }
  return (
    <div className="app">
      <CityPopup isCityPopupOpen={isCityPopupOpen} handleCityPopupClose={handleCityPopupClose} cityValue={cityValue} setCityValue={setCityValue} cities={cities}/>
      <Header categories={categories} screenWidth={screenWidth} handleCityPopupOpen={handleCityPopupOpen} cityValue={cityValue}/>
      <Switch>
        {categories.map((item, i) => (
          <Route path={item.link}>

          </Route>
        ))}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
