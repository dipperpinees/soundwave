import { useQuery } from 'react-query';
import fetchAPI from '../utils/fetchAPI';

const usePlaylists = (queryString, configs = {}) => {
    const getPlaylists = async ({ queryKey }) => {
        const queryString = queryKey[1];
        try {
            return fetchAPI(`/playlist/?${queryString}`);
        } catch (e) {
            console.error(e.message);
        }
    };
    return useQuery(['get-playlists', queryString], getPlaylists, configs);
};

export default usePlaylists;
