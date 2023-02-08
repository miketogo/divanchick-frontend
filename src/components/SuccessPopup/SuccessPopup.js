import './SuccessPopup.css';
import React from "react";







function SuccessPopup({
    handleClose,
    isOpen,
}) {

  return (
    <div className={`success-popup ${isOpen ? 'success-popup_active' : ''}`}>
      <div className={`success-popup__container ${isOpen ? 'success-popup__container_active' : ''}`}>
        <div className="success-popup__close" onClick={handleClose}>
          <svg className="success-popup__close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 18L18 2M2 2L18 18" stroke="black" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="success-popup__text">Вы успешно оформили заказ!</p>
        <p className="success-popup__subtext">В ближайшее время с вами свяжется менеджер для уточнения деталей заказа</p>
        <div className="success-popup__btns">
          <div className="success-popup__btn success-popup__btn_disagree" onClick={handleClose}>
            <p className="success-popup__btn-text success-popup__btn-text_disagree">Вернуться к покупкам</p>
          </div>
        </div>

      </div>
      <div className={`success-popup__background ${isOpen ? 'success-popup__background_active' : ''}`} onClick={handleClose}>

      </div>
    </div>
  );
}

export default SuccessPopup;
