import React, { useEffect, useRef, } from 'react'
import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../assets/icons/icons';
import { getIconByType } from '../../../assets/utils/utils';






import './RoomsDrop.css';


function RoomsDrop({ isOpened, setOpened, rooms, roomsBtnRef }) {
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

    useEffect(() => {
      // catalogBtnRef.current.onclick = null;
      if (isOpened) {
        roomsBtnRef.current.onclick = null;
      } else {
        setTimeout(() => {
          roomsBtnRef.current.onclick = () => {

            setOpened(true)
          };
        }, 300);

      }
    }, [isOpened])


    function closeDropdown() {
        console.log('sas')
        setOpened(false)
        setTimeout(() => {
            setOpened(false)
        }, 1);
    }

    const filteredRooms = rooms ? rooms.filter((item) => item.type) : undefined




    return (
        <>
            {filteredRooms && filteredRooms.length > 0 ?
                <div ref={dorpRef} className={`rooms-drop ${isOpened ? 'rooms-drop_active' : 'rooms-drop_inactive'}`}>
                    <div className='rooms-drop__cards'>
                        {filteredRooms.map((item, i) => (
                            <Link className='rooms-drop__card' to={`/room/${item.translit_name}`} key={`rooms-drop__card${i}${item._id}`} onClick={closeDropdown}>
                                <div className='rooms-drop__card-info'>
                                    {getIconByType({
                                        type: item.type,
                                        mainClassName: 'rooms-drop__card-icon',
                                        fillClassName: 'rooms-drop__card-icon-fill',
                                        strokeClassName: 'rooms-drop__card-icon-stroke'
                                    })}
                                    <p className='rooms-drop__card-name'>{item.name}</p>
                                </div>
                                <ArrowIcon mainClassName={'rooms-drop__card-arrow'} fillClassName={'rooms-drop__card-arrow-fill'} />
                            </Link>
                        ))}
                    </div>
                </div>
                : null}
        </>

    );
}

export default RoomsDrop;
