import { BedIcon, BedroomIcon, ChairIcon, ChildrenRoomIcon, DecorIcon, FloorCoveringIcon, HallwayIcon, HangerIcon, KitchenIcon, LinenIcon, LivingRoomIcon, MatIcon, OfficeIcon, PedestalIcon, SofaIcon, TableIcon, UniversalIcon, WardrobeIcon } from "../icons/categoryIcons";

export function copyText({ text, setCopied }) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';

        setCopied(text)
        setTimeout(() => {
            setCopied('')
        }, 1500);
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}


export function getCorrectWordForm(count) {
    let lastDigit = count % 10;
    if (count >= 11 && count <= 19) {
        return 'товаров';
    }
    switch (lastDigit) {
        case 1:
            return 'товар';
        case 2:
        case 3:
        case 4:
            return 'товара';
        default:
            return 'товаров';
    }
}


export const getPrice = (item) => {

    const name = localStorage.getItem('city') ? localStorage.getItem('city') : 'Тобольск'
    let cityMap = {
        "Новый Уренгой": "63777e52c505252a8fc59c09",
        "Надым": "63777e62c505252a8fc59c0a",
        "Тобольск": "63777e74c505252a8fc59c0b",
    }
    let id = cityMap[name] ? cityMap[name] : "63777e74c505252a8fc59c0b"
    let value = item.firstc_data.price[id]
    return Number(value)
}


export function getIconByType({ type, mainClassName, fillClassName, strokeClassName }) {
    if (!type) return
    switch (type) {
        case 'mat':
            return MatIcon({ mainClassName, fillClassName });

        case 'chair':
            return ChairIcon({ mainClassName, fillClassName });

        case 'wardrobe':
            return WardrobeIcon({ mainClassName, fillClassName });

        case 'sofa':
            return SofaIcon({ mainClassName, fillClassName });

        case 'table':
            return TableIcon({ mainClassName, fillClassName });

        case 'pedestal':
            return PedestalIcon({ mainClassName, fillClassName });

        case 'hanger':
            return HangerIcon({ mainClassName, fillClassName });

        case 'hallway':
            return HallwayIcon({ mainClassName, fillClassName });

        case 'kitchen':
            return KitchenIcon({ mainClassName, fillClassName });

        case 'decor':
            return DecorIcon({ mainClassName, fillClassName });

        case 'linen':
            return LinenIcon({ mainClassName, fillClassName });

        case 'floor_covering':
            return FloorCoveringIcon({ mainClassName, strokeClassName });

        case 'living_room':
            return LivingRoomIcon({ mainClassName, fillClassName });

        case 'bedroom':
            return BedroomIcon({ mainClassName, fillClassName });

        case 'bed':
            return BedIcon({ mainClassName, fillClassName });

        case 'office':
            return OfficeIcon({ mainClassName, fillClassName });

        case 'children_room':
            return ChildrenRoomIcon({ mainClassName, fillClassName });

        case 'universal':
            return UniversalIcon({ mainClassName, fillClassName });

        default:
            break;
    }
}



export const sendMetriс = (type, value) => {
  window.ym(92911435, type, value)
}
