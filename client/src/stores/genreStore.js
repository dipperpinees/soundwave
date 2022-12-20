import { API_ENDPOINT } from '../config';
import { useEffect, useState, createContext } from 'react';

const initialState = [];

export const GenreContext = createContext(initialState);

export function GenreStore({ children }) {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        (async () => {
            const response = await fetch(API_ENDPOINT + '/genre/');
            const genres = await response.json();
            setState(genres);
        })();
    }, []);

    return <GenreContext.Provider value={[state, setState]}>{children}</GenreContext.Provider>;
}
