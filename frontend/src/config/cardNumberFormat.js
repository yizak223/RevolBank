const cardNumberFormat = (num)=>{
    return String(num).replace(/\B(?=(\d{4})+(?!\d))/g, "-");
}
export {cardNumberFormat}