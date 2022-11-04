import { Box, Grid, Text } from '@chakra-ui/react';
import SongPreview from '../SongPreview';
import SongSkeleton from '../SquareSkeleton';

export default function ListSongPreview({ title, songs }) {
    return (
        <Box width="100%" margin="16px 0px">
            <Text as="b" fontSize={20} marginBottom={1}>
                {title}
            </Text>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {songs ? (
                    songs.map((song, id) => <SongPreview key={id} song={song} />)
                ) : (
                    <>
                        <SongSkeleton />
                        <SongSkeleton />
                        <SongSkeleton />
                        <SongSkeleton />
                    </>
                )}
            </Grid>
        </Box>
    );
}
