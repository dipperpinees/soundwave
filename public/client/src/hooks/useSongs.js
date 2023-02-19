import { useQuery } from 'react-query';
import fetchAPI from '../utils/fetchAPI';

const useSongs = (queryString, configs = {}) => {
    const getAllSongs = async ({ queryKey }) => {
        const queryString = queryKey[1];
        try {
            return fetchAPI(`/song/?${queryString}`);
        } catch (e) {
            console.error(e.message);
        }
    };
    return useQuery(['get-songs', queryString], getAllSongs, configs);
};

export default useSongs;
