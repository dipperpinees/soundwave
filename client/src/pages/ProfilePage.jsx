import { Box } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Albums from '../components/Albums';
import FeaturedTracks from '../components/FeaturedTracks';
import Profile from '../components/Profile';
import EditProfile from '../components/Profile/EditProfile/EditProfile';
import useProfile from '../hooks/useProfile';
import { UserContext } from '../stores/userStore';
import { PlaylistLibrary } from '../components/Library';
import { Helmet } from 'react-helmet';

const ProfilePage = () => {
    const { id } = useParams();
    const { data, isLoading } = useProfile(id);
    const [user] = useContext(UserContext);
    const [isEditProfile, setIsEditProfile] = useState(false);
    // const navigate = useNavigate();

    // chuyển hướng đăng nhập nếu chưa đăng nhập
    // useLayoutEffect(() => {
    //     if (!user.id) {
    //         navigate('/signin');
    //         return;
    //     }
    // }, []);

    if (!data) {
        return;
    }

    return (
        <Box m={['0 24px', '0 24px', '0 24px 0 360px']} minHeight="100vh" sx={{ paddingTop: '80px' }} color={'white'}>
            <Helmet>
                <title>Profile Page</title>
            </Helmet>
            {id == user.id && <EditProfile {...{ isEditProfile, setIsEditProfile }} data={data} />}
            <Box
                className="profile-container"
                pos={['initial', 'initial', 'fixed']}
                top={['0']}
                left={['0', '0', '120px']}
                mt={[0, 0, '60px']}
                mb={['24px', '24px', '0']}
                borderLeft={['none', 'none', '1px solid rgba(255, 255, 255, 0.2)']}
                borderRight={['none', 'none', '1px solid rgba(255, 255, 255, 0.2)']}
                overflowY={['initial', 'initial', 'scroll']}
                sx={{
                    '&::-webkit-scrollbar': { display: 'none' },
                    '&': { '-ms-overflow-style': 'none', 'scrollbar-width': 'none' },
                }}
                height={'100%'}
            >
                <Box minH={['initial', 'initial', '100vh']} m={['0', '0', '0 12px']}>
                    <Profile {...{ setIsEditProfile }} data={data} userId={user.id} />
                </Box>
            </Box>
            <Box>
                <Box>
                    <FeaturedTracks currentUserId={id} />
                </Box>
                {/* <Box flexBasis={['100%', '100%', '100%', '38%']} width={['100%', '100%', '100%', '38%']}>
                    <RecentlyLikes userId={id} />
                </Box> */}
                <Box mt={['24px']} pb={'36px'} flex="100%" width={['100%']}>
                    {/* <Albums currentUserId={id} /> */}
                    <PlaylistLibrary />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
