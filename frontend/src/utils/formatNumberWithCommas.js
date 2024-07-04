function formatNumberWithCommas(num) {
    if (typeof num !== 'number' && typeof num !== 'string') return num;

    const [integerPart, decimalPart] = num.toString().split('.');

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

export default formatNumberWithCommas;