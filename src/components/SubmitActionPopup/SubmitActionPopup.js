import './SubmitActionPopup.css';
import React from "react";







function SubmitActionPopup(props) {
  
  return (
    <div className={`submit-act-popup ${props.isSubmitActionPopupOpen ? 'submit-act-popup_active' : ''}`}>
      <div className={`submit-act-popup__container ${props.isSubmitActionPopupOpen ? 'submit-act-popup__container_active' : ''}`}>
        <div className="submit-act-popup__close" onClick={props.handleSubmitActionPopupClose}>
          <svg className="submit-act-popup__close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 18L18 2M2 2L18 18" stroke="black" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="submit-act-popup__text">Вы уверены что хотите очистить корзину?</p>
        <div className="submit-act-popup__btns">
          <div className="submit-act-popup__btn submit-act-popup__btn_agree" onClick={props.handleSubmitActionPopupSubmit}>
            <p className="submit-act-popup__btn-text submit-act-popup__btn-text_agree">Очистить корзину</p>
          </div>
          <div className="submit-act-popup__btn submit-act-popup__btn_disagree" onClick={props.handleSubmitActionPopupClose}>
            <p className="submit-act-popup__btn-text submit-act-popup__btn-text_disagree">Вернуться в корзину</p>
          </div>
        </div>

      </div>
      <div className={`submit-act-popup__background ${props.isSubmitActionPopupOpen ? 'submit-act-popup__background_active' : ''}`} onClick={props.handleSubmitActionPopupClose}>

      </div>
    </div>
  );
}

export default SubmitActionPopup;
