import { Box, Flex } from '@chakra-ui/react';
import CurrentSong from '../components/CurrentSong';
import Comments from '../components/Comments';
import RelatedTracks from '../components/RelatedTracks/RelatedTracks';

const MusicPage = () => {
    return (
        <Box className="music-page">
            <Box mb={'24px'}>
                <CurrentSong />
            </Box>
            <Flex>
                {/* width = image width */}
                <Box width="260px">
                    <RelatedTracks />
                </Box>
                <Box flex={1}>
                    <Comments />
                </Box>
            </Flex>
        </Box>
    );
};

export default MusicPage;
