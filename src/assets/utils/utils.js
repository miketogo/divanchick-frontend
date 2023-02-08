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
