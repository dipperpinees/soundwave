import { PlayerStore } from './playerStore';
import { UserStore } from './userStore';

export function Store({ children }) {
    return (
        <PlayerStore>
            <UserStore>{children}</UserStore>
        </PlayerStore>
    );
}

export { UserContext } from './userStore';
export { PlayerContext } from './playerStore';
