import { useState, createContext } from 'react';

const EditProfileContext = createContext(null);

const EditProfileStore = ({ children }) => {
    const [isEditProfile, setIsEditProfile] = useState(false);

    return (
        <EditProfileContext.Provider value={[isEditProfile, setIsEditProfile]}>{children}</EditProfileContext.Provider>
    );
};

export { EditProfileStore, EditProfileContext };
