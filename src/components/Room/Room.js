import React, { useEffect, useState } from 'react'
import { Switch, useParams, useRouteMatch } from 'react-router';

import mainApi from '../../assets/api/MainApi';
import CategoryCard from '../Category/CategoryCard/CategoryCard';

import SofaPreloader from '../SofaPreloader/SofaPreloader';



import Crumbs from '../Сrumbs/Сrumbs'
import './Room.css';






function Room() {
  const { url } = useRouteMatch();

  let { room } = useParams();

  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [subcategories, setSubcategories] = useState(undefined)


  const [isPreloaderVisible, setPreloaderVisible] = useState(true)
  useEffect(() => {

    if (room) {
      setPreloaderVisible(true)
      mainApi.getSubcategoriesByRoom({
        translit_name: room,
        limit: 25,
      })
        .then((res2) => {
          console.log(res2.data)
          setSubcategories(res2.data)
          setSelectedRoom(res2.room)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setPreloaderVisible(false)
        })


    }

  }, [room])



  return (
    <>
      {isPreloaderVisible ?
        <div className='room__preloader'>
          <SofaPreloader />

        </div>
        :
        <div className="room" key={room}>
          {selectedRoom ?
            <>
              <Crumbs links={[
                {
                  name: 'Главная',
                  to: '/',
                },
                {
                  name: selectedRoom.name,
                  to: `${url}`,
                },
              ]} />
              <h2 className="room__name">{selectedRoom.name}</h2>
              <div className="room__sub-categories">
                {subcategories ?
                  subcategories.length > 0 ? subcategories.map((item, i) => (
                    <CategoryCard item={item.sub_category} key={`${item._id}${i}`} url={url} category={item.sub_category.category.translit_name} />
                  ))

                    :
                    <p key={'sub_category_empty'}>Пусто</p>
                  : <></>}
              </div>
            </>
            : <></>}


        </div>
      }
    </>

  );
}

export default Room;
