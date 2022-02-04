import React from 'react'
import './Profile.css';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Account from './Account/Account';
import Addresses from './Addresses/Addresses';
import TrackOrder from './TrackOrder/Orders';



function Profile(props) {
    let { page } = useParams();

   

    return (
        <div className="profile">
            <h2 className="profile__title">Личный кабинет</h2>
            <div className="profile__page-seloctors profile__page-seloctors_pc">
                <Link to="/profile/account" className={`profile__page-btn ${page && page.toLowerCase() === 'account' ? 'profile__page-btn_active' : ''}`}>Профиль</Link>
                <Link to="/profile/addresses" className={`profile__page-btn ${page && page.toLowerCase() === 'addresses' ? 'profile__page-btn_active' : ''}`}>Адреса</Link>
                <Link to="/profile/orders" className={`profile__page-btn ${page && page.toLowerCase() === 'orders' ? 'profile__page-btn_active' : ''}`}>Заказы</Link>
            </div>
            
            <div className="profile__item">
                {page && page.toLowerCase() === 'account' ? <Account currentUser={props.currentUser} setLoggedIn={props.setLoggedIn} setCurrentUser={props.setCurrentUser} /> : <></>}
                {page && page.toLowerCase() === 'addresses' ? <Addresses /> : <></>}
                {page && page.toLowerCase() === 'orders' ? <TrackOrder /> : <></>}
            </div>
        </div>
    );
}

export default Profile;
