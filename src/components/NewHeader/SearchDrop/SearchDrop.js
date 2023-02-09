import React, { useEffect, useRef, } from 'react'
import MiniPreloader from '../../MiniPreloader/MiniPreloader';
import SearchCard from './SearchCard/SearchCard';





import './SearchDrop.css';


function SearchDrop({ isSearchPreloaderVisible, isOpened, setOpened, searchItems }) {
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


    function closeDropdown() {
        console.log('sas')
        setOpened(false)
        setTimeout(() => {
            setOpened(false)
        }, 1);
    }






    return (
        <div ref={dorpRef} className={`search-drop ${isOpened ? 'search-drop_active' : 'search-drop_inactive'}`}>
            {isSearchPreloaderVisible ?
                <div className='search-drop__preloader'>
                    <MiniPreloader />
                </div>
                :
                <div className='search-drop__cards'>
                    {searchItems && searchItems.length > 0 ?
                        searchItems.map((item, i) => (
                            <SearchCard closeDropdown={closeDropdown} item={item} key={`header-search-drop-card${i}${item._id}`} />
                        ))
                        :
                        <div className='search-drop__no-cards'>
                            <p className='search-drop__no-cards-text'>Ничего не найдено</p>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default SearchDrop;
