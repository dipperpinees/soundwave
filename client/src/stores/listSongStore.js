import { useState, createContext } from 'react';

const ListSongContext = createContext(null);

const ListSongStore = ({ children }) => {
    const [data, setData] = useState(null);

    console.log('re-render edit context');

    return <ListSongContext.Provider value={[data, setData]}>{children}</ListSongContext.Provider>;
};

export { ListSongStore, ListSongContext };
