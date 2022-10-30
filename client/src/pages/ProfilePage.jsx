import { Box, Flex } from '@chakra-ui/react';
import FeaturedTracks from '../components/FeaturedTracks';
import RecentlyLikes from '../components/RecentlyLikes';
import Profile from '../components/Profile';
import Albums from '../components/Albums';

const ProfilePage = () => (
    <Flex className="profile-wrapper" ml="100px" mt="48px">
        <Box
            flexBasis={'23%'}
            borderLeft="1px solid rgba(255, 255, 255, 0.5)"
            borderRight="1px solid rgba(255, 255, 255, 0.5)"
        >
            <Profile />
        </Box>
        <Flex margin="0 56px" flexWrap="wrap" flexBasis="77%" justifyContent="space-between">
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
    </Flex>
);

export default ProfilePage;
