import axios from "axios"
import baseUrl from "../config/BaseUrl"

const fetchNameFrom = async (transfer, token) => {
    try {
        const resNameFrom = await axios.get(`${baseUrl}/accounts?_id=${transfer}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(resNameFrom.data.accounts[0].fullName);  // Assuming you want to return the data part of the response
    } catch (error) {
        console.error("Error fetching the name:", error);
        throw error; // Optionally rethrow the error if you want to handle it further up the call stack
    }
};

export default fetchNameFrom;