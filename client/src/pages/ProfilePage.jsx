import { Box, Flex } from '@chakra-ui/react';
import FeaturedTracks from '../components/FeaturedTracks';
import RecentlyLikes from '../components/RecentlyLikes';
import Profile from '../components/Profile';
import Albums from '../components/Albums';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchAPI from '../utils/fetchAPI';

const ProfilePage = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAPI(`/user/${id}`);
                setData(data);
            } catch (e) {}
        })();
    }, [id]);

    return (
        <Box className="profile-wrapper" ml="360px">
            <Box
                pos={['initial', 'fixed']}
                className="profile-user"
                borderLeft="1px solid rgba(255, 255, 255, 0.2)"
                borderRight="1px solid rgba(255, 255, 255, 0.2)"
            >
                <Box className="profile-content" margin="0 auto">
                    <Profile {...data} />
                </Box>
            </Box>
            <Flex margin="0 56px" flexWrap="wrap" justifyContent="space-between">
                <Box flexBasis={['100%', '100%', '100%', '50%']} width={['100%', '100%', '100%', '50%']}>
                    <FeaturedTracks userId={id} />
                </Box>
                <Box flexBasis={['100%', '100%', '100%', '38%']} width={['100%', '100%', '100%', '38%']}>
                    <RecentlyLikes userId={id} />
                </Box>
                <Box mt={'48px'} mb={'36px'} flex="100%" width={['100%']}>
                    <Albums userId={id} />
                </Box>
            </Flex>
        </Box>
    );
};

export default ProfilePage;
