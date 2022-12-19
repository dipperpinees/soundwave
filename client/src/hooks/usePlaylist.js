import { useQuery } from 'react-query';
import fetchAPI from '../utils/fetchAPI';

const usePlaylist = (userID) => {
    const getMyPlaylists = async ({ queryKey }) => {
        const userID = queryKey[1];
        const data = await fetchAPI(`/playlist/${userID}`);
        return data;
    };
    return useQuery(['user-playlists', userID], getMyPlaylists, { enabled: !!userID });
};

export default usePlaylist;
