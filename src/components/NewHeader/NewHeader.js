import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import mainApi from '../../assets/api/MainApi';
import { CartIcon, CatalogIcon, CatalogIconHeader, FavoriteIcon, GeoIcon, LogoIcon, MenuIcon, RoomsIcon, SearchIcon } from '../../assets/icons/icons';
import CatalogDrop from './CatalogDrop/CatalogDrop';
import MenuPopup from './MenuPopup/MenuPopup';




import './NewHeader.css';
import PopularCategory from './PopularCategory/PopularCategory';
import RoomsDrop from './RoomsDrop/RoomsDrop';
import SearchDrop from './SearchDrop/SearchDrop';


function NewHeader({
  favouritesProducts,
  allCartProductsCount,
}) {



  const [searchValue, setSearchValue] = useState('')
  const [isDropDownOpened, setDropDownOpened] = useState(false)
  const [isSearchPreloaderVisible, setSearchPreloaderVisible] = useState(false)
  const [searchItems, setSearchItems] = useState(undefined)


  function hendleSearchChange(e) {
    let inputValue = e.target.value
    setSearchValue(inputValue)
    if (e.target.value === '') {
      setDropDownOpened(false)
    }
    else {
      setDropDownOpened(true)

      setSearchPreloaderVisible(true)
    }
  }

  function handleDropDownOpen() {
    if (searchValue !== '') setDropDownOpened(true)
  }







  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchValue)
      if (!searchValue) return
      mainApi.searchItems({
        text: searchValue.toLowerCase(),
        limit: 5,
      })
        .then((res) => {
          console.log(res.data)
          setSearchItems(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setSearchPreloaderVisible(false)
        })
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchValue])

  const [isMenuOpen, setMenuOpen] = useState(false)


  const [rooms, setRooms] = useState(undefined)
  const [isRoomsOpen, setRoomsOpen] = useState(false)

  const [isCatalogOpen, setCatalogOpen] = useState(false)
  const [categories, setCategories] = useState(undefined)
  const [topCategories, setTopCategories] = useState(undefined)
  useEffect(() => {
    mainApi.getRooms({ limit: 25 })
      .then((res) => {
        console.log(res.data)
        setRooms(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    mainApi.getAllCategories({ limit: 25 })
      .then((res) => {
        console.log(res.data)
        setCategories(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    mainApi.getTopCategories()
      .then((res) => {
        console.log(res.data)
        setTopCategories(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const [scrollWindowPosition, setScrollWindowPosition] = useState(0);
  const [popupScrollPosition, setPopupScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;

    setScrollWindowPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.top = `-${scrollWindowPosition}px`;
      setPopupScrollPosition(scrollWindowPosition)
      setTimeout(() => {
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
      }, 10);

      console.log(window.pageYOffset)

    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
      document.body.style.top = `unset`;
      console.log(popupScrollPosition)
      window.scrollTo(0, popupScrollPosition)
      setScrollWindowPosition(popupScrollPosition)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);


  return (
    <header className={`header`}>
      <MenuPopup isOpened={isMenuOpen} setOpened={setMenuOpen} categories={categories} rooms={rooms} />
      <CatalogDrop isOpened={isCatalogOpen} setOpened={setCatalogOpen} categories={categories} />
      <div className='header__head'>
        <div className='header__first-row'>
          <Link className='header__logo-box header__logo-box_mobile' to={'/'}>
            <LogoIcon mainClassName={'header__logo'} fillClassName={'header__logo-fill'} />
          </Link>
          <a className='header__location' href='https://yandex.ru/maps/org/mebelny_salon_divanchik/1272721303/?ll=68.265690%2C58.230731&z=15' target='_blank' rel='noreferrer'>
            <GeoIcon mainClassName={'header__location-icon'} fillClassName={'header__location-icon-fill'} />
            <p className='header__location-name'>Тобольск</p>
          </a>
          <div className='header__phone-and-time'>
            <a className="header__phone" rel="noreferrer" href="tel:+79199401208" >+7 919 940 12 08</a>
            <div className='header__time'>
              <p className='header__time-value'>Пн-Cб 09–20</p>
              <p className='header__time-value'>Вс 09–19</p>

            </div>
          </div>
          <div className='header__mobile-btns'>
            <div className='header__main-links header__main-links_mobile'>
              <Link className='header__main-link' to={'/favourites'}>
                <div className='header__main-link-icon-and-counter'>
                  {favouritesProducts && favouritesProducts.length > 0 ?
                    <p className='header__main-link-counter'>{favouritesProducts.length}</p>
                    : null}
                  <FavoriteIcon mainClassName={'header__main-link-icon'} strokeClassName={'header__main-link-icon-stroke'} />
                </div>
                <p className='header__main-link-name'>Избранное</p>
              </Link>
              <Link className='header__main-link' to={'/cart'}>
                <div className='header__main-link-icon-and-counter'>
                  {allCartProductsCount && allCartProductsCount.count && allCartProductsCount.count > 0 ?
                    <p className='header__main-link-counter'>{allCartProductsCount.count}</p>
                    : null}
                  <CartIcon mainClassName={'header__main-link-icon'} strokeClassName={'header__main-link-icon-stroke'} />
                </div>
                <p className='header__main-link-name'>Корзина</p>
              </Link>
            </div>
            <button className='header__menu' type='button' onClick={() => {
              setMenuOpen(true)
            }}>
              <MenuIcon mainClassName={'header__menu-icon'} fillClassName={'header__menu-icon-fill'} />
            </button>
          </div>
        </div>
        <div className='header__second-row'>
          <Link className='header__logo-box header__logo-box_pc' to={'/'}>
            <LogoIcon mainClassName={'header__logo'} fillClassName={'header__logo-fill'} />
          </Link>
          <div className='header__hendlers'>
            <button className='header__btn header__btn_type_catalog header__btn_pc' type='button' onClick={() => {
              if (!isCatalogOpen) {
                setCatalogOpen(true)
              }

            }}>
              <svg className='header__btn-icon' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className='header__btn-icon-fill' y="6" width="20" height="2" rx="1" fill="white" />
                <rect className='header__btn-icon-fill' y="12" width="13" height="2" rx="1" fill="white" />
              </svg>

              <p className='header__btn-text'>Каталог</p>
            </button>
            <div className='header__btn-box header__btn_pc'>
              <button className='header__btn header__btn_type_rooms' type='button' onClick={() => {
                setRoomsOpen(!isRoomsOpen)
              }}>
                <RoomsIcon mainClassName={'header__btn-icon'} strokeClassName={'header__btn-icon-stroke'} />
                <p className='header__btn-text'>Комнаты</p>
              </button>
              <RoomsDrop isOpened={isRoomsOpen} setOpened={setRoomsOpen} rooms={rooms} />
            </div>

            <div className='header__input-container'>
              <div className='header__input-box' onClick={handleDropDownOpen}>
                <input placeholder="Ищите среди 10 000 товаров!" className="header__input" name="search" type="text" value={searchValue} onChange={hendleSearchChange} maxLength="50"></input>
                <SearchIcon mainClassName={'header__input-icon'} fillClassName={'header__input-icon-fill'} />
              </div>
              <SearchDrop isSearchPreloaderVisible={isSearchPreloaderVisible} isOpened={isDropDownOpened} setOpened={setDropDownOpened} searchItems={searchItems} />
            </div>
          </div>
          <div className='header__main-links header__main-links_pc'>
            <Link className='header__main-link' to={'/favourites'}>
              <div className='header__main-link-icon-and-counter'>
                {favouritesProducts && favouritesProducts.length > 0 ?
                  <p className='header__main-link-counter'>{favouritesProducts.length}</p>
                  : null}
                <FavoriteIcon mainClassName={'header__main-link-icon'} strokeClassName={'header__main-link-icon-stroke'} />
              </div>
              <p className='header__main-link-name'>Избранное</p>
            </Link>
            <Link className='header__main-link' to={'/cart'}>
              <div className='header__main-link-icon-and-counter'>
                {allCartProductsCount && allCartProductsCount.count && allCartProductsCount.count > 0 ?
                  <p className='header__main-link-counter'>{allCartProductsCount.count}</p>
                  : null}
                <CartIcon mainClassName={'header__main-link-icon'} strokeClassName={'header__main-link-icon-stroke'} />
              </div>
              <p className='header__main-link-name'>Корзина</p>
            </Link>
          </div>
        </div>

      </div>
      <PopularCategory topCategories={topCategories} />

    </header>
  );
}

export default NewHeader;
