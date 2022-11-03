import { Skeleton } from '@chakra-ui/react';
import { Box, Flex, Text } from '@chakra-ui/react';
import SongPreview from '../SongPreview';
import SongSkeleton from '../SquareSkeleton';

export default function ListSongPreview({ title, songs }) {
    return (
        <Box width="100%" margin="16px 0px">
            <Text as="b" fontSize={20} marginBottom={1}>
                {title}
            </Text>
            <Flex gap={10}>
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
            </Flex>
        </Box>
    );
}
