import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SongPreview from '../SongPreview';
import SongSkeleton from '../SquareSkeleton';

export default function ListSongPreview({ title, songs, moreUrl }) {
    return (
        <Box width="100%" margin="16px 0px">
            <Flex justify="space-between" align="end" marginBottom={1}>
                <Text as="b" fontSize={20} >
                    {title}
                </Text>
                <Link to={moreUrl}>
                    <Text as="span" fontSize={12} color="whiteAlpha.700">
                        More
                    </Text>
                </Link>
            </Flex>
            <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(4, 1fr)"}} gap={6}>
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
