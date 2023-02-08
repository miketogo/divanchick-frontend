import React from 'react'
import { Link } from 'react-router-dom';

import './PromotedCard.css';


function PromotedCard({ item }) {

    return (
        <Link className={`promoted-card promoted-card_${item.type}`} to={item.path}>
            <div className='promoted-card__texts'>
                <p className='promoted-card__title'>
                    {item.title}
                </p>
                <div className='promoted-card__links'>
                    {item.items.map((link, i) => (
                        <Link className='promoted-card__link' to={link.path} onClick={(e) => {
                            e.stopPropagation();
                        }}>
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
            <img className={`promoted-card__img promoted-card__img_${item.type}`} src={item.img} alt='' ></img>
        </Link>
    );
}

export default PromotedCard;
