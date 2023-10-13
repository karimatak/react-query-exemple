import axios from "axios";

const getAllZipCodeRegexesRequest = async () => {
    return await axios.get("http://localhost:5555/ms-data/v1/zipCodeRegexes/all");
}

export default getAllZipCodeRegexesRequest;