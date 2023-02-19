import { Grid, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import useDeletePlaylist from '../../hooks/useDeletePlaylist';
import useUserPlaylist from '../../hooks/useUserPlaylists';
import { UserContext } from '../../stores';
import PlaylistPreview from '../Playlists/PlaylistPreview';
import SongSkeleton from '../SquareSkeleton';

const PlaylistLibrary = () => {
    const user = useContext(UserContext)[0];
    const { data: playlists } = useUserPlaylist(user.id);
    const { mutate: handleDelete } = useDeletePlaylist();

    return (
        <>
            <Text as="h3" fontSize="1.25rem" fontWeight={600} mb={1}>
                Playlist Library
            </Text>
            <Grid
                templateColumns={{
                    base: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(4, minmax(0, 1fr))',
                    lg: 'repeat(6, minmax(0, 1fr))',
                }}
                gap={6}
            >
                {playlists
                    ? playlists.map((playlist) => (
                          <PlaylistPreview
                              key={playlist.id}
                              {...playlist}
                              showSettings={true}
                              onDelete={handleDelete}
                          />
                      ))
                    : [...Array(12).keys()].map((id) => <SongSkeleton key={id} />)}
            </Grid>
            {playlists?.length === 0 && <Text>You don't have any playlist yet</Text>}
        </>
    );
};

export default PlaylistLibrary;
