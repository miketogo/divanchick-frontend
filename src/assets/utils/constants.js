import divanImg from '../images/main/divany.png'
import kuhniaImg from '../images/main/kuhnia.png'
import spalniaImg from '../images/main/spalnia.png'
import livingroomImg from '../images/main/livingroom.png'
import officeImg from '../images/main/office.png'




export const MAIN_URL = 'https://app.divanchik72.com'


export const MAIN_CATEGORIES = [
  {
    _id: "6311e48798148dd237e42d69",
    name: "Диваны",
    translit_name: "divany"
  },
  {
    _id: "6311d445e16cedc75f16fc35",
    name: "Матрасы",
    translit_name: "matrasy"
  },
  {
    _id: "6311dde898148dd237e42d65",
    name: "Кресла и стулья",
    translit_name: "kresla-i-stulja"
  },
  {
    _id: "6311de0198148dd237e42d67",
    name: "Шкафы",
    translit_name: "shkafy"
  },

  {
    _id: "6311e99837bd3559590eb648",
    name: "Столы",
    translit_name: "stoly"
  },
  {
    _id: "6311ec4437bd3559590eb64c",
    name: "Тумбы и комоды",
    translit_name: "tumby-i-komody"
  },

  {
    _id: "6314dacb40f4478cd81ce630",
    name: "Кухни",
    translit_name: "kuhni"
  },

  {
    _id: "63136f3e40f4478cd81ce626",
    name: "Мебель для прихожей",
    translit_name: "mebel-dlja-prihozhej"
  },
  {
    _id: "6312102283702bc22d4eb39e",
    name: "Кровати",
    translit_name: "krovati"
  },
  {
    _id: "6311fee737bd3559590eb653",
    name: "Мебель для детской",
    translit_name: "mebel-dlja-detskoj"
  },
  {
    _id: "6311f92e37bd3559590eb650",
    name: "Вешалки",
    translit_name: "veshalki"
  },
  {
    _id: "6317298b24dfa4170cda62a4",
    name: "Декор для дома",
    translit_name: "dekor-dlja-doma"
  }

]


export function getCityId(name) {
  let cityMap = {
    "Новый Уренгой": "63777e52c505252a8fc59c09",
    "Надым": "63777e62c505252a8fc59c0a",
    "Тобольск": "63777e74c505252a8fc59c0b",
  }
  if (cityMap[name]) return cityMap[name]
  else return "63777e74c505252a8fc59c0b"



}


export function getAmountByCity(seller_cities) {
  const name = localStorage.getItem('city') ? localStorage.getItem('city') : 'Тобольск'
  let cityMap = {
    "Новый Уренгой": "63777e52c505252a8fc59c09",
    "Надым": "63777e62c505252a8fc59c0a",
    "Тобольск": "63777e74c505252a8fc59c0b",
  }
  let id = cityMap[name] ? cityMap[name] : "63777e74c505252a8fc59c0b"

  let result = seller_cities.filter((item) => item._id === id)[0]

  return Number(result.amount)
}




export const promotedCardsLinks = {
  sofa: {
    title: `Диваны и кресла
в каждый дом`,
    path: `/categories/divany`,
    type: 'divani-kresla',
    img: divanImg,
    items: [
      {
        name: 'Прямые диваны',
        path: `/sub-category/divany/divany-prjamye`,
      },
      // {
      //   name: 'Диваны п-образной формы',
      //   path: `/sub-category/divany/divany-p-obraznoj-formy`,
      // },
      {
        name: 'Угловые диваны',
        path: `/sub-category/divany/divany-uglovye`,
      },
      {
        name: 'Кресла',
        path: `/sub-category/kresla-i-stulja/kresla`,
      },
      {
        name: 'Стулья',
        path: `/sub-category/kresla-i-stulja/stulja`,
      },
    ],
  },
  kitchen: {
    title: `Кухонная
зона`,
    path: `/room/kuhnja`,
    type: 'kuhnia',
    img: kuhniaImg,
    items: [
      {
        name: 'Фартуки',
        path: `/sub-category/kuhni/fartuki`,
      },
      {
        name: 'Кухонные гарнитуры',
        path: `/sub-category/kuhni/kuhonnye-garnitury`,
      },
      {
        name: 'Скамьи',
        path: `/sub-category/kuhni/kuhonnye-skami`,
      },
      {
        name: 'Столешницы',
        path: `/sub-category/kuhni/stoleshnitsy`,
      },
    ],
  },
  bedroom: {
    title: `Спальня`,
    path: `/room/spalnja`,
    type: 'spalnia',
    img: spalniaImg,
    items: [
      {
        name: 'Односпальные',
        path: `/sub-category/krovati/odnospalnye-shirina-ot-80-sm`,
      },
      {
        name: 'Двуспальные',
        path: `/sub-category/krovati/dvuspalnye-shirina-ot-160-sm`,
      },
    ],
  },
  livingroom: {
    title: `Гостиная`,
    path: `/room/gostinaja`,
    type: 'livingroom',
    img: livingroomImg,
    items: [
      {
        name: 'Журнальные столы',
        path: `/sub-category/stoly/zhurnalnye-stoly`,
      },
      {
        name: 'Ковры',
        path: `/sub-category/dekor-dlja-doma/kovry`,
      },
      {
        name: 'Стеллажи',
        path: `/sub-category/shkafy/stellazhi`,
      },
    ],
  },
  office: {
    title: `Офис`,
    path: `/room/ofis`,
    type: 'office',
    img: officeImg,
    items: [
      {
        name: 'Офисные кресла',
        path: `/sub-category/kresla-i-stulja/ofisnye-kresla`,
      },
      {
        name: 'Столы для работы',
        path: `/sub-category/stoly/stoly-dlja-raboty`,
      },
    ],
  }
}
