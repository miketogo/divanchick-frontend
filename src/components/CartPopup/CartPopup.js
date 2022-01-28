import './CartPopup.css';
import React from "react";

import { Link } from 'react-router-dom';




function CartPopup(props) {

  

  React.useEffect(() => {
    if (props.isCartPopupOpen) {
      setTimeout(() => {
        var items = document.getElementById("cart-popup-items");
        items.scrollTo({ top: items.scrollHeight, behavior: 'smooth' });
      }, 300);
    }


  }, [props.isCartPopupOpen]);

  function handleAddCounter(id) {
    let cart = props.cart.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          count: item.count + 1
        }
      }
      return item
    })
    props.setCart(cart)
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function handleMinusCounter(id) {
    let cart = props.cart.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          count: item.count - 1
        }
      }
      return item
    })
    props.setCart(cart)
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function handleRemoveFromCart(id) {
    if (props.cart.length > 1) {
      let cart = props.cart.filter((item) => {
        if (item._id === id) return false
        return true
      })
      props.setCart(cart)
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      props.setCart([])
      localStorage.setItem("cart", JSON.stringify([]));
      props.handleCartPopupClose()
    }

  }

  return (
    <div className={`cart-popup ${props.isCartPopupOpen ? 'cart-popup_active' : ''}`}>
      <div className={`cart-popup__container ${props.isCartPopupOpen ? 'cart-popup__container_active' : ''}`}>
        <div className="cart-popup__close-and-title">
          <p className="cart-popup__title">Корзина</p>
          <div className="cart-popup__close" onClick={props.handleCartPopupClose}>
            <svg className="cart-popup__close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18L18 2M2 2L18 18" stroke="black" strokeWidth="3.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="cart-popup__items" id='cart-popup-items'>
          {props.cart && props.cart.length > 0 ?
            props.cart.map((item, i) => (
              <>
                <div className="cart-popup__item cart-popup__item_pc">
                  <img className="cart-popup__item-img" src={item.photos[0] !== 'Не указано' ? `${item.photos[0]}` : ''} alt={item.name}></img>
                  <div className="cart-popup__item-column">
                    <p className="cart-popup__article">Артикул: {item.article}</p>
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
                        <svg onClick={() => handleAddCounter(item._id)} className="cart-popup__count-more" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_970_15456)">
                            <rect x="8" y="0.5" width="15" height="0.999999" transform="rotate(90 8 0.5)" fill="#7C7C7C" />
                            <rect y="7.5" width="15" height="1" fill="#7C7C7C" />
                          </g>
                          <defs>
                            <clipPath id="clip0_970_15456">
                              <rect width="15" height="15" fill="white" transform="translate(0 0.5)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p className="cart-popup__price">{item.discount && item.discount > 0 ? (item.price - (item.price / 100 * item.discount)).toLocaleString('ru') : item.price.toLocaleString('ru')}&nbsp;₽</p>
                    </div>
                    <div className="cart-popup__item-row cart-popup__item-row_second">
                      {item.amount > 0 ?
                        <p className="cart-popup__take-from-showroom">Забрать сегодня <span className='cart-popup__take-from-showroom_span'>в шоуруме</span></p>
                        :
                        <p className="cart-popup__take-from-showroom">Доступно для предзаказа</p>
                      }

                      <div className="cart-popup__icons">
                        <svg className="cart-popup__icon-like" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 17.5L9.64645 17.8536C9.84171 18.0488 10.1583 18.0488 10.3536 17.8536L10 17.5ZM2.54442 10.0444L2.19086 10.398L2.19086 10.398L2.54442 10.0444ZM8.79442 3.79442L8.44086 4.14797L8.44086 4.14797L8.79442 3.79442ZM10 5L9.64645 5.35355C9.84171 5.54882 10.1583 5.54882 10.3536 5.35355L10 5ZM11.2056 3.79442L10.852 3.44086L10.852 3.44086L11.2056 3.79442ZM10.3536 17.1464L2.89797 9.69086L2.19086 10.398L9.64645 17.8536L10.3536 17.1464ZM17.102 9.69086L9.64645 17.1464L10.3536 17.8536L17.8091 10.398L17.102 9.69086ZM8.44086 4.14797L9.64645 5.35355L10.3536 4.64645L9.14797 3.44086L8.44086 4.14797ZM10.3536 5.35355L11.5591 4.14797L10.852 3.44086L9.64645 4.64645L10.3536 5.35355ZM14.3306 2C13.0259 2 11.7746 2.51829 10.852 3.44086L11.5591 4.14797C12.2942 3.41294 13.2911 3 14.3306 3V2ZM18.25 6.91942C18.25 7.95891 17.8371 8.95583 17.102 9.69086L17.8091 10.398C18.7317 9.4754 19.25 8.22413 19.25 6.91942H18.25ZM19.25 6.91942C19.25 4.2025 17.0475 2 14.3306 2V3C16.4952 3 18.25 4.75478 18.25 6.91942H19.25ZM5.66942 3C6.70891 3 7.70583 3.41294 8.44086 4.14797L9.14797 3.44086C8.2254 2.51829 6.97413 2 5.66942 2V3ZM1.75 6.91942C1.75 4.75478 3.50478 3 5.66942 3V2C2.9525 2 0.75 4.2025 0.75 6.91942H1.75ZM2.89797 9.69086C2.16294 8.95583 1.75 7.95891 1.75 6.91942H0.75C0.75 8.22413 1.26829 9.4754 2.19086 10.398L2.89797 9.69086Z" fill="#9B38DC" />
                        </svg>

                        <svg onClick={() => handleRemoveFromCart(item._id)} className="cart-popup__icon-trash" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.5 4.375V2.5C6.5 1.80964 7.02233 1.25 7.66667 1.25H12.3333C12.9777 1.25 13.5 1.80964 13.5 2.5V4.375M1.25 5H3M3 5H17M3 5V17.5C3 18.1904 3.52233 18.75 4.16667 18.75H15.8333C16.4777 18.75 17 18.1904 17 17.5V5M17 5H18.75M10 9.375V15.625M6.5 11.875V15.625M13.5 11.875V15.625" stroke="#9B38DC" />
                        </svg>

                      </div>
                    </div>
                  </div>
                </div>




                {/* MOBILE */}
                <div className="cart-popup__item cart-popup__item_mobile">
                  <div className="cart-popup__item-row">
                    <img className="cart-popup__item-img" src={item.photos[0] !== 'Не указано' ? `${item.photos[0]}` : ''} alt={item.name}></img>
                    <div className="cart-popup__item-column">
                      <div className="cart-popup__icons">
                        <svg className="cart-popup__icon-like" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 17.5L9.64645 17.8536C9.84171 18.0488 10.1583 18.0488 10.3536 17.8536L10 17.5ZM2.54442 10.0444L2.19086 10.398L2.19086 10.398L2.54442 10.0444ZM8.79442 3.79442L8.44086 4.14797L8.44086 4.14797L8.79442 3.79442ZM10 5L9.64645 5.35355C9.84171 5.54882 10.1583 5.54882 10.3536 5.35355L10 5ZM11.2056 3.79442L10.852 3.44086L10.852 3.44086L11.2056 3.79442ZM10.3536 17.1464L2.89797 9.69086L2.19086 10.398L9.64645 17.8536L10.3536 17.1464ZM17.102 9.69086L9.64645 17.1464L10.3536 17.8536L17.8091 10.398L17.102 9.69086ZM8.44086 4.14797L9.64645 5.35355L10.3536 4.64645L9.14797 3.44086L8.44086 4.14797ZM10.3536 5.35355L11.5591 4.14797L10.852 3.44086L9.64645 4.64645L10.3536 5.35355ZM14.3306 2C13.0259 2 11.7746 2.51829 10.852 3.44086L11.5591 4.14797C12.2942 3.41294 13.2911 3 14.3306 3V2ZM18.25 6.91942C18.25 7.95891 17.8371 8.95583 17.102 9.69086L17.8091 10.398C18.7317 9.4754 19.25 8.22413 19.25 6.91942H18.25ZM19.25 6.91942C19.25 4.2025 17.0475 2 14.3306 2V3C16.4952 3 18.25 4.75478 18.25 6.91942H19.25ZM5.66942 3C6.70891 3 7.70583 3.41294 8.44086 4.14797L9.14797 3.44086C8.2254 2.51829 6.97413 2 5.66942 2V3ZM1.75 6.91942C1.75 4.75478 3.50478 3 5.66942 3V2C2.9525 2 0.75 4.2025 0.75 6.91942H1.75ZM2.89797 9.69086C2.16294 8.95583 1.75 7.95891 1.75 6.91942H0.75C0.75 8.22413 1.26829 9.4754 2.19086 10.398L2.89797 9.69086Z" fill="#9B38DC" />
                        </svg>

                        <svg onClick={() => handleRemoveFromCart(item._id)} className="cart-popup__icon-trash" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.5 4.375V2.5C6.5 1.80964 7.02233 1.25 7.66667 1.25H12.3333C12.9777 1.25 13.5 1.80964 13.5 2.5V4.375M1.25 5H3M3 5H17M3 5V17.5C3 18.1904 3.52233 18.75 4.16667 18.75H15.8333C16.4777 18.75 17 18.1904 17 17.5V5M17 5H18.75M10 9.375V15.625M6.5 11.875V15.625M13.5 11.875V15.625" stroke="#9B38DC" />
                        </svg>

                      </div>
                      <p className="cart-popup__article">Артикул: {item.article}</p>
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
                      <svg onClick={() => handleAddCounter(item._id)} className="cart-popup__count-more" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_970_15456)">
                          <rect x="8" y="0.5" width="15" height="0.999999" transform="rotate(90 8 0.5)" fill="#7C7C7C" />
                          <rect y="7.5" width="15" height="1" fill="#7C7C7C" />
                        </g>
                        <defs>
                          <clipPath id="clip0_970_15456">
                            <rect width="15" height="15" fill="white" transform="translate(0 0.5)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <p className="cart-popup__price">{item.discount && item.discount > 0 ? (item.price - (item.price / 100 * item.discount)).toLocaleString('ru') : item.price.toLocaleString('ru')}&nbsp;₽</p>
                  </div>
                

                  
                </div>
              </>
            ))

            : <></>}

        </div>
        <div className="cart-popup__lower-btns">
          <p className="cart-popup__amount">{props.allCartProductsCount.count} {props.allCartProductsCount.count % 10 === 1 && 'товар'}{(props.allCartProductsCount.count % 10 >= 2 && props.allCartProductsCount.count % 10 <= 4) && 'товара'}{((props.allCartProductsCount.count % 10 >= 5 && props.allCartProductsCount.count % 10 <= 9) || props.allCartProductsCount.count % 10 === 0) && 'товаров'} на {props.allCartProductsCount.totalPrice.toLocaleString('ru')}&nbsp;₽</p>
          <Link to="/cart" className="cart-popup__order-btn" onClick={props.handleCartPopupClose}>
            <p className="cart-popup__order-btn-text">Оформить заказ</p>
          </Link>
          <div className="cart-popup__go-back-btn" onClick={props.handleCartPopupClose}>
            <p className="cart-popup__go-back-btn-text">Продолжить покупки</p>
          </div>
        </div>
      </div>
      <div className={`cart-popup__background ${props.isCartPopupOpen ? 'cart-popup__background_active' : ''}`} onClick={props.handleCartPopupClose}>

      </div>
    </div>
  );
}

export default CartPopup;
