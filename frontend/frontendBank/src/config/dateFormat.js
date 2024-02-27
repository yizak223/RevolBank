const formatDateTime = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${formattedDate} ${formattedTime}`;
}
const formatDateTime2 = (dateString) => {
    const day = String(new Date(dateString).getDate()).padStart(2, '0')
    const month = String(new Date(dateString).getMonth() + 1).padStart(2, '0')
    const year = new Date(dateString).getFullYear()
    return `${day}/${month}/${year}`
}
const formatDateTime3 = (dateString) => {
    const month = String(new Date(dateString).getMonth() + 1).padStart(2, '0')
    const year = new Date(dateString).getFullYear()
    const year2 = String(year).substring(2,4)
    return `${month}/${year2}`
}
export { formatDateTime, formatDateTime2 ,formatDateTime3}