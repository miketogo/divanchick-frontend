import React from 'react'
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';


import './PromotedCards.css';
import PromotedCard from './PromotedCard/PromotedCard';
import { promotedCardsLinks } from '../../../assets/utils/constants';


const ANIMATION_WAIT_TIME = 3000

function PromotedCards() {



    return (

        <div className='promoted-cards'>
            <p className='promoted-cards__title'>Найдите <TypeAnimation
                    sequence={[
                        'диван',
                        ANIMATION_WAIT_TIME,
                        'тумбочку',
                        ANIMATION_WAIT_TIME,
                        'столешницу',
                        ANIMATION_WAIT_TIME,
                        'кровать',
                        ANIMATION_WAIT_TIME,
                        'матрас',
                        ANIMATION_WAIT_TIME,
                        'ковер',
                        ANIMATION_WAIT_TIME,
                        'кресло',
                        ANIMATION_WAIT_TIME,
                        // 2000,
                        // 'hotel',
                        () => {
                            console.log('Done typing!'); // Place optional callbacks anywhere in the array
                        }
                    ]}
                    wrapper="span"
                    cursor={false}
                    repeat={Infinity}
                    className="banner__title-span"
                /> мечты</p>
            <div className='promoted-cards__cards'>
                <PromotedCard item={promotedCardsLinks.sofa} />
                <PromotedCard item={promotedCardsLinks.kitchen} />
                <PromotedCard item={promotedCardsLinks.bedroom} />
                <PromotedCard item={promotedCardsLinks.livingroom} />
                <PromotedCard item={promotedCardsLinks.office} />
            </div>

        </div>


    );
}

export default PromotedCards;
