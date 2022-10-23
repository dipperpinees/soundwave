import { GenreStore } from './genreStore';
import { LoadingStore } from './loadingStore';
import { PlayerStore } from './playerStore';
import { UserStore } from './userStore';

export function Store({ children }) {
    return (
        <PlayerStore>
            <GenreStore>
                <LoadingStore>
                    <UserStore>{children}</UserStore>
                </LoadingStore>
            </GenreStore>
        </PlayerStore>
    );
}

export { UserContext } from './userStore';
export { PlayerContext } from './playerStore';
export { GenreContext } from './genreStore';
