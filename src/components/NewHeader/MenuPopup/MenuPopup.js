import React, { useEffect, useRef, useState, } from 'react'
import { Link } from 'react-router-dom';

import mainApi from '../../../assets/api/MainApi';
import { ArrowIcon, CatalogIcon, CloseIcon, RoomsIcon } from '../../../assets/icons/icons';
import { getIconByType } from '../../../assets/utils/utils';
import MiniPreloader from '../../MiniPreloader/MiniPreloader';







import './MenuPopup.css';


function MenuPopup({ isOpened, setOpened, categories, rooms }) {


    const [selectedCategory, setSelectCategory] = useState(undefined)
    const [isPreloaderVisible, setPreloaderVisible] = useState(false)
    const [subcategories, setSubcategories] = useState(undefined)

    function close() {
        console.log('sas')
        setOpened(false)
        setTimeout(() => {
            setOpened(false)
        }, 1);
    }

    function handleSelectCategory(item) {
        console.log(item)
        setSelectCategory(item)
        setPreloaderVisible(true)
        mainApi.getSubcategoriesByCategory({
            category_translit_name: item.translit_name,
            limit: 25,
        })
            .then((res2) => {
                console.log(res2.data)
                setSubcategories(res2.data)
                // setSelectedCategory(res2.category)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setPreloaderVisible(false)
            })
    }



    const filteredRooms = rooms ? rooms.filter((item) => item.type) : undefined

    const filteredCategories = categories ? categories.filter((item) => item.type) : undefined

    const [selectedType, setSelectedType] = useState('catalog')

    return (
        <>
            {filteredCategories && filteredCategories.length > 0 && filteredRooms && filteredRooms.length > 0 ?
                <div className={`menu-popup__container ${isOpened ? 'menu-popup__container_active' : ''}`}>
                    <div className={`menu-popup ${isOpened ? 'menu-popup_active' : 'menu-popup_inactive'}`}>
                        <button className='menu-popup__close' type='button' onClick={close}>
                            <CloseIcon mainClassName={'menu-popup__close-icon'} fillClassName={'menu-popup__close-icon-fill'} />
                        </button>
                        <div className='menu-popup__selectors'>
                            <button className={`menu-popup__btn ${selectedType === 'catalog' ? 'menu-popup__btn_active' : ''}`} type='button' onClick={() => {
                                setSelectedType('catalog')
                            }}>
                                <CatalogIcon mainClassName={'menu-popup__btn-icon'} fillClassName={'menu-popup__btn-icon-fill'} />
                                <p className='menu-popup__btn-text'>Каталог</p>
                            </button>
                            <button className={`menu-popup__btn ${selectedType === 'rooms' ? 'menu-popup__btn_active' : ''}`} type='button' onClick={() => {
                                setSelectedType('rooms')
                            }}>
                                <RoomsIcon mainClassName={'menu-popup__btn-icon'} strokeClassName={'menu-popup__btn-icon-stroke'} />
                                <p className='menu-popup__btn-text'>Комнаты</p>
                            </button>
                        </div>
                        {selectedType === 'catalog' ?
                            <div className='menu-popup__cards'>
                                {filteredCategories.map((item, i) => (
                                    <div className='menu-popup__card-box'>
                                        <div className={`menu-popup__card ${selectedCategory && selectedCategory._id === item._id ? 'menu-popup__card_selected' : ''}`} key={`menu-popup__card${selectedType}${i}${item._id}`} onClick={() => {
                                            handleSelectCategory(item)
                                        }}>
                                            <div className='menu-popup__card-info'>
                                                {getIconByType({
                                                    type: item.type,
                                                    mainClassName: 'menu-popup__card-icon',
                                                    fillClassName: 'menu-popup__card-icon-fill',
                                                    strokeClassName: 'menu-popup__card-icon-stroke'
                                                })}
                                                <p className='menu-popup__card-name'>{item.name}</p>
                                            </div>
                                            <ArrowIcon mainClassName={'menu-popup__card-arrow'} fillClassName={'menu-popup__card-arrow-fill'} />
                                        </div>
                                        {selectedCategory && selectedCategory._id === item._id ?
                                            isPreloaderVisible ?
                                                <div className='menu-popup__card-preloader'>
                                                    <MiniPreloader />
                                                </div>
                                                : subcategories && subcategories.length > 0 ?
                                                    <div className='menu-popup__card-subcategories'>
                                                        {subcategories.map((sub, i) => (
                                                            <Link className='menu-popup__card-subcategory' to={`/sub-category/${sub.category.translit_name}/${sub.translit_name}`} onClick={close}>{sub.name}</Link>

                                                        ))}
                                                    </div>
                                                    : null
                                            : null}
                                    </div>
                                ))}
                            </div>
                            : null}

                        {selectedType === 'rooms' ?
                            <div className='menu-popup__cards'>
                                {filteredRooms.map((item, i) => (
                                    <Link className='menu-popup__card' to={`/room/${item.translit_name}`} key={`menu-popup__card${selectedType}${i}${item._id}`} onClick={close}>
                                        <div className='menu-popup__card-info'>
                                            {getIconByType({
                                                type: item.type,
                                                mainClassName: 'menu-popup__card-icon',
                                                fillClassName: 'menu-popup__card-icon-fill',
                                                strokeClassName: 'menu-popup__card-icon-stroke'
                                            })}
                                            <p className='menu-popup__card-name'>{item.name}</p>
                                        </div>
                                        <ArrowIcon mainClassName={'menu-popup__card-arrow'} fillClassName={'menu-popup__card-arrow-fill'} />
                                    </Link>
                                ))}
                            </div>
                            : null}
                    </div>
                </div>
                : null}
        </>



    );
}

export default MenuPopup;
