import { useQuery } from 'react-query';
import fetchAPI from '../utils/fetchAPI';

const useRecentlyPlayed = () => {
    const getRecentlyPlayed = async () => {
        const recentlyPlayedID = JSON.parse(localStorage.getItem('recently_played')).slice(0, 4);
        const data = await Promise.allSettled(
            recentlyPlayedID.map((id) => {
                return fetchAPI(`/song/${id}`);
            })
        );
        data.forEach(({ status }) => {
            if (status === 'rejected') throw new Error();
        });
        return data;
    };
    return useQuery('recently_played', getRecentlyPlayed, {
        enabled:
            !!localStorage.getItem('recently_played') &&
            JSON.parse(localStorage.getItem('recently_played')).length >= 4,
    });
};

export default useRecentlyPlayed;
