import { Box, Flex } from '@chakra-ui/react';
import FeaturedTracks from '../components/FeaturedTracks';
import RecentlyLikes from '../components/RecentlyLikes';
import Profile from '../components/Profile';
import Albums from '../components/Albums';

const ProfilePage = () => (
    <Box className="profile-wrapper" ml="360px">
        <Box
            className="profile-user"
            borderLeft="1px solid rgba(255, 255, 255, 0.5)"
            borderRight="1px solid rgba(255, 255, 255, 0.5)"
        >
            <Box className="profile-content" margin="0 auto">
                <Profile />
            </Box>
        </Box>
        <Flex margin="0 56px" flexWrap="wrap" justifyContent="space-between">
            <Box flexBasis="50%">
                <FeaturedTracks />
            </Box>
            <Box flexBasis="38%">
                <RecentlyLikes />
            </Box>
            <Box mt={'48px'} flex="100%">
                <Albums />
            </Box>
        </Flex>
    </Box>
);

export default ProfilePage;
