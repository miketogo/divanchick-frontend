import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

import logo from '../../assets/images/header/logo.png'
import SelectCategory from './SelectCategory/SelectCategory';
import mainApi from '../../assets/api/MainApi';
import { MAIN_CATEGORIES, MAIN_URL } from '../../assets/utils/constants';
import MiniPreloader from '../MiniPreloader/MiniPreloader';

function translit(word) {
  var answer = '';
  var converter = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
    'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
    'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
    'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
    'э': 'e', 'ю': 'yu', 'я': 'ya',

    'А': 'a', 'Б': 'b', 'В': 'v', 'Г': 'g', 'Д': 'd',
    'Е': 'e', 'Ё': 'e', 'Ж': 'zh', 'З': 'z', 'И': 'i',
    'Й': 'y', 'К': 'k', 'Л': 'l', 'М': 'm', 'Н': 'n',
    'О': 'o', 'П': 'p', 'Р': 'r', 'С': 's', 'Т': 't',
    'У': 'u', 'Ф': 'f', 'Х': 'h', 'Ц': 'c', 'Ч': 'ch',
    'Ш': 'sh', 'Щ': 'sch', 'Ь': '', 'Ы': 'y', 'Ъ': '',
    'Э': 'e', 'Ю': 'yu', 'Я': 'ya', '-': '_', ' ': '_'
  };

  for (var i = 0; i < word.length; ++i) {
    if (converter[word[i]] === undefined) {
      answer += word[i].toLowerCase();
    } else {
      answer += converter[word[i]];
    }
  }

  return answer;
}

