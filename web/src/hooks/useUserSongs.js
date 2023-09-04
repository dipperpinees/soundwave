import { useQuery } from 'react-query';
import fetchAPI from '../utils/fetchAPI';

const useUserSongs = (userID) => {
    const getMySongs = async ({ queryKey }) => {
        const userID = queryKey[1];
        const data = await fetchAPI(`/user/${userID}/songs`);
        return data;
    };
    return useQuery(['user-songs', userID], getMySongs, { enabled: !!userID });
};

export default useUserSongs;
