import { UserStore } from './userStore';

export function Store({ children }) {
    return (
        <UserStore>
            {children}
        </UserStore>
    );
}

export { UserContext } from './userStore';

