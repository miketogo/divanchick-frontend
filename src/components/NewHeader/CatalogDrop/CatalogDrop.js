import React, { useEffect, useRef, useState, } from 'react'
import { Link } from 'react-router-dom';
import mainApi from '../../../assets/api/MainApi';
import { ArrowIcon } from '../../../assets/icons/icons';
import { getIconByType } from '../../../assets/utils/utils';
import MiniPreloader from '../../MiniPreloader/MiniPreloader';






import './CatalogDrop.css';


function CatalogDrop({ isOpened, setOpened, categories, }) {
    const dorpRef = useRef()


    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (isOpened && dorpRef.current && !dorpRef.current.contains(e.target)) {
                setOpened(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isOpened])

    const [selectedCategory, setSelectCategory] = useState(undefined)
    const [isPreloaderVisible, setPreloaderVisible] = useState(false)
    const [subcategories, setSubcategories] = useState(undefined)

    function closeDropdown() {
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




    const filteredCategories = categories ? categories.filter((item) => item.type) : undefined

    useEffect(() => {
        if (!categories) return
        const filteredCategories = categories ? categories.filter((item) => item.type) : undefined
        let item = filteredCategories[0]
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
    }, [categories])

    return (
        <>
            {filteredCategories && filteredCategories.length > 0 ?
                <div className={`catalog-drop__container ${isOpened ? 'catalog-drop__container_active' : ''}`}>
                    <div ref={dorpRef} className={`catalog-drop ${isOpened ? 'catalog-drop_active' : 'catalog-drop_inactive'}`}>
                        <div className='catalog-drop__categories'>
                            {filteredCategories.map((item, i) => (
                                <div className={`catalog-drop__card ${selectedCategory && selectedCategory._id === item._id ? 'catalog-drop__card_selected' : ''}`} key={`catalog-drop__card${i}${item._id}`} onClick={() => {
                                    handleSelectCategory(item)
                                }}>
                                    <div className='catalog-drop__card-info'>
                                        {getIconByType({
                                            type: item.type,
                                            mainClassName: 'catalog-drop__card-icon',
                                            fillClassName: 'catalog-drop__card-icon-fill',
                                            strokeClassName: 'catalog-drop__card-icon-stroke'
                                        })}
                                        <p className='catalog-drop__card-name'>{item.name}</p>
                                    </div>
                                    <ArrowIcon mainClassName={'catalog-drop__card-arrow'} fillClassName={'catalog-drop__card-arrow-fill'} />
                                </div>
                            ))}
                        </div>
                        {isPreloaderVisible ?
                            <div className='catalog-drop__preloader'>
                                <MiniPreloader />
                            </div>
                            :
                            <div className='catalog-drop__subcategories'>
                                {subcategories && subcategories.length > 0 ?
                                    subcategories.map((item, i) => (
                                        <Link className='catalog-drop__subcategory' to={`/sub-category/${item.category.translit_name}/${item.translit_name}`} onClick={closeDropdown}>{item.name}</Link>
                                    ))
                                    : null}
                            </div>
                        }

                    </div>
                    <div className={`catalog-drop__background ${isOpened ? 'catalog-drop__background_active' : ''}`} onClick={closeDropdown}></div>

                </div>
                : null}
        </>



    );
}

export default CatalogDrop;
