
import { Link } from 'react-router-dom';
import { MAIN_URL } from '../../../assets/utils/constants';
import './CategoryCard.css';





function CategoryCard({item, url, category}) {

    return (
        <Link className="category-card" to={`/sub-category/${category}/${item.translit_name}`} key={``}>
            <img className='category-card__img' src={`${MAIN_URL}/get-file/${item.photo}`} alt={item.name} />
            <h3 className='category-card__name'>{item.name} ({item.item_count})</h3>
            {/* <h3 className="category-card__name">{item.name}</h3>
            <div className="category-card__gradient"></div>
            <img className="category-card__img" src={`${MAIN_URL}/get-file/${item.photo}`} alt={item.name} key={item._id} /> */}
        </Link>
    );
}

export default CategoryCard;
