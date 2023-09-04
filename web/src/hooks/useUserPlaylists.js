import { useQuery } from 'react-query';
import fetchAPI from '../utils/fetchAPI';

const useUserPlaylist = (userID) => {
    const getMyPlaylists = async ({ queryKey }) => {
        const userID = queryKey[1];
        const data = await fetchAPI(`/user/${userID}/playlists`);
        return data;
    };
    return useQuery(['user-playlists', userID], getMyPlaylists, { enabled: !!userID });
};

export default useUserPlaylist;
