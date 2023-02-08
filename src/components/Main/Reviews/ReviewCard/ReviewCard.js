import moment from 'moment-timezone';
import React from 'react'


import './ReviewCard.css';

import 'moment/locale/ru'  // without this line it didn't work
moment.locale('ru')


function ReviewCard({ item }) {

    return (
        <div className='review-card'>
            <p className='review-card__text'>{item.text}</p>
            <div className='review-card__footer'>
                <div className='review-card__user'>
                    <img className='review-card__user-img' src={item.user.avatar} alt='' />
                    <div className='review-card__user-info'>
                        <p className='review-card__user-name'>{item.user.name}</p>
                        <div className='review-card__stars'>
                            {Array.from({ length: item.stars }).map(() => (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 0.5L8.5716 5.33688H13.6574L9.5429 8.32624L11.1145 13.1631L7 10.1738L2.8855 13.1631L4.4571 8.32624L0.342604 5.33688H5.4284L7 0.5Z" fill="#27A422" />
                                </svg>
                            ))}
                        </div>

                    </div>
                </div>
                <p className='review-card__date'>{moment(item.date, 'DD.MM.YYYY').format('DD MMMM YYYY')}</p>
            </div>
        </div>
    );
}

export default ReviewCard;