function Header(props) {
  const ref = React.useRef()
  const [searchValue, setSearchValue] = React.useState('');
  const [isDropDownOpened, setDropDownOpened] = React.useState(false);
  const [isSelectCategoryOpened, setSelectCategoryOpened] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState({});
  const [filterdProducts, setFilterdProducts] = React.useState([]);

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
  const [isSearchPreloaderVisible, setSearchPreloaderVisible] = useState(false)
  function handleSearchChange(e) {
    let value = e.target.value
    if (e.target.value === '') {
      setSearchValue(value)
      setDropDownOpened(false)
    }
    else {
      setDropDownOpened(true)
      setSearchValue(value)
      setSearchPreloaderVisible(true)
      mainApi.searchItems({
        text: value.toLowerCase(),
        limit: 5,
      })
        .then((res) => {
          console.log(res.data)
          setFilterdProducts(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setSearchPreloaderVisible(false)
        })
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


  function handleSelectCategoryOpen() {
    console.log('dds')
    setSelectCategoryOpened(true)
  }
  function handleSelectCategoryClose() {
    console.log('dds')
    setTimeout(() => {
      setSelectCategoryOpened(false)
    }, 1);

  }
  return (
    <header className="header">
      <div className="header__row">
        {props.screenWidth > 937 ?
          <></> :
          <div onClick={handleSelectCategoryOpen} className="header__category-button">
            <svg className="header__category-button-icon" width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="2" rx="1" fill="#0FB0B5" />
              <rect y="6" width="13" height="2" rx="1" fill="#0FB0B5" />
            </svg>

            <p className="header__category-button-text">Все категории</p>
            <SelectCategory isSelectCategoryOpened={isSelectCategoryOpened} categories={props.categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} handleSelectCategoryClose={handleSelectCategoryClose} />

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

              <svg
                width={69}
                height={39}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="header__logo-img"
                viewBox='0 0 69 39'
              >
                <g clipPath="url(#prefix__clip0_1802_32552)">
                  <ellipse cx={34.475} cy={19.5} rx={33.917} ry={19.5} fill="#fff" />
                  <ellipse
                    cx={34.475}
                    cy={19.546}
                    rx={29.984}
                    ry={18.908}
                    fill="#E11C23"
                  />
                  <path
                    d="M52.465 15.49c-3.646-3.571-8.124-5.527-10.027-6.059l.384 1.185c4.452 1.348 7.74 3.736 8.731 4.875h.912zM14.518 15.582h-.815c1.765-1.896 6.172-4.556 8.155-5.65v1.185c-2.034.838-5.98 3.326-7.34 4.465z"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth={1.549}
                  />
                  <path
                    d="M38.553 20.457c8.213-4.228 4.653-11.102 1.823-13.987-2.975 1.594-12.953 13.167-9.067 14.625 3.108 1.166 6.124.06 7.244-.638z"
                    fill="#fff"
                  />
                  <path
                    d="M21.945 11.415c1.64 4.896 6.39 4.76 10.011 4.449 1.512-2.834 5.83-7.48 8.42-9.395-4.082-4.212-10.234-3.708-12.988-2.951-2.414.544-7.1 2.948-5.443 7.897z"
                    fill="#fff"
                  />
                  <path
                    d="M22.925 9.144c.307 3.754 6.908 4.905 10.17 5.012.922-1.64 3.966-4.723 5.373-6.06-.538-.364-2.367-1.124-3.215-1.458-3.31-1.184-12.712-2.187-12.328 2.506zM39.427 8.78c-1.036.801-3.214 3.462-4.174 4.692-.064.094-.306.49 0 .482 1.728-.045 2.975-.957 3.071-.729.077.183-.32.562-.528.73-1.036.838-2.958 1.637-3.79 1.932-1.151 2.442.096 3.326.864 3.463 3.032.583 5.133-.73 5.804-1.458 4.145-3.973.896-7.73-1.247-9.112z"
                    fill="#E11C23"
                  />
                  <path
                    d="M42.456 5.476c-.28.062-1.567.798-2.176 1.158l.427.656c.404-.309 1.93-1.106 2.643-1.466-.181-.142-.614-.41-.894-.348zM16.005 32.166h-.576c2.111-3.371 9.365-9.75 19.19-9.75 9.825 0 17.078 6.378 19.19 9.75h-.576c-1.76-2.81-8.52-8.565-18.614-8.565-10.094 0-16.743 5.755-18.614 8.565z"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth={1.549}
                  />
                  <path
                    d="M34.715 29.979c-12.972 0-18.582-4.86-19.765-7.29h-1.535c1.439 2.916 7.714 8.748 21.3 8.748s19.797-5.832 21.204-8.748h-1.535c-1.151 2.43-6.697 7.29-19.67 7.29z"
                    fill="#fff"
                  />
                  <path
                    d="M12.55 19.91c0 1.203.576 2.354.864 2.78h1.488c-.832-1.367-1.632-4.238.527-4.238 1.871 0 1.088 2.233.288 3.372l1.103.729c.672-.912 1.312-2.05 1.344-2.734 0-2.187-1.535-2.642-3.023-2.642-1.487 0-2.59 1.23-2.59 2.733zM56.734 19.864c0 1.203-.527 2.4-.815 2.825h-1.535c.831-1.367 1.63-4.282-.528-4.282-1.871 0-1.087 2.232-.288 3.371l-1.103.729c-.672-.911-1.312-2.05-1.344-2.734 0-2.186 1.536-2.642 3.023-2.642s2.59 1.23 2.59 2.733z"
                    fill="#fff"
                  />
                </g>
                <defs>
                  <clipPath id="prefix__clip0_1802_32552">
                    <path fill="#fff" d="M0 0h69v39H0z" />
                  </clipPath>
                </defs>
              </svg>

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
          <a rel="noreferrer" href="tel:+79199401208" className="header__nav-item">+7 919 940 12 08</a>
          {/* <Link className="header__nav-item header__nav-item_type_track-order" to="/">Что с моим заказом?</Link> */}
        </nav>
        {props.screenWidth > 937 ?
          <></> :
          <a rel="noreferrer" href="tel:+79199401208" className="header__contacts-phone">+7 919 940 12 08</a>
        }
        {props.screenWidth > 750 ?
          <></>
          :
          <div className="header__mobile-icons">
            <a rel="noreferrer" href="tel:+79199401208" className="header__mobile-icon header__mobile-icon_phone">
              <svg className="header__icon-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.8216 20C13.4713 20 11.3961 19.2773 9.27081 18.0674C8.58209 17.6748 6.91266 16.4714 5.51633 15.1337C4.02254 13.7036 2.69531 12.0092 2.22994 11.2636C0.833499 9.02722 0 6.88564 0 5.53546C0 3.14151 3.40846 0.407984 3.79733 0.103891C4.01119 -0.0630553 4.31153 -0.0248802 4.48145 0.190229L8.12915 4.80838C8.30311 5.02877 8.27814 5.35458 8.07335 5.54297C6.99164 6.5373 6.01861 7.64734 5.92108 7.99503C5.99809 8.37475 7.1091 9.8103 8.67403 11.3651C8.69161 11.3773 8.70807 11.3903 8.72383 11.4047C10.34 12.8927 11.8638 13.9616 12.263 14.0229C12.5836 13.8773 13.5495 12.7319 14.3635 11.5282C14.5212 11.2943 14.827 11.2363 15.0525 11.3968L19.7795 14.7614C19.9999 14.9182 20.0656 15.2294 19.9286 15.4692C19.6796 15.9064 17.4321 19.7467 15.1684 19.9824C15.0589 19.994 14.9422 19.9999 14.8216 19.9999L14.8216 20ZM4.02104 1.2579C2.92652 2.19439 1.00178 4.13242 1.00178 5.53549C1.00178 6.65391 1.81256 8.67501 3.06726 10.6848C3.50392 11.3844 4.7614 12.9855 6.19059 14.3542C7.57335 15.6786 9.18949 16.8221 9.7475 17.1397C11.7035 18.2534 13.6477 18.9456 14.8216 18.9456C14.9092 18.9456 14.9923 18.9413 15.0692 18.9334C16.3953 18.7951 18.0372 16.5881 18.8147 15.3496L14.8921 12.5571C14.0545 13.7503 13.0251 15.0077 12.368 15.0759C12.3403 15.0791 12.3118 15.0806 12.2822 15.0806C11.2772 15.0806 8.7482 12.8257 8.11776 12.2488C8.09042 12.2313 8.06475 12.2105 8.0416 12.1877C7.30838 11.463 4.9163 9.01763 4.9163 7.98341C4.9163 7.28832 6.00333 6.08563 7.04817 5.0904L4.02104 1.2579Z" fill="black" />
              </svg>


            </a>
            <Link to="/favourites" className="header__mobile-icon">
              {props.favouritesProducts && props.favouritesProducts.length > 0 ? <p className="header__icon-counter">{props.favouritesProducts.length}</p> : <></>}
              <svg className="header__icon-svg" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 16.5L9.55806 16.9419C9.80214 17.186 10.1979 17.186 10.4419 16.9419L10 16.5ZM2.54442 9.04442L2.10247 9.48636L2.10247 9.48636L2.54442 9.04442ZM8.79442 2.79442L8.35248 3.23636L8.35248 3.23636L8.79442 2.79442ZM10 4L9.55806 4.44194C9.80214 4.68602 10.1979 4.68602 10.4419 4.44194L10 4ZM11.2056 2.79442L10.7636 2.35247L10.7636 2.35248L11.2056 2.79442ZM10.4419 16.0581L2.98636 8.60247L2.10247 9.48636L9.55806 16.9419L10.4419 16.0581ZM17.0136 8.60248L9.55806 16.0581L10.4419 16.9419L17.8975 9.48636L17.0136 8.60248ZM8.35248 3.23636L9.55806 4.44194L10.4419 3.55806L9.23636 2.35248L8.35248 3.23636ZM10.4419 4.44194L11.6475 3.23636L10.7636 2.35248L9.55806 3.55806L10.4419 4.44194ZM14.3306 0.875C12.9927 0.875 11.7097 1.40646 10.7636 2.35247L11.6475 3.23636C12.3591 2.52477 13.3242 2.125 14.3306 2.125V0.875ZM18.125 5.91942C18.125 6.92576 17.7252 7.89088 17.0136 8.60248L17.8975 9.48636C18.8435 8.54035 19.375 7.25728 19.375 5.91942H18.125ZM19.375 5.91942C19.375 3.13346 17.1165 0.875 14.3306 0.875V2.125C16.4262 2.125 18.125 3.82382 18.125 5.91942H19.375ZM5.66942 2.125C6.67576 2.125 7.64088 2.52477 8.35248 3.23636L9.23636 2.35248C8.29035 1.40646 7.00728 0.875 5.66942 0.875V2.125ZM1.875 5.91942C1.875 3.82382 3.57382 2.125 5.66942 2.125V0.875C2.88346 0.875 0.625 3.13346 0.625 5.91942H1.875ZM2.98636 8.60247C2.27477 7.89088 1.875 6.92576 1.875 5.91942H0.625C0.625 7.25728 1.15646 8.54035 2.10247 9.48636L2.98636 8.60247Z" fill="black" />
              </svg>
            </Link>
            <Link to="/profile" className="header__mobile-icon">


              <svg className="header__icon-svg" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.1501 5.06429C11.1501 7.17105 9.4881 8.87858 7.43756 8.87858C5.38702 8.87858 3.72506 7.17105 3.72506 5.06429C3.72506 2.95753 5.38702 1.25 7.43756 1.25C9.4881 1.25 11.1501 2.95753 11.1501 5.06429Z" stroke="black" strokeWidth="1.25" strokeLinecap="square" />
                <path fillRule="evenodd" clipRule="evenodd" d="M13.6251 18.75H1.25006C1.25006 17.8466 1.25006 16.9872 1.25006 16.209C1.25006 14.101 2.9122 12.3928 4.96256 12.3928H9.91256C11.9629 12.3928 13.6251 14.101 13.6251 16.209C13.6251 16.9872 13.6251 17.8466 13.6251 18.75Z" stroke="black" strokeWidth="1.25" strokeLinecap="square" />
              </svg>
            </Link>
            <Link to="/cart" className="header__mobile-icon">
              {props.allCartProductsCount.count && props.allCartProductsCount.count > 0 ? <p className="header__icon-counter">{props.allCartProductsCount.count}</p> : <></>}


              <svg className="header__icon-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.04687 3.33333L2.34375 1H0M3.04687 3.33333L5.85938 12.6667H18.75V5.66667C18.75 4.378 17.7007 3.33333 16.4062 3.33333H3.04687ZM16.4062 18.5C15.759 18.5 15.2344 17.9777 15.2344 17.3333C15.2344 16.689 15.759 16.1667 16.4062 16.1667C17.0535 16.1667 17.5781 16.689 17.5781 17.3333C17.5781 17.9777 17.0535 18.5 16.4062 18.5ZM7.03125 17.3333C7.03125 16.689 7.55592 16.1667 8.20312 16.1667C8.85033 16.1667 9.375 16.689 9.375 17.3333C9.375 17.9777 8.85033 18.5 8.20312 18.5C7.55592 18.5 7.03125 17.9777 7.03125 17.3333Z" stroke="black" strokeWidth="1.25" />
              </svg>
            </Link>

          </div>

        }
      </div>
      <div className="header__row header__row_second">
        {
          props.screenWidth > 1115 ?
            <Link className="header__logo" to="/">

              <svg
                width={69}
                height={39}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="header__logo-img"
                viewBox='0 0 69 39'
              >
                <g clipPath="url(#prefix__clip0_1802_32552)">
                  <ellipse cx={34.475} cy={19.5} rx={33.917} ry={19.5} fill="#fff" />
                  <ellipse
                    cx={34.475}
                    cy={19.546}
                    rx={29.984}
                    ry={18.908}
                    fill="#E11C23"
                  />
                  <path
                    d="M52.465 15.49c-3.646-3.571-8.124-5.527-10.027-6.059l.384 1.185c4.452 1.348 7.74 3.736 8.731 4.875h.912zM14.518 15.582h-.815c1.765-1.896 6.172-4.556 8.155-5.65v1.185c-2.034.838-5.98 3.326-7.34 4.465z"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth={1.549}
                  />
                  <path
                    d="M38.553 20.457c8.213-4.228 4.653-11.102 1.823-13.987-2.975 1.594-12.953 13.167-9.067 14.625 3.108 1.166 6.124.06 7.244-.638z"
                    fill="#fff"
                  />
                  <path
                    d="M21.945 11.415c1.64 4.896 6.39 4.76 10.011 4.449 1.512-2.834 5.83-7.48 8.42-9.395-4.082-4.212-10.234-3.708-12.988-2.951-2.414.544-7.1 2.948-5.443 7.897z"
                    fill="#fff"
                  />
                  <path
                    d="M22.925 9.144c.307 3.754 6.908 4.905 10.17 5.012.922-1.64 3.966-4.723 5.373-6.06-.538-.364-2.367-1.124-3.215-1.458-3.31-1.184-12.712-2.187-12.328 2.506zM39.427 8.78c-1.036.801-3.214 3.462-4.174 4.692-.064.094-.306.49 0 .482 1.728-.045 2.975-.957 3.071-.729.077.183-.32.562-.528.73-1.036.838-2.958 1.637-3.79 1.932-1.151 2.442.096 3.326.864 3.463 3.032.583 5.133-.73 5.804-1.458 4.145-3.973.896-7.73-1.247-9.112z"
                    fill="#E11C23"
                  />
                  <path
                    d="M42.456 5.476c-.28.062-1.567.798-2.176 1.158l.427.656c.404-.309 1.93-1.106 2.643-1.466-.181-.142-.614-.41-.894-.348zM16.005 32.166h-.576c2.111-3.371 9.365-9.75 19.19-9.75 9.825 0 17.078 6.378 19.19 9.75h-.576c-1.76-2.81-8.52-8.565-18.614-8.565-10.094 0-16.743 5.755-18.614 8.565z"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth={1.549}
                  />
                  <path
                    d="M34.715 29.979c-12.972 0-18.582-4.86-19.765-7.29h-1.535c1.439 2.916 7.714 8.748 21.3 8.748s19.797-5.832 21.204-8.748h-1.535c-1.151 2.43-6.697 7.29-19.67 7.29z"
                    fill="#fff"
                  />
                  <path
                    d="M12.55 19.91c0 1.203.576 2.354.864 2.78h1.488c-.832-1.367-1.632-4.238.527-4.238 1.871 0 1.088 2.233.288 3.372l1.103.729c.672-.912 1.312-2.05 1.344-2.734 0-2.187-1.535-2.642-3.023-2.642-1.487 0-2.59 1.23-2.59 2.733zM56.734 19.864c0 1.203-.527 2.4-.815 2.825h-1.535c.831-1.367 1.63-4.282-.528-4.282-1.871 0-1.087 2.232-.288 3.371l-1.103.729c-.672-.911-1.312-2.05-1.344-2.734 0-2.186 1.536-2.642 3.023-2.642s2.59 1.23 2.59 2.733z"
                    fill="#fff"
                  />
                </g>
                <defs>
                  <clipPath id="prefix__clip0_1802_32552">
                    <path fill="#fff" d="M0 0h69v39H0z" />
                  </clipPath>
                </defs>
              </svg>
              <p className="header__logo-text">Мебельный<br />Магазин</p>
            </Link>
            : <></>
        }
        {props.screenWidth > 937 ?
          <div onClick={handleSelectCategoryOpen} className="header__category-button">
            <svg className="header__category-button-icon" width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="2" rx="1" fill="#0FB0B5" />
              <rect y="6" width="13" height="2" rx="1" fill="#0FB0B5" />
            </svg>

            <p className="header__category-button-text">Все категории</p>
            <SelectCategory isSelectCategoryOpened={isSelectCategoryOpened} categories={props.categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} handleSelectCategoryClose={handleSelectCategoryClose} />
          </div>
          :
          <></>}

        <div onClick={() => {
          handleDropDownOpen()
        }} className="header__input-container" ref={ref}>
          <input placeholder="Ищите среди 15 000 товаров!" className="header__input" name="search" type="text" value={searchValue} onChange={handleSearchChange} maxLength="50"></input>
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
            {isSearchPreloaderVisible ?
              <div className='header__input-dropdown-preloader'>
                <MiniPreloader />
              </div>
              :
              filterdProducts.length > 0 ?
                filterdProducts.map((product, i) => (
                  <Link onClick={closeDropdown} to={`/categories/${product.category.translit_name}/${product.sub_category.translit_name}/${product._id}`} className="search__product-link" key={`search-product${i}`}>
                    <img className="search__product-img" src={`${MAIN_URL}/get-file/${product.photos[0]}`} alt={product.name} />
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
        {props.screenWidth > 750 ?
          <div className="header__icons">
            <Link to="/favourites" className="header__icon">
              <div className="header__icon-container">
                {props.favouritesProducts && props.favouritesProducts.length > 0 ? <p className="header__icon-counter">{props.favouritesProducts.length}</p> : <></>}

                <svg className="header__icon-svg" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 16.5L9.55806 16.9419C9.80214 17.186 10.1979 17.186 10.4419 16.9419L10 16.5ZM2.54442 9.04442L2.10247 9.48636L2.10247 9.48636L2.54442 9.04442ZM8.79442 2.79442L8.35248 3.23636L8.35248 3.23636L8.79442 2.79442ZM10 4L9.55806 4.44194C9.80214 4.68602 10.1979 4.68602 10.4419 4.44194L10 4ZM11.2056 2.79442L10.7636 2.35247L10.7636 2.35248L11.2056 2.79442ZM10.4419 16.0581L2.98636 8.60247L2.10247 9.48636L9.55806 16.9419L10.4419 16.0581ZM17.0136 8.60248L9.55806 16.0581L10.4419 16.9419L17.8975 9.48636L17.0136 8.60248ZM8.35248 3.23636L9.55806 4.44194L10.4419 3.55806L9.23636 2.35248L8.35248 3.23636ZM10.4419 4.44194L11.6475 3.23636L10.7636 2.35248L9.55806 3.55806L10.4419 4.44194ZM14.3306 0.875C12.9927 0.875 11.7097 1.40646 10.7636 2.35247L11.6475 3.23636C12.3591 2.52477 13.3242 2.125 14.3306 2.125V0.875ZM18.125 5.91942C18.125 6.92576 17.7252 7.89088 17.0136 8.60248L17.8975 9.48636C18.8435 8.54035 19.375 7.25728 19.375 5.91942H18.125ZM19.375 5.91942C19.375 3.13346 17.1165 0.875 14.3306 0.875V2.125C16.4262 2.125 18.125 3.82382 18.125 5.91942H19.375ZM5.66942 2.125C6.67576 2.125 7.64088 2.52477 8.35248 3.23636L9.23636 2.35248C8.29035 1.40646 7.00728 0.875 5.66942 0.875V2.125ZM1.875 5.91942C1.875 3.82382 3.57382 2.125 5.66942 2.125V0.875C2.88346 0.875 0.625 3.13346 0.625 5.91942H1.875ZM2.98636 8.60247C2.27477 7.89088 1.875 6.92576 1.875 5.91942H0.625C0.625 7.25728 1.15646 8.54035 2.10247 9.48636L2.98636 8.60247Z" fill="black" />
                </svg>
              </div>
              <p className="header__icon-title">Избранное</p>
            </Link>
            <Link to="/profile" className="header__icon">
              <div className="header__icon-container">


                <svg className="header__icon-svg" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.1501 5.06429C11.1501 7.17105 9.4881 8.87858 7.43756 8.87858C5.38702 8.87858 3.72506 7.17105 3.72506 5.06429C3.72506 2.95753 5.38702 1.25 7.43756 1.25C9.4881 1.25 11.1501 2.95753 11.1501 5.06429Z" stroke="black" strokeWidth="1.25" strokeLinecap="square" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.6251 18.75H1.25006C1.25006 17.8466 1.25006 16.9872 1.25006 16.209C1.25006 14.101 2.9122 12.3928 4.96256 12.3928H9.91256C11.9629 12.3928 13.6251 14.101 13.6251 16.209C13.6251 16.9872 13.6251 17.8466 13.6251 18.75Z" stroke="black" strokeWidth="1.25" strokeLinecap="square" />
                </svg>
              </div>
              <p className="header__icon-title">{props.loggedIn ? 'Профиль' : 'Войти'}</p>
            </Link>
            <Link to="/cart" className="header__icon">
              <div className="header__icon-container">
                {props.allCartProductsCount.count && props.allCartProductsCount.count > 0 ? <p className="header__icon-counter">{props.allCartProductsCount.count}</p> : <></>}

                <svg className="header__icon-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.04687 3.33333L2.34375 1H0M3.04687 3.33333L5.85938 12.6667H18.75V5.66667C18.75 4.378 17.7007 3.33333 16.4062 3.33333H3.04687ZM16.4062 18.5C15.759 18.5 15.2344 17.9777 15.2344 17.3333C15.2344 16.689 15.759 16.1667 16.4062 16.1667C17.0535 16.1667 17.5781 16.689 17.5781 17.3333C17.5781 17.9777 17.0535 18.5 16.4062 18.5ZM7.03125 17.3333C7.03125 16.689 7.55592 16.1667 8.20312 16.1667C8.85033 16.1667 9.375 16.689 9.375 17.3333C9.375 17.9777 8.85033 18.5 8.20312 18.5C7.55592 18.5 7.03125 17.9777 7.03125 17.3333Z" stroke="black" strokeWidth="1.25" />
                </svg>

              </div>
              <p className="header__icon-title">Корзина</p>
            </Link>
          </div>
          : <></>}

      </div>
      <div className="header__row header__row_third">
        <div className="header__main-categories">
          {MAIN_CATEGORIES.slice(0, 9).map((item, i) => (
            <NavLink to={`/categories/${item.translit_name}`} className="header__main-categories-text" activeClassName='header__main-categories-text_active' key={`main-categories-${i}`}>{item.name}</NavLink>
          ))}
          {/* <NavLink to='/promo' className="header__main-categories-text header__main-categories-text_type_promo" activeClassName='header__main-categories-text_active'>Скидки тут</NavLink> */}
        </div>
        <div className="header__contacts">

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
