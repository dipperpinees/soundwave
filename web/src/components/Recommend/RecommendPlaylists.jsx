import { Grid, Text } from '@chakra-ui/react';
import usePlaylists from '../../hooks/usePlaylists';
import PlaylistPreview from '../Playlists/PlaylistPreview';

export function RecommendPlaylists() {
    const { data } = usePlaylists('limit=4');
    return (
        <>
            <Text as="b" fontSize="1.25rem">
                Newest Playlists
            </Text>
            <Grid
                templateColumns={{
                    base: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(4, minmax(0, 1fr))',
                }}
                gap={6}
            >
                {data?.data.map((playlist) => (
                    <PlaylistPreview key={playlist.id} {...playlist} showSettings={false} />
                ))}
            </Grid>
        </>
    );
}
