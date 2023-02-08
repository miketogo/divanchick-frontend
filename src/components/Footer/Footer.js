import React from 'react'
import { Link } from 'react-router-dom';

import './Footer.css';
import privacypolicy from '../../assets/images/privacypolicy.pdf'

const firstColumnLinks = [
  // {
  //   text: 'Доставка и самовывоз',
  //   to: '/delivery'
  // },
  {
    text: 'Обмен и возврат',
    to: '/refund'
  },
  {
    text: 'Реквизиты',
    to: '/requisites'
  },
  // {
  //   text: 'Отслеживание и отмена заказов',
  //   to: '/tracking'
  // },
]

const secondColumnLinks = [
  {
    text: 'О компании',
    to: '/about-company'
  },
  {
    text: 'Другие документы',
    to: '/work-with-us'
  },
]

function Footer() {

  return (
    <footer className="footer">
      <nav className="footer__nav">
        <div className="footer__nav-column">
          <h2 className="footer__nav-column-title">Услуги</h2>
          {firstColumnLinks.map((item, i) => (
            <Link className="footer__nav-column-link" to={item.to} key={`footer__nav-column-link${i}`}>{item.text}</Link>
          ))}

        </div>

        <div className="footer__nav-column footer__nav-column_type_docs">
          <h2 className="footer__nav-column-title">Полезные документы</h2>
          <a target="_blank" rel="noreferrer" href={privacypolicy} className="footer__nav-column-link-container">
            <p className="footer__nav-column-link">Политика обработки персональных данных</p>
          </a>
          {/* <Link className="footer__nav-column-link" to={'/docs'}>Другие документы</Link> */}

        </div>
      </nav>
      <div className="footer__contacts">
        <h2 className="footer__contacts-title">Позвоните нам, если остались вопросы</h2>
        <a target="_blank" rel="noreferrer" href="tel:+79199401208" className="footer__contacts-tel">+7 (919) 940-12-08</a>
        <p className="footer__contacts-time">Ежедневно с 09:00 до 20:00</p>
        <div className="footer__contacts-socials">
          <a className="footer__contacts-social" target="_blank" rel="noreferrer" href="https://vk.com/divanchik72">
            <svg className="footer__contacts-social-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 23.04C0 12.1788 0 6.74826 3.37413 3.37413C6.74826 0 12.1788 0 23.04 0H24.96C35.8212 0 41.2517 0 44.6259 3.37413C48 6.74826 48 12.1788 48 23.04V24.96C48 35.8212 48 41.2517 44.6259 44.6259C41.2517 48 35.8212 48 24.96 48H23.04C12.1788 48 6.74826 48 3.37413 44.6259C0 41.2517 0 35.8212 0 24.96V23.04Z" fill="#0077FF" />
              <path d="M25.54 34.5801C14.6 34.5801 8.3601 27.0801 8.1001 14.6001H13.5801C13.7601 23.7601 17.8 27.6401 21 28.4401V14.6001H26.1602V22.5001C29.3202 22.1601 32.6398 18.5601 33.7598 14.6001H38.9199C38.0599 19.4801 34.4599 23.0801 31.8999 24.5601C34.4599 25.7601 38.5601 28.9001 40.1201 34.5801H34.4399C33.2199 30.7801 30.1802 27.8401 26.1602 27.4401V34.5801H25.54Z" fill="white" />
            </svg>
          </a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
