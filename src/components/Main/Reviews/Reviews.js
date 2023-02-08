import React from 'react'
import ReviewCard from './ReviewCard/ReviewCard';


import './Reviews.css';

import reviewAvatar1 from '../../../assets/images/main/reviews/1.png'
import reviewAvatar2 from '../../../assets/images/main/reviews/2.png'
import reviewAvatar3 from '../../../assets/images/main/reviews/3.png'
import reviewAvatar4 from '../../../assets/images/main/reviews/4.png'


const reviews = [
    {
        text: 'Добрый день! Обновили диван и решили оставить отзыв. Он смотрится великолепно, цвет - мятный, соответствует фото. Аккуратные швы, красивая форма, выглядит основательно. Как я хотел, жёсткий - спать на нём очень удобно, сидеть - тоже. Остаётся прямая спина. Лёгко разложили. Привезли в упаковке, в указанный срок.',
        user: {
            avatar: reviewAvatar1,
            name: 'Андрей',
        },
        date: '20.01.2023',
        stars: 5,
    },
    {
        text: 'Диван действительно очень хороший. Брали его опираясь только на отзывы, и не прогодали. Жёсткий, цвет насыщенный, в сборке проблем нет.',
        user: {
            avatar: reviewAvatar2,
            name: 'Ирина',
        },
        date: '16.12.2022',
        stars: 5,
    },
    {
        text: 'Мы переехали в дом, который строили 5 лет! И возникла необходимость в покупке нового дивана для гостей, потому что намечалось празднование новоселья. В наш интерьер отлично подошёл диван жёлтого цвета, яркий, стильный, модный! Рекомендую к покупке!',
        user: {
            avatar: reviewAvatar3,
            name: 'Анастасия',
        },
        date: '03.10.2022',
        stars: 5,
    },
    {
        text: 'Прекрасный диван во всех отношениях — цвет, размер, цена. Механизм раскладывания очень удобный, сам диван твёрдый не проседает когда садишься на него, ткань очень качественная и красивая, за такие деньги не диван — а мечта. Спасибо, магазин диванчик!',
        user: {
            avatar: reviewAvatar4,
            name: 'Евгений',
        },
        date: '21.09.2022',
        stars: 5,
    },
]

function Reviews() {



    return (

        <div className='reviews'>
            <p className='reviews__title'>Отзывы наших покупателей</p>
            <div className='reviews__cards'>
                {reviews.map((item, i)=>(
                    <ReviewCard item={item} />
                ))}

            </div>
        </div>
    );
}

export default Reviews;
