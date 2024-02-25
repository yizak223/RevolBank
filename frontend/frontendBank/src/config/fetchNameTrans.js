import Axios from "axios"
import baseUrl from "./BaseUrl"

const fetchNameTo = async (idNameTo, token) => {
    try {
        const resNameTo = await Axios.get(`${baseUrl}/accounts?_id=${idNameTo}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(resNameTo.data.accounts[0].fullName);
        return resNameTo.data.accounts[0].fullName
    } catch (err) {
        console.log(err)
    }
}

const fetchNameFrom = async (idNameFrom, token) => {
    const resNameFrom = await Axios.get(`${baseUrl}/accounts?_id=${idNameFrom}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(resNameFrom.data.accounts[0].fullName);
    return resNameFrom.data.accounts[0].fullName
}

export { fetchNameTo, fetchNameFrom }