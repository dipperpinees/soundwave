import { API_ENDPOINT } from '../config';

const fetchAPI = async (path = '/', configs = {}) => {
    const response = await fetch(`${API_ENDPOINT}${path}`, {
        method: 'GET',
        credentials: 'include',
        ...configs,
    });
    const responseJSON = await response.json();
    if (response.ok) {
        return responseJSON;
    }
    throw new Error(responseJSON.message);
};

export default fetchAPI;
