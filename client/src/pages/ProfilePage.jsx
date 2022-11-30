import { Box, Flex } from '@chakra-ui/react';
import FeaturedTracks from '../components/FeaturedTracks';
import RecentlyLikes from '../components/RecentlyLikes';
import Profile from '../components/Profile';
import Albums from '../components/Albums';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import fetchAPI from '../utils/fetchAPI';
import { UserContext } from '../stores/userStore';
import EditProfile from '../components/Profile/EditProfile/EditProfile';
import useProfile from '../hooks/useProfile';

const ProfilePage = () => {
    const { id } = useParams();
    const {data, isLoading} = useProfile(id);
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
    //const [data, setData] = useState(null);
    //const [isEditProfile, setIsEditProfile] = useState(false);

    console.log('re-render profile page');

    //useEffect(() => {
    //    (async () => {
    //        try {
    //            const data = await fetchAPI(`/user/${id}`);
    //            setData(data);
    //        } catch (e) {}
   //     })();
    //}, [id]);

    // chuyển hướng đăng nhập nếu chưa đăng nhập
    useLayoutEffect(() => {
        if (!user.id) {
            navigate('/signin');
            return;
        }
    }, []);

    return (
        <Box ml={['0', '0', '360px']} minHeight="100vh" pt={['84px']} color={'#fff'}>
            <EditProfile {...{ isEditProfile, setIsEditProfile }} />
            <Box
                pos={['initial', 'initial', 'fixed']}
                top={['0']}
                left={['0', '0', '120px']}
                mt={'60px'}
                mb={['24px', '24px', '0']}
                borderLeft={['none', 'none', '1px solid rgba(255, 255, 255, 0.2)']}
                borderRight={['none', 'none', '1px solid rgba(255, 255, 255, 0.2)']}
            >
                <Box minH={['initial', 'initial', '100vh']} margin={['0 12px', '0 24px', '0 24px']}>
                    <Profile {...{ setIsEditProfile }} {...data} userId={user.id} />
                </Box>
            </Box>
            <Box margin={['0 12px', '0 24px', '0 56px']}>
                <Box>
                    <FeaturedTracks currentUserId={id} />
                </Box>
                {/* <Box flexBasis={['100%', '100%', '100%', '38%']} width={['100%', '100%', '100%', '38%']}>
                    <RecentlyLikes userId={id} />
                </Box> */}
                <Box mt={'48px'} pb={'36px'} flex="100%" width={['100%']}>
                    <Albums currentUserId={id} />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
