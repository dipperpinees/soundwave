import { Box, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import {
    LastestSongs,
    MostStreamedSong,
    RecentlyPlayed,
    RecommendArtist,
    RecommendPlaylists,
} from '../components/Recommend';
import { APP_NAME } from '../utils/constant';

export default function HomePage() {
    return (
        <Flex
            className="home-page"
            color="white"
            gap={{ base: 4, lg: 10 }}
            direction={{ base: 'column', lg: 'row' }}
            px={{ base: 6, md: 0 }}
        >
            <Helmet>
                <title>{APP_NAME}</title>
            </Helmet>
            <Box flex={3} pr={{ base: 0, md: 6, xl: 0 }}>
                <RecentlyPlayed />
                <LastestSongs />
                <MostStreamedSong />
                <RecommendPlaylists />
            </Box>
            <RecommendArtist />
        </Flex>
    );
}
