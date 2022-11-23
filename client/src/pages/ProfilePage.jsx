import { Box, Flex } from '@chakra-ui/react';
import FeaturedTracks from '../components/FeaturedTracks';
import RecentlyLikes from '../components/RecentlyLikes';
import Profile from '../components/Profile';
import Albums from '../components/Albums';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import fetchAPI from '../utils/fetchAPI';
import { UserContext } from '../stores/userStore';

const ProfilePage = () => {
    const { id } = useParams();
    const [user, userDispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAPI(`/user/${id}`);
                setData(data);
            } catch (e) {}
        })();
    }, [id]);

    // chuyển hướng đăng nhập nếu chưa đăng nhập
    // useLayoutEffect(() => {
    //     if (!user.id) {
    //         navigate('/signin');
    //         return;
    //     }
    // }, []);

    return (
        <Box className="profile-wrapper" ml="360px" minHeight="100vh">
            <Box
                pos={['initial', 'fixed']}
                className="profile-user"
                borderLeft="1px solid rgba(255, 255, 255, 0.2)"
                borderRight="1px solid rgba(255, 255, 255, 0.2)"
            >
                <Box className="profile-content" margin="0 auto">
                    <Profile {...data} userId={user.id} />
                </Box>
            </Box>
            <Box margin="0 56px">
                <Box>
                    <FeaturedTracks currentUserId={id} />
                </Box>
                {/* <Box flexBasis={['100%', '100%', '100%', '38%']} width={['100%', '100%', '100%', '38%']}>
                    <RecentlyLikes userId={id} />
                </Box> */}
                <Box mt={'48px'} mb={'36px'} flex="100%" width={['100%']}>
                    <Albums currentUserId={id} />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
