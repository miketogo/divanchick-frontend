export const MAIN_URL = 'https://divanchik-backend.cabatest.ru'


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
