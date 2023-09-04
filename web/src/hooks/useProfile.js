import { useQuery } from 'react-query';
import fetchAPI from '../utils/fetchAPI';

const useProfile = (id) => {
    const getProfile = async ({ queryKey }) => {
        const id = queryKey[1];
        try {
            const data = await fetchAPI(`/user/${id}`);
            return data;
        } catch (e) {
            console.error(e.message);
        }
    };
    return useQuery(['profile', id], getProfile, { enabled: !!id });
};

export default useProfile;
