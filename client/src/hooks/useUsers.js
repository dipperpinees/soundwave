import { useQuery } from "react-query"
import fetchAPI from "../utils/fetchAPI";

const useUsers = (queryString) => {
    const getUsers = async ({queryKey}) => {
        const queryString = queryKey[1];
        try {
            return fetchAPI(`/user/?${queryString}`);
        } catch (e) {
            console.error(e.message);
        }
    }
    return useQuery(['get-users', queryString], getUsers)
}

export default useUsers;