

import { Link } from 'react-router-dom';
import { MAIN_URL } from '../../../../assets/utils/constants';
import { ImageOnLoad } from '../../../../assets/utils/ImageOnLoad';
import { getPrice } from '../../../../assets/utils/utils';
import './SearchCard.css'

const SearchCard = ({ item, closeDropdown }) => {
    console.log(item)
    const price = getPrice(item)
    return (
        <Link className="search-card" to={`/item/${item.category.translit_name}/${item.sub_category.translit_name}/${item._id}`} onClick={closeDropdown}>
            <ImageOnLoad className='search-card__img' src={`${MAIN_URL}/get-file/${item.photos[0]}`} alt={item.name} />
            <div className='search-card__texts'>
                <p className='search-card__name'>{item.name}</p>

                <p className='search-card__path'>{item.category.name} / {item.sub_category.name}</p>
            </div>
            <p className='search-card__price'>{price > 0 ? `${price.toLocaleString('us')}₽` : ''}</p>
        </Link>
    )
};

export default SearchCard
