function formatNumberWithCommas(num) {
    if (typeof num !== 'number' && typeof num !== 'string') return num;

    const [integerPart, decimalPart] = num.toString().split('.');

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

function convertStringToNumber(str) {
    let cleanedString = str.replace(/[,\.]/g, '');

    let number = parseInt(cleanedString, 10);

    return number;
}
export default formatNumberWithCommas;

export { convertStringToNumber };