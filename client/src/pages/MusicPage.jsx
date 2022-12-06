import { Box, Flex } from '@chakra-ui/react';
import CurrentSong from '../components/CurrentSong';
import Comments from '../components/Comments';
import RelatedTracks from '../components/RelatedTracks/RelatedTracks';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import fetchAPI from '../utils/fetchAPI';
import { Helmet } from 'react-helmet';
// import { UserContext } from '../stores/userStore';

const MusicPage = () => {
    const { id } = useParams();
    // const [user] = useContext(UserContext);
    // const navigate = useNavigate();
    const [data, setData] = useState(null);

    useLayoutEffect(() => {
        const fetchSong = async () => {
            try {
                const data = await fetchAPI(`/song/${id}`);
                setData(data);
            } catch (e) {}
        };
        if (id !== undefined) fetchSong();
    }, [id]);

    // chuyển hướng nếu chưa đăng nhập
    // useLayoutEffect(() => {
    //     if (user.id === 0) {
    //         navigate('/signin');
    //         return;
    //     }
    // }, []);

    if (!data) {
        return;
    }

    return (
        <Box m={['0 24px', '0 24px', '0']} minH={'100vh'} className="music-page">
            <Helmet>
                <title>Music Page</title>
            </Helmet>
            <Box mb={['24px']}>
                <CurrentSong {...{ data }} />
            </Box>
            <Flex wrap={'wrap'}>
                {/* width = image width */}
                <Box flex={['100%', '100%', '25%']} maxW={['100%', '100%', '25%']}>
                    <RelatedTracks id={data?.author?.id} />
                </Box>
                <Box
                    flex={['100%', '100%', '75%']}
                    maxW={['100%', '100%', '75%']}
                    p={['0 0 12px', '0 0 24px', '0 48px 24px']}
                >
                    <Comments songId={id} />
                </Box>
            </Flex>
        </Box>
    );
};

export default MusicPage;
