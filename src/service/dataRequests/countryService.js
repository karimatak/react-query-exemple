import axios from "axios";


const getAllCountriesRequest = async () => {
    return await axios.get("http://localhost:5555/api/ms-data/v1/countries/all");
}

const createCountryRequest = async (data) => {
    return await axios.post("http://localhost:5555/api/ms-data/v1/countries", data)
}

const getCountryById = async ({ queryKey }) => {
    const [_key, { countryId }] = queryKey

    console.log("HERE --> ", countryId);
    return await axios.get(`http://localhost:5555/api/ms-data/v1/countries/${countryId}`)
}

const updateCountryRequest = async (data, countryId) => {
    return await axios.put(`http://localhost:5555/api/ms-data/v1/countries/${countryId}`, data)
}

export {
    getAllCountriesRequest,
    createCountryRequest,
    getCountryById,
    updateCountryRequest
}