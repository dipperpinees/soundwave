import { ListSongStore } from './listSongStore';
import { GenreStore } from './genreStore';
import { LoadingStore } from './loadingStore';
import { PlayerStore } from './playerStore';
import { PlaylistStore } from './playlistStore';
import { UserStore } from './userStore';

export function Store({ children }) {
    return (
        <ListSongStore>
            <PlayerStore>
                <GenreStore>
                    <LoadingStore>
                        <UserStore>
                            <PlaylistStore>{children}</PlaylistStore>
                        </UserStore>
                    </LoadingStore>
                </GenreStore>
            </PlayerStore>
        </ListSongStore>
    );
}

export { GenreContext } from './genreStore';
export { PlayerContext } from './playerStore';
export { UserContext } from './userStore';
export { PlaylistContext } from './playlistStore';
export { ListSongContext } from './listSongStore';
