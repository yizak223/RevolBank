const formatDateTime = (dateString)=> {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${formattedDate} ${formattedTime}`;
}

export default formatDateTime