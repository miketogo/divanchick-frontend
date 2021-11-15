import React from 'react'
import Header from '../Header/Header';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import CityPopup from '../CityPopup/CityPopup';
import Footer from '../Footer/Footer';
import Category from '../Category/Category';

const categories = [
  {
    name: 'Мягкая мебель',
    sub_catigories: [{
      name: 'Диваны-кровати',
      link: 'divany-krovati',
      photo: 'https://i.ibb.co/2dW4mhz/image.png'
    },
    {
      name: 'Диваны-кровати2',
      link: 'divany-krovati2',
      photo: 'https://i.ibb.co/nmxWQpN/image.png'
    },
    {
      name: 'Диваны-кровати3',
      link: 'divany-krovati3',
      photo: 'https://i.ibb.co/yQ97xZh/image.png'
    },],
    link: 'myagkaya_mebel'
  },
  {
    name: 'Кухня',
    link: 'kuhnya'
  },
  {
    name: 'Сантехника',
    link: 'santekhnika'
  },
  {
    name: 'Спальня',
    link: 'spalnya'
  },
  {
    name: 'Прихожая',
    link: 'prihozhaya'
  },
  {
    name: 'Детская',
    link: 'detskaya'
  },
  {
    name: 'Шкафы-купе',
    link: 'shkafy-kupe'
  },
  {
    name: 'Офис',
    link: 'ofis'
  },
  {
    name: 'Малая-форма',
    link: 'malaya-forma'
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

const products = [
  {
    name: 'Диван Монти 156',
    link: 'divan_monti_156',
    manufacturer: 'Студия диванов',
    category: {
      name: 'Мягкая мебель',
      link: 'myagkaya_mebel',
    },
    sub_category: {
      name: 'Диваны-кровати',
      link: 'divany-krovati',
    },
    key_words: ['Диван', 'Монти', '156'],
    description: 'Диван тыры-пыры',
    specifications:{
      width: 1000,
      height: 2000,
      length: 500,
    },
    article: '0010000001',
    photos: ['https://i.ibb.co/TLjzF7B/image.png', 'https://i.ibb.co/WHC6kPx/image.png'],
    price: 1500

  },
  {
    name: 'Диван Монти 157',
    link: 'divan_monti_157',
    manufacturer: 'Студия диванов',
    category: {
      name: 'Мягкая мебель',
      link: 'myagkaya_mebel',
    },
    sub_category: {
      name: 'Диваны-кровати',
      link: 'divany-krovati',
    },
    key_words: ['Диван', 'Монти', '157'],
    description: 'Диван тыры-пыры',
    specifications:{
      width: 1000,
      height: 2000,
      length: 500,
    },
    article: '0010000002',
    photos: ['https://i.ibb.co/TLjzF7B/image.png', 'https://i.ibb.co/WHC6kPx/image.png'],
    price: 1500

  },


]

function App() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isCityPopupOpen, setCityPopupOpen] = React.useState(false);
  const [cityValue, setCityValue] = React.useState('');

  React.useEffect(() => {
    let city = localStorage.getItem('city')
    if (city) setCityValue(city)
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

  function handleCityPopupOpen() {
    setCityPopupOpen(true)
  }
  function handleCityPopupClose() {
    setCityPopupOpen(false)
  }
  return (
    <div className="app">
      <CityPopup isCityPopupOpen={isCityPopupOpen} handleCityPopupClose={handleCityPopupClose} cityValue={cityValue} setCityValue={setCityValue} cities={cities} />
      <Header categories={categories} screenWidth={screenWidth} handleCityPopupOpen={handleCityPopupOpen} cityValue={cityValue} />
      <Switch>
        <Route path={`/categories/:category`}>
          <Category products={products} categories={categories} />
        </Route>

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
