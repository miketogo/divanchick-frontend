
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import mainApi from '../../../assets/api/MainApi';
import { MAIN_URL } from '../../../assets/utils/constants';


import './Banner.css';




function Banner() {
    const [slides, setSlides] = useState(undefined)
    const timer = useRef(null)

    const [index, setIndex] = useState(0)


    useEffect(() => {
        mainApi.getBanners()
            .then((res) => {
                console.log(res.data)
                setSlides(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (!slides) return
        timer.current = setTimeout(() => {
            if (index < slides.length - 1) {
                setIndex(index + 1)

            } else {
                setIndex(0)

            }
        }, 6500);


    }, [index, slides])


    const getPrice = (item) => {

        const name = localStorage.getItem('city') ? localStorage.getItem('city') : 'Тобольск'
        let cityMap = {
            "Новый Уренгой": "63777e52c505252a8fc59c09",
            "Надым": "63777e62c505252a8fc59c0a",
            "Тобольск": "63777e74c505252a8fc59c0b",
        }
        let id = cityMap[name] ? cityMap[name] : "63777e74c505252a8fc59c0b"
        let value = item.firstc_data.price[id]
        return Number(value)
    }


    function handleSliderClick(i) {
        clearTimeout(timer.current)
        setIndex(i)
    }

    return (
        <div className='banner'>
            {slides && slides.length > 0 ? slides.map((slide, i) => (
                <Link
                    key={slide._id}
                    style={{
                        flex: 1,
                        opacity: i === index ? 1 : 0,
                        transition: "opacity 0.5s ease",
                    }}
                    className="banner__slide"
                    to={`/item/${slide.item_data.item.category.translit_name}/${slide.item_data.item.sub_category.translit_name}/${slide.item_data.item._id}`}
                >
                    <div className='banner__titles'>
                        {slide.titles && slide.titles.length > 0 ? slide.titles.map((title, i2) => (
                            <p className='banner__title' key={`banner__slide${i}-${i2}-${slide._id}`}>{title}</p>
                        )) : null}
                    </div>
                    <div className='banner__product'>
                        <p className='banner__product-price'>{getPrice(slide.item_data.item) > 0 ? `${getPrice(slide.item_data.item).toLocaleString('us')}₽` : ''}</p>
                        <p className='banner__product-custom-name'>{slide.item_data.name}</p>
                    </div>
                    <img className='banner__bg-img' src={`${MAIN_URL}/get-file/${slide.photo}`} alt='' ></img>

                </Link>
            )) : null}
            {slides && slides.length > 0 ?
                <div className='banner__slide-counters'>
                    {Array.from({ length: slides.length }).map((item, i) => (
                        <div className={`banner__slide-counter ${i === index ? 'banner__slide-counter_active' : ''}`} onClick={() => {
                            handleSliderClick(i)
                        }}></div>
                    ))}
                </div>
                : null}

        </div>
    );
}

export default Banner;
