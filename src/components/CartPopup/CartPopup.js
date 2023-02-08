import './CartPopup.css';
import React from "react";


import { Link } from 'react-router-dom';
import moreIcon from '../../assets/images/more.svg'
import { MAIN_URL } from '../../assets/utils/constants';



function CartPopup({
  isCartPopupOpen,
  cart,
  setCart,
  handleCartPopupClose,
  handleLikeBtn,
  favouritesProducts,
  allCartProductsCount,
}) {



  React.useEffect(() => {
    if (isCartPopupOpen) {
      setTimeout(() => {
        var items = document.getElementById("cart-popup-items");
        items.scrollTo({ top: items.scrollHeight, behavior: 'smooth' });
      }, 300);
    }


  }, [isCartPopupOpen]);

  function handleAddCounter(id) {
    let new_cart = cart.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          count: item.count + 1
        }
      }
      return item
    })
    setCart(new_cart)
    localStorage.setItem("cart", JSON.stringify(new_cart));
  }

  function handleMinusCounter(id) {
    let new_cart = cart.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          count: item.count - 1
        }
      }
      return item
    })
    setCart(new_cart)
    localStorage.setItem("cart", JSON.stringify(new_cart));
  }

  function handleRemoveFromCart(id) {
    if (cart.length > 1) {
      let new_cart = cart.filter((item) => {
        if (item._id === id) return false
        return true
      })
      setCart(new_cart)
      localStorage.setItem("cart", JSON.stringify(new_cart));
    } else {
      setCart([])
      localStorage.setItem("cart", JSON.stringify([]));
      handleCartPopupClose()
    }

  }

  const getPrice = (item) => {

    const name = localStorage.getItem('city') ? localStorage.getItem('city') : 'Тобольск'
    let cityMap = {
      "Новый Уренгой": "63777e52c505252a8fc59c09",
      "Надым": "63777e62c505252a8fc59c0a",
      "Тобольск": "63777e74c505252a8fc59c0b",
    }
    let id = cityMap[name] ? cityMap[name] : "63777e74c505252a8fc59c0b"
    let value = item.firstc_data.price[id]
    return Number(value)
  }

  return (
    <div className={`cart-popup ${isCartPopupOpen ? 'cart-popup_active' : ''}`}>
      <div className={`cart-popup__container ${isCartPopupOpen ? 'cart-popup__container_active' : ''}`}>
        <div className="cart-popup__close-and-title">
          <p className="cart-popup__title">Корзина</p>
          <div className="cart-popup__close" onClick={handleCartPopupClose}>
            <svg className="cart-popup__close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18L18 2M2 2L18 18" stroke="black" strokeWidth="3.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="cart-popup__items" id='cart-popup-items'>
          {cart && cart.length > 0 ?
            cart.map((item, i) => (
              <>
                <div className="cart-popup__item cart-popup__item_pc">
                  <Link onClick={handleCartPopupClose} className="cart-popup__item-img" to={`/categories/${item.category.translit_name}/${item.sub_category.translit_name}/${item._id}`}>
                    <img className="cart-popup__item-img-photo" src={item.photos[0] ? `${MAIN_URL}/get-file/${item.photos[0]}` : ''} alt={item.name}></img>
                  </Link>

                  <div className="cart-popup__item-column">
                    <p className="cart-popup__article">Артикул: {item.firstc_data.barcode}</p>
                    <div className="cart-popup__item-row cart-popup__item-row_first">
                      <p className="cart-popup__name">{item.name}</p>
                      <div className="cart-popup__count-handler">
                        <svg onClick={() => {
                          if (item.count > 1) {
                            handleMinusCounter(item._id)
                          }
                          return
                        }} className={`cart-popup__count-less ${item.count === 1 ? 'cart-popup__count-less_inactive' : ''}`} width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect y="7.5" width="15" height="1" fill="#CBCBCB" />
                        </svg>
                        <p className="cart-popup__count-number">{item.count}</p>
                        <img onClick={() => handleAddCounter(item._id)} className="cart-popup__count-more" src={moreIcon} alt="add" />
                      </div>
                      <p className="cart-popup__price">{(item.count * getPrice(item)).toLocaleString('us')}&nbsp;₽</p>
                    </div>
                    <div className="cart-popup__item-row cart-popup__item-row_second">
                      {item.amount > 0 ?
                        <p className="cart-popup__take-from-showroom">Забрать сегодня <span className='cart-popup__take-from-showroom_span'>в шоуруме</span></p>
                        :
                        <p className="cart-popup__take-from-showroom">Доступно для предзаказа</p>
                      }

                      <div className="cart-popup__icons">

                        <svg onClick={() => { handleLikeBtn(item) }} className='cart-popup__icon-like' width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path className={`cart-popup__icon-like-bg ${favouritesProducts && favouritesProducts.filter((filt_item) => {
                            if (filt_item._id === item._id) return true
                            else return false
                          }).length > 0 ? 'cart-popup__icon-like-bg_active' : ''}`} d="M3.34327 17.0933L19 32.75L34.6567 17.0933C36.3972 15.3528 37.375 12.9922 37.375 10.5308C37.375 5.40514 33.2199 1.25 28.0942 1.25C25.6328 1.25 23.2722 2.22779 21.5317 3.96828L19 6.5L16.4683 3.96828C14.7278 2.22779 12.3672 1.25 9.90578 1.25C4.78014 1.25 0.625 5.40515 0.625 10.5308C0.625 12.9922 1.60279 15.3528 3.34327 17.0933Z" fill="var(--contrast-color)" />
                          <path className={`cart-popup__icon-like-stroke ${favouritesProducts && favouritesProducts.filter((filt_item) => {
                            if (filt_item._id === item._id) return true
                            else return false
                          }).length > 0 ? 'cart-popup__icon-like-stroke_active' : ''}`} d="M19 32.75L18.6464 33.1036C18.8417 33.2988 19.1583 33.2988 19.3536 33.1036L19 32.75ZM3.34327 17.0933L2.98972 17.4468L2.98972 17.4468L3.34327 17.0933ZM16.4683 3.96828L16.1147 4.32183L16.1147 4.32183L16.4683 3.96828ZM19 6.5L18.6464 6.85355C18.8417 7.04882 19.1583 7.04882 19.3536 6.85355L19 6.5ZM21.5317 3.96828L21.1782 3.61472L21.1782 3.61472L21.5317 3.96828ZM19.3536 32.3964L3.69683 16.7397L2.98972 17.4468L18.6464 33.1036L19.3536 32.3964ZM34.3032 16.7397L18.6464 32.3964L19.3536 33.1036L35.0103 17.4468L34.3032 16.7397ZM16.1147 4.32183L18.6464 6.85355L19.3536 6.14645L16.8218 3.61472L16.1147 4.32183ZM19.3536 6.85355L21.8853 4.32183L21.1782 3.61472L18.6464 6.14645L19.3536 6.85355ZM28.0942 0.75C25.5002 0.75 23.0124 1.78047 21.1782 3.61472L21.8853 4.32183C23.532 2.67511 25.7654 1.75 28.0942 1.75V0.75ZM36.875 10.5308C36.875 12.8596 35.9499 15.093 34.3032 16.7397L35.0103 17.4468C36.8445 15.6126 37.875 13.1248 37.875 10.5308H36.875ZM37.875 10.5308C37.875 5.129 33.496 0.75 28.0942 0.75V1.75C32.9437 1.75 36.875 5.68129 36.875 10.5308H37.875ZM9.90578 1.75C12.2346 1.75 14.468 2.67512 16.1147 4.32183L16.8218 3.61472C14.9876 1.78047 12.4998 0.75 9.90578 0.75V1.75ZM1.125 10.5308C1.125 5.68129 5.05629 1.75 9.90578 1.75V0.75C4.504 0.75 0.125 5.129 0.125 10.5308H1.125ZM3.69683 16.7397C2.05011 15.093 1.125 12.8596 1.125 10.5308H0.125C0.125 13.1248 1.15547 15.6126 2.98972 17.4468L3.69683 16.7397Z" fill="#121212" />
                        </svg>


                        <svg onClick={() => handleRemoveFromCart(item._id)} className="cart-popup__icon-trash" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.5 4.375V2.5C6.5 1.80964 7.02233 1.25 7.66667 1.25H12.3333C12.9777 1.25 13.5 1.80964 13.5 2.5V4.375M1.25 5H3M3 5H17M3 5V17.5C3 18.1904 3.52233 18.75 4.16667 18.75H15.8333C16.4777 18.75 17 18.1904 17 17.5V5M17 5H18.75M10 9.375V15.625M6.5 11.875V15.625M13.5 11.875V15.625" stroke="var(--contrast-color)" />
                        </svg>

                      </div>
                    </div>
                  </div>
                </div>




                {/* MOBILE */}
                <div className="cart-popup__item cart-popup__item_mobile">
                  <div className="cart-popup__item-row">
                    <Link onClick={handleCartPopupClose} className="cart-popup__item-img" to={`/item/${item.category.translit_name}/${item.sub_category.translit_name}/${item._id}`}>
                      <img className="cart-popup__item-img-photo" src={item.photos[0] ? `${MAIN_URL}/get-file/${item.photos[0]}` : ''} alt={item.name}></img>
                    </Link>
                    <div className="cart-popup__item-column">
                      <div className="cart-popup__icons">
                        <svg onClick={() => { handleLikeBtn(item) }} className='cart-popup__icon-like' width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path className={`cart-popup__icon-like-bg ${favouritesProducts && favouritesProducts.filter((filt_item) => {
                            if (filt_item._id === item._id) return true
                            else return false
                          }).length > 0 ? 'cart-popup__icon-like-bg_active' : ''}`} d="M3.34327 17.0933L19 32.75L34.6567 17.0933C36.3972 15.3528 37.375 12.9922 37.375 10.5308C37.375 5.40514 33.2199 1.25 28.0942 1.25C25.6328 1.25 23.2722 2.22779 21.5317 3.96828L19 6.5L16.4683 3.96828C14.7278 2.22779 12.3672 1.25 9.90578 1.25C4.78014 1.25 0.625 5.40515 0.625 10.5308C0.625 12.9922 1.60279 15.3528 3.34327 17.0933Z" fill="var(--contrast-color)" />
                          <path className={`cart-popup__icon-like-stroke ${favouritesProducts && favouritesProducts.filter((filt_item) => {
                            if (filt_item._id === item._id) return true
                            else return false
                          }).length > 0 ? 'cart-popup__icon-like-stroke_active' : ''}`} d="M19 32.75L18.6464 33.1036C18.8417 33.2988 19.1583 33.2988 19.3536 33.1036L19 32.75ZM3.34327 17.0933L2.98972 17.4468L2.98972 17.4468L3.34327 17.0933ZM16.4683 3.96828L16.1147 4.32183L16.1147 4.32183L16.4683 3.96828ZM19 6.5L18.6464 6.85355C18.8417 7.04882 19.1583 7.04882 19.3536 6.85355L19 6.5ZM21.5317 3.96828L21.1782 3.61472L21.1782 3.61472L21.5317 3.96828ZM19.3536 32.3964L3.69683 16.7397L2.98972 17.4468L18.6464 33.1036L19.3536 32.3964ZM34.3032 16.7397L18.6464 32.3964L19.3536 33.1036L35.0103 17.4468L34.3032 16.7397ZM16.1147 4.32183L18.6464 6.85355L19.3536 6.14645L16.8218 3.61472L16.1147 4.32183ZM19.3536 6.85355L21.8853 4.32183L21.1782 3.61472L18.6464 6.14645L19.3536 6.85355ZM28.0942 0.75C25.5002 0.75 23.0124 1.78047 21.1782 3.61472L21.8853 4.32183C23.532 2.67511 25.7654 1.75 28.0942 1.75V0.75ZM36.875 10.5308C36.875 12.8596 35.9499 15.093 34.3032 16.7397L35.0103 17.4468C36.8445 15.6126 37.875 13.1248 37.875 10.5308H36.875ZM37.875 10.5308C37.875 5.129 33.496 0.75 28.0942 0.75V1.75C32.9437 1.75 36.875 5.68129 36.875 10.5308H37.875ZM9.90578 1.75C12.2346 1.75 14.468 2.67512 16.1147 4.32183L16.8218 3.61472C14.9876 1.78047 12.4998 0.75 9.90578 0.75V1.75ZM1.125 10.5308C1.125 5.68129 5.05629 1.75 9.90578 1.75V0.75C4.504 0.75 0.125 5.129 0.125 10.5308H1.125ZM3.69683 16.7397C2.05011 15.093 1.125 12.8596 1.125 10.5308H0.125C0.125 13.1248 1.15547 15.6126 2.98972 17.4468L3.69683 16.7397Z" fill="#121212" />
                        </svg>

                        <svg onClick={() => handleRemoveFromCart(item._id)} className="cart-popup__icon-trash" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.5 4.375V2.5C6.5 1.80964 7.02233 1.25 7.66667 1.25H12.3333C12.9777 1.25 13.5 1.80964 13.5 2.5V4.375M1.25 5H3M3 5H17M3 5V17.5C3 18.1904 3.52233 18.75 4.16667 18.75H15.8333C16.4777 18.75 17 18.1904 17 17.5V5M17 5H18.75M10 9.375V15.625M6.5 11.875V15.625M13.5 11.875V15.625" stroke="var(--contrast-color)" />
                        </svg>

                      </div>
                      <p className="cart-popup__article">Артикул: {item.firstc_data.barcode}</p>
                      <div className="cart-popup__item-row cart-popup__item-row_first">
                        <p className="cart-popup__name">{item.name}</p>


                      </div>
                    </div>
                  </div>
                  <div className="cart-popup__item-row cart-popup__item-row_second">
                    <div className="cart-popup__count-handler">
                      <svg onClick={() => {
                        if (item.count > 1) {
                          handleMinusCounter(item._id)
                        }
                        return
                      }} className={`cart-popup__count-less ${item.count === 1 ? 'cart-popup__count-less_inactive' : ''}`} width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7.5" width="15" height="1" fill="#CBCBCB" />
                      </svg>
                      <p className="cart-popup__count-number">{item.count}</p>
                      <img onClick={() => handleAddCounter(item._id)} className="cart-popup__count-more" src={moreIcon} alt="add" />
                    </div>
                    <p className="cart-popup__price">{(item.count * getPrice(item)).toLocaleString('us')}&nbsp;₽</p>
                  </div>



                </div>
              </>
            ))

            : <></>}

        </div>
        <div className="cart-popup__lower-btns">
          <p className="cart-popup__amount">{allCartProductsCount.count} {allCartProductsCount.count % 10 === 1 && 'товар'}{(allCartProductsCount.count % 10 >= 2 && allCartProductsCount.count % 10 <= 4) && 'товара'}{((allCartProductsCount.count % 10 >= 5 && allCartProductsCount.count % 10 <= 9) || allCartProductsCount.count % 10 === 0) && 'товаров'} на {allCartProductsCount.totalPrice.toLocaleString('us')}&nbsp;₽</p>
          <Link to="/cart" className="cart-popup__order-btn" onClick={handleCartPopupClose}>
            <p className="cart-popup__order-btn-text">Оформить заказ</p>
          </Link>
          <div className="cart-popup__go-back-btn" onClick={handleCartPopupClose}>
            <p className="cart-popup__go-back-btn-text">Продолжить покупки</p>
          </div>
        </div>
      </div>
      <div className={`cart-popup__background ${isCartPopupOpen ? 'cart-popup__background_active' : ''}`} onClick={handleCartPopupClose}>

      </div>
    </div>
  );
}

export default CartPopup;
