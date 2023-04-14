import { CONTACT_PHONE, FORMATED_PHONE } from '../../assets/utils/constants';
import './CallPopup.css';
import React from "react";







function CallPopup({
  handleClose,
  isOpen,
}) {

  return (
    <div className={`call-popup ${isOpen ? 'call-popup_active' : ''}`}>
      <div className={`call-popup__container ${isOpen ? 'call-popup__container_active' : ''}`}>
        <div className="call-popup__close" onClick={handleClose}>
          <svg className="call-popup__close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 18L18 2M2 2L18 18" stroke="black" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="call-popup__text">Товар временно недоступен</p>
        <p className="call-popup__subtext">Уважаемый клиент, к&nbsp;сожалению, выбранный Вами товар в&nbsp;настоящее время отсутствует на&nbsp;складе. Для получения дополнительной информации о&nbsp;возможности заказа данного товара, пожалуйста, свяжитесь с&nbsp;нашим менеджером по&nbsp;указанному номеру телефона:</p>
        <a className="call-popup__phone" rel="noreferrer" href={`tel:+${FORMATED_PHONE}`}>{CONTACT_PHONE}</a>

        <div className="call-popup__btns">
          <div className="call-popup__btn call-popup__btn_disagree" onClick={handleClose}>
            <p className="call-popup__btn-text call-popup__btn-text_disagree">Вернуться к покупкам</p>
          </div>
        </div>

      </div>
      <div className={`call-popup__background ${isOpen ? 'call-popup__background_active' : ''}`} onClick={handleClose}>

      </div>
    </div>
  );
}

export default CallPopup;
