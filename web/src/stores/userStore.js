import { createContext, useEffect, useReducer } from 'react';
import fetchAPI from '../utils/fetchAPI';

const defaultState = {
    id: 0,
    avatar: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    role: '',
    isAuth: false,
};

const initialState = { ...defaultState };

export const UserContext = createContext(initialState);

export function UserStore({ children }) {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'Update': {
                return { ...state, ...action.payload };
            }
            case 'Delete': {
                return { ...defaultState };
            }
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        const auth = async () => {
            try {
                const user = await fetchAPI('/auth', { method: 'POST' });
                dispatch({ type: 'Update', payload: { ...user, isAuth: true } });
            } catch (e) {
                dispatch({ type: 'Update', payload: { ...defaultState, isAuth: true } });
            }
        };
        auth();
    }, []);

    return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
}
