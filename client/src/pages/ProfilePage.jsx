import { Box, Grid, Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import FeaturedTracks from '../components/FeaturedTracks';
import PlaylistPreview from '../components/Playlists/PlaylistPreview';
import Profile from '../components/Profile';
import { ProfileSkeleton } from '../components/SquareSkeleton';
import useProfile from '../hooks/useProfile';
import useUserPlaylist from '../hooks/useUserPlaylists';
import { UserContext } from '../stores/userStore';
import { APP_NAME } from '../utils/constant';

const ProfilePage = () => {
    const { id } = useParams();
    const { data, isLoading } = useProfile(id);
    const [user] = useContext(UserContext);
    const { data: playlists } = useUserPlaylist(id, { enabled: !!id });

    return (
        <Box
            m={['0 24px', '0 24px', '0 24px 0 360px']}
            minHeight="100vh"
            sx={{ paddingTop: '80px' }}
            color={'white'}
            pb={24}
        >
            <Helmet>
                <title>
                    {APP_NAME} - {data ? data.name : 'Profile Page'}
                </title>
            </Helmet>
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
                    {isLoading ? <ProfileSkeleton /> : <Profile data={data} userId={user.id} />}
                </Box>
            </Box>
            <Box>
                <Box>{isLoading ? null : <FeaturedTracks currentUserId={id} />}</Box>
                {playlists && !!playlists.length && (
                    <Box mt={['24px']} pb={'36px'} flex="100%" width={['100%']}>
                        <Heading fontSize={['1.5rem']} mb={3}>
                            Featured Playlists
                        </Heading>
                        <Grid
                            templateColumns={{
                                base: 'repeat(2, minmax(0, 1fr))',
                                sm: 'repeat(4, minmax(0, 1fr))',
                                lg: 'repeat(6, minmax(0, 1fr))',
                            }}
                            gap={6}
                        >
                            {playlists.map((playlist) => (
                                <PlaylistPreview key={playlist.id} {...playlist} showSettings={false} />
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProfilePage;
