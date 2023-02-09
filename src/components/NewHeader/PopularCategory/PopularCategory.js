
import React from 'react'
import { Link } from 'react-router-dom';
import useWindowSize from '../../../assets/hooks/useWindowSize';
import { getIconByType } from '../../../assets/utils/utils';
import './PopularCategory.css'

const PopularCategory = ({ topCategories }) => {
    const windowSize = useWindowSize()

    const categoriesByWindowSize = topCategories && topCategories.length > 0 ?
        windowSize.width <= 1300 ?
            windowSize.width <= 670 ?
                topCategories
                :
                topCategories.slice(0, 6)
            :
            topCategories

        : undefined

    return (
        <div className="popular-category">
            <div className="popular-category__items">
                {categoriesByWindowSize && categoriesByWindowSize.length > 0 ?
                    categoriesByWindowSize.map((item, i) => (
                        <Link className='popular-category__item' to={`/categories/${item.translit_name}`}>
                            <div className='popular-category__item-icon-box'>
                                {getIconByType({
                                    type: item.type,
                                    mainClassName: 'popular-category__item-icon',
                                    fillClassName: 'popular-category__item-icon-fill',
                                    strokeClassName: 'popular-category__item-icon-stroke',
                                })}
                            </div>
                            <p className='popular-category__item-name'>{item.name}</p>
                        </Link>
                    ))
                    : null}
            </div>

        </div>
    )
};

export default PopularCategory
