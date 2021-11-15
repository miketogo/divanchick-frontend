import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

import logo from '../../assets/images/header/logo.png'


function Header(props) {
  const ref = React.useRef()
  const [searchValue, setSearchValue] = React.useState('');
  const [isDropDownOpened, setDropDownOpened] = React.useState(false);

  const [filterdProducts, setFilterdProducts] = React.useState(props.products);

  React.useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isDropDownOpened && ref.current && !ref.current.contains(e.target)) {
        setDropDownOpened(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isDropDownOpened])

  function closeDropdown() {
    console.log('sas')
    setDropDownOpened(false)
    setTimeout(() => {
      setDropDownOpened(false)
    }, 1);
  }
  function handleSearchChange(e) {

    if (e.target.value === '') {
      setSearchValue(e.target.value)
      setDropDownOpened(false)
    }
    else {
      setDropDownOpened(true)
      setSearchValue(e.target.value)
    }
  }
  function handleSearchReset() {
    setSearchValue('')

    setTimeout(() => {
      setDropDownOpened(false)
    }, 1);
  }
  function handleDropDownOpen() {
    if (searchValue !== '') setDropDownOpened(true)
  }

  React.useEffect(() => {
    let wordsArray = searchValue.split(/\s/im)
    console.log(wordsArray)
    let filtered = props.products.filter((product) => {
      if (wordsArray.filter((word) => {
        if (product.key_words.filter((product_key) => {
          if (product_key.toLowerCase().includes(word.toLowerCase())) return true
          else return false
        }).length > 0) return true
        else return false
      }).length > 0) return true
      else return false
    })
    filtered = filtered.map((item) => {
      return {
        ...item,
        search_points: wordsArray.filter((word) => {
          if (item.key_words.filter((product_key) => {
            if (product_key.toLowerCase().includes(word.toLowerCase())) return true
            else return false
          }).length > 0) return true
          else return false
        }).length
      }

    })
    filtered = filtered.sort(function (a, b) {

      if (a.search_points < b.search_points) return 1;
      if (b.search_points < a.search_points) return -1;

      return 0;
    })

    setFilterdProducts(filtered)

  }, [searchValue, props.products])
  React.useEffect(() => {
    console.log(filterdProducts)

  }, [filterdProducts])

  return (
    <header className="header">
      <div className="header__row">
        {props.screenWidth > 937 ?
          <></> :
          <div className="header__category-button">
            <svg className="header__category-button-icon" width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="2" rx="1" fill="#0FB0B5" />
              <rect y="6" width="13" height="2" rx="1" fill="#0FB0B5" />
            </svg>

            <p className="header__category-button-text">Все категории</p>
          </div>}
        {
          props.screenWidth > 1115 ?


            <div className="header__city-selection" onClick={() => { props.handleCityPopupOpen() }}>
              <svg className="header__city-selection-svg" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 2.40546L1.2543 0L0 1.49568L4 5L8 1.49568L6.7457 0L4 2.40546Z" fill="#5B1C9E" />
              </svg>

              <p className="header__selected-city">{props.cityValue ? props.cityValue : 'Выберите город'}</p>
            </div> :
            <div className="header__logo-and-city">
              <Link className="header__logo" to="/">
                <img className="header__logo-img" src={logo} alt="Диванчик" />

              </Link>

              <div className="header__city-selection" onClick={() => { props.handleCityPopupOpen() }}>
                <svg className="header__city-selection-svg" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4 2.40546L1.2543 0L0 1.49568L4 5L8 1.49568L6.7457 0L4 2.40546Z" fill="#5B1C9E" />
                </svg>

                <p className="header__selected-city">{props.cityValue ? props.cityValue : 'Выберите город'}</p>
              </div>
            </div>

        }

        <nav className="header__nav">
          <Link className="header__nav-item header__nav-item_type_promo" to="/">Акции</Link>
          <Link className="header__nav-item" to="/">Реквезиты</Link>
          <Link className="header__nav-item" to="/">Получение и доставка</Link>
          <Link className="header__nav-item" to="/">Оплата</Link>
          <Link className="header__nav-item header__nav-item_type_track-order" to="/">Что с моим заказом?</Link>
        </nav>
        {props.screenWidth > 937 ?
          <></> :
          <a target="_blank" rel="noreferrer" href="tel:+79199401208" className="header__contacts-phone">+7 919 940 12 08</a>
        }
        {props.screenWidth > 576 ?
          <></>
          :
          <div className="header__mobile-icons">
            <div className="header__mobile-icon" onClick={() => { props.handleCityPopupOpen() }}>
              <svg className="header__icon-svg" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4201 5.98002C13.1801 2.84002 10.6201 0.300022 7.46006 0.0800225C3.70006 -0.179977 0.560059 2.80002 0.560059 6.52002C0.560059 7.86002 0.960059 9.10002 1.66006 10.12C2.50006 11.36 4.90006 14.86 6.18006 16.74C6.58006 17.32 7.44006 17.32 7.82006 16.74C9.10006 14.88 11.5001 11.36 12.3401 10.12C13.1401 8.96002 13.5401 7.52002 13.4201 5.98002ZM7.00006 10.2C4.96006 10.2 3.30006 8.54002 3.30006 6.50002C3.30006 4.46002 4.96006 2.80002 7.00006 2.80002C9.04006 2.80002 10.7001 4.46002 10.7001 6.50002C10.7001 8.54002 9.04006 10.2 7.00006 10.2Z" fill="black" />
              </svg>

            </div>
            <div className="header__mobile-icon">
              <p className="header__icon-counter">12</p>
              <svg className="header__icon-svg" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 16.5L9.55806 16.9419C9.80214 17.186 10.1979 17.186 10.4419 16.9419L10 16.5ZM2.54442 9.04442L2.10247 9.48636L2.10247 9.48636L2.54442 9.04442ZM8.79442 2.79442L8.35248 3.23636L8.35248 3.23636L8.79442 2.79442ZM10 4L9.55806 4.44194C9.80214 4.68602 10.1979 4.68602 10.4419 4.44194L10 4ZM11.2056 2.79442L10.7636 2.35247L10.7636 2.35248L11.2056 2.79442ZM10.4419 16.0581L2.98636 8.60247L2.10247 9.48636L9.55806 16.9419L10.4419 16.0581ZM17.0136 8.60248L9.55806 16.0581L10.4419 16.9419L17.8975 9.48636L17.0136 8.60248ZM8.35248 3.23636L9.55806 4.44194L10.4419 3.55806L9.23636 2.35248L8.35248 3.23636ZM10.4419 4.44194L11.6475 3.23636L10.7636 2.35248L9.55806 3.55806L10.4419 4.44194ZM14.3306 0.875C12.9927 0.875 11.7097 1.40646 10.7636 2.35247L11.6475 3.23636C12.3591 2.52477 13.3242 2.125 14.3306 2.125V0.875ZM18.125 5.91942C18.125 6.92576 17.7252 7.89088 17.0136 8.60248L17.8975 9.48636C18.8435 8.54035 19.375 7.25728 19.375 5.91942H18.125ZM19.375 5.91942C19.375 3.13346 17.1165 0.875 14.3306 0.875V2.125C16.4262 2.125 18.125 3.82382 18.125 5.91942H19.375ZM5.66942 2.125C6.67576 2.125 7.64088 2.52477 8.35248 3.23636L9.23636 2.35248C8.29035 1.40646 7.00728 0.875 5.66942 0.875V2.125ZM1.875 5.91942C1.875 3.82382 3.57382 2.125 5.66942 2.125V0.875C2.88346 0.875 0.625 3.13346 0.625 5.91942H1.875ZM2.98636 8.60247C2.27477 7.89088 1.875 6.92576 1.875 5.91942H0.625C0.625 7.25728 1.15646 8.54035 2.10247 9.48636L2.98636 8.60247Z" fill="black" />
              </svg>
            </div>
            <div className="header__mobile-icon">
              <p className="header__icon-counter">12</p>

              <svg className="header__icon-svg" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.1501 5.06429C11.1501 7.17105 9.4881 8.87858 7.43756 8.87858C5.38702 8.87858 3.72506 7.17105 3.72506 5.06429C3.72506 2.95753 5.38702 1.25 7.43756 1.25C9.4881 1.25 11.1501 2.95753 11.1501 5.06429Z" stroke="black" strokeWidth="1.25" strokeLinecap="square" />
                <path fillRule="evenodd" clipRule="evenodd" d="M13.6251 18.75H1.25006C1.25006 17.8466 1.25006 16.9872 1.25006 16.209C1.25006 14.101 2.9122 12.3928 4.96256 12.3928H9.91256C11.9629 12.3928 13.6251 14.101 13.6251 16.209C13.6251 16.9872 13.6251 17.8466 13.6251 18.75Z" stroke="black" strokeWidth="1.25" strokeLinecap="square" />
              </svg>
            </div>
            <div className="header__mobile-icon">
              <p className="header__icon-counter">12</p>

              <svg className="header__icon-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.04687 3.33333L2.34375 1H0M3.04687 3.33333L5.85938 12.6667H18.75V5.66667C18.75 4.378 17.7007 3.33333 16.4062 3.33333H3.04687ZM16.4062 18.5C15.759 18.5 15.2344 17.9777 15.2344 17.3333C15.2344 16.689 15.759 16.1667 16.4062 16.1667C17.0535 16.1667 17.5781 16.689 17.5781 17.3333C17.5781 17.9777 17.0535 18.5 16.4062 18.5ZM7.03125 17.3333C7.03125 16.689 7.55592 16.1667 8.20312 16.1667C8.85033 16.1667 9.375 16.689 9.375 17.3333C9.375 17.9777 8.85033 18.5 8.20312 18.5C7.55592 18.5 7.03125 17.9777 7.03125 17.3333Z" stroke="black" strokeWidth="1.25" />
              </svg>
            </div>

          </div>

        }
      </div>
      <div className="header__row header__row_second">
        {
          props.screenWidth > 1115 ?
            <Link className="header__logo" to="/">
              <img className="header__logo-img" src={logo} alt="Диванчик" />
              <p className="header__logo-text">Мебельный<br />Магазин</p>
            </Link>
            : <></>
        }
        {props.screenWidth > 937 ?
          <div className="header__category-button">
            <svg className="header__category-button-icon" width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="2" rx="1" fill="#0FB0B5" />
              <rect y="6" width="13" height="2" rx="1" fill="#0FB0B5" />
            </svg>

            <p className="header__category-button-text">Все категории</p>
          </div>
          :
          <></>}

        <div onClick={() => {
          handleDropDownOpen()
        }} className="header__input-container" ref={ref}>
          <input placeholder="Ищите среди 50 000 товаров!" className="header__input" name="search" type="text" value={searchValue} onChange={handleSearchChange} maxLength="50"></input>
          {isDropDownOpened ?
            <svg onClick={handleSearchReset} className="header__input-search-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 11L11 1M1 1L11 11" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>

            :

            <svg className="header__input-search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 21.8118C17.5228 21.8118 22 17.3729 22 11.8973C22 6.42174 17.5228 1.98289 12 1.98289C6.47715 1.98289 2 6.42174 2 11.8973C2 17.3729 6.47715 21.8118 12 21.8118ZM12 23.7947C18.6274 23.7947 24 18.468 24 11.8973C24 5.32662 18.6274 0 12 0C5.37258 0 0 5.32662 0 11.8973C0 18.468 5.37258 23.7947 12 23.7947Z" fill="#9B38DC" />
              <path fillRule="evenodd" clipRule="evenodd" d="M0.292908 22.5979L3.79291 19.1278L5.20712 20.5299L1.70712 24L0.292908 22.5979Z" fill="#9B38DC" />
            </svg>}
          <div className={`header__input-dropdown ${isDropDownOpened ? 'header__input-dropdown_active' : 'header__input-dropdown_inactive'}`}>
            {filterdProducts && filterdProducts.length > 0 ?
              filterdProducts.map((product, i) => (
                <Link onClick={closeDropdown} to={`/categories/${product.category.link}/${product.sub_category.link}/${product.link}`} className="search__product-link" key={`search-product${i}`}>
                  <img className="search__product-img" src={product.photos[0]} alt={product.name} />
                  <div className="search__product-texts">
                    <p className="search__product-name">{product.name}</p>
                    <p className="search__product-subcategory">{product.sub_category.name}</p>
                  </div>

                </Link>

              ))
              :
              <p className="search__product-error">Ничего не найдено</p>}
          </div>
        </div>
        {props.screenWidth > 576 ?
          <div className="header__icons">
            <div className="header__icon">
              <div className="header__icon-container">
                <p className="header__icon-counter">12</p>
                <svg className="header__icon-svg" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 16.5L9.55806 16.9419C9.80214 17.186 10.1979 17.186 10.4419 16.9419L10 16.5ZM2.54442 9.04442L2.10247 9.48636L2.10247 9.48636L2.54442 9.04442ZM8.79442 2.79442L8.35248 3.23636L8.35248 3.23636L8.79442 2.79442ZM10 4L9.55806 4.44194C9.80214 4.68602 10.1979 4.68602 10.4419 4.44194L10 4ZM11.2056 2.79442L10.7636 2.35247L10.7636 2.35248L11.2056 2.79442ZM10.4419 16.0581L2.98636 8.60247L2.10247 9.48636L9.55806 16.9419L10.4419 16.0581ZM17.0136 8.60248L9.55806 16.0581L10.4419 16.9419L17.8975 9.48636L17.0136 8.60248ZM8.35248 3.23636L9.55806 4.44194L10.4419 3.55806L9.23636 2.35248L8.35248 3.23636ZM10.4419 4.44194L11.6475 3.23636L10.7636 2.35248L9.55806 3.55806L10.4419 4.44194ZM14.3306 0.875C12.9927 0.875 11.7097 1.40646 10.7636 2.35247L11.6475 3.23636C12.3591 2.52477 13.3242 2.125 14.3306 2.125V0.875ZM18.125 5.91942C18.125 6.92576 17.7252 7.89088 17.0136 8.60248L17.8975 9.48636C18.8435 8.54035 19.375 7.25728 19.375 5.91942H18.125ZM19.375 5.91942C19.375 3.13346 17.1165 0.875 14.3306 0.875V2.125C16.4262 2.125 18.125 3.82382 18.125 5.91942H19.375ZM5.66942 2.125C6.67576 2.125 7.64088 2.52477 8.35248 3.23636L9.23636 2.35248C8.29035 1.40646 7.00728 0.875 5.66942 0.875V2.125ZM1.875 5.91942C1.875 3.82382 3.57382 2.125 5.66942 2.125V0.875C2.88346 0.875 0.625 3.13346 0.625 5.91942H1.875ZM2.98636 8.60247C2.27477 7.89088 1.875 6.92576 1.875 5.91942H0.625C0.625 7.25728 1.15646 8.54035 2.10247 9.48636L2.98636 8.60247Z" fill="black" />
                </svg>
              </div>
              <p className="header__icon-title">Избранное</p>
            </div>
            <div className="header__icon">
              <div className="header__icon-container">
                <p className="header__icon-counter">12</p>

                <svg className="header__icon-svg" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.1501 5.06429C11.1501 7.17105 9.4881 8.87858 7.43756 8.87858C5.38702 8.87858 3.72506 7.17105 3.72506 5.06429C3.72506 2.95753 5.38702 1.25 7.43756 1.25C9.4881 1.25 11.1501 2.95753 11.1501 5.06429Z" stroke="black" strokeWidth="1.25" strokeLinecap="square" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.6251 18.75H1.25006C1.25006 17.8466 1.25006 16.9872 1.25006 16.209C1.25006 14.101 2.9122 12.3928 4.96256 12.3928H9.91256C11.9629 12.3928 13.6251 14.101 13.6251 16.209C13.6251 16.9872 13.6251 17.8466 13.6251 18.75Z" stroke="black" strokeWidth="1.25" strokeLinecap="square" />
                </svg>
              </div>
              <p className="header__icon-title">Профиль</p>
            </div>
            <div className="header__icon">
              <div className="header__icon-container">
                <p className="header__icon-counter">12</p>

                <svg className="header__icon-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.04687 3.33333L2.34375 1H0M3.04687 3.33333L5.85938 12.6667H18.75V5.66667C18.75 4.378 17.7007 3.33333 16.4062 3.33333H3.04687ZM16.4062 18.5C15.759 18.5 15.2344 17.9777 15.2344 17.3333C15.2344 16.689 15.759 16.1667 16.4062 16.1667C17.0535 16.1667 17.5781 16.689 17.5781 17.3333C17.5781 17.9777 17.0535 18.5 16.4062 18.5ZM7.03125 17.3333C7.03125 16.689 7.55592 16.1667 8.20312 16.1667C8.85033 16.1667 9.375 16.689 9.375 17.3333C9.375 17.9777 8.85033 18.5 8.20312 18.5C7.55592 18.5 7.03125 17.9777 7.03125 17.3333Z" stroke="black" strokeWidth="1.25" />
                </svg>

              </div>
              <p className="header__icon-title">Корзина</p>
            </div>
          </div>
          : <></>}

      </div>
      <div className="header__row header__row_third">
        <div className="header__main-categories">
          {props.categories.map((item, i) => (
            <NavLink to={`/categories/${item.link}`} className="header__main-categories-text" activeClassName='header__main-categories-text_active' key={`main-categories-${i}`}>{item.name}</NavLink>
          ))}
          <NavLink to='/promo' className="header__main-categories-text header__main-categories-text_type_promo" activeClassName='header__main-categories-text_active'>Скидки тут</NavLink>
        </div>
        <div className="header__contacts">
          <a target="_blank" rel="noreferrer" href="tel:+79199401208" className="header__contacts-phone">+7 919 940 12 08</a>
          <div className="header__work-time">
            <p className="header__work-time-item">Пн-Пт 9–21</p>
            <p className="header__work-time-item">Сб-Вс 9–20</p>
          </div>
        </div>
      </div>

    </header>
  );
}

export default Header;
