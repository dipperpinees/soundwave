import { Box, Flex } from '@chakra-ui/react';
import CurrentSong from '../components/CurrentSong';
import Comments from '../components/Comments';
const MusicPage = () => {
    return (
        <Box className="music-page">
            <Box mb={'24px'}>
                <CurrentSong />
            </Box>
            <Flex>
                <Box width="260px">dsf</Box>
                <Box flex={1}>
                    <Comments />
                </Box>
            </Flex>
        </Box>
    );
};

export default MusicPage;
