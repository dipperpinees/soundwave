import { Box, Flex } from '@chakra-ui/react';
import CurrentSong from '../components/CurrentSong';
import Comments from '../components/Comments';
import RelatedTracks from '../components/RelatedTracks/RelatedTracks';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useLayoutEffect, useContext } from 'react';
import fetchAPI from '../utils/fetchAPI';
import { UserContext } from '../stores/userStore';
import { Helmet } from 'react-helmet';

const MusicPage = () => {
    const { id } = useParams();
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
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
        <Box className="music-page">
            <Helmet>
                <title>Music Page</title>
            </Helmet>
            <Box mb={'24px'}>
                <CurrentSong {...{ data }} />
            </Box>
            <Flex>
                {/* width = image width */}
                <Box flex={'25%'} maxW={'25%'}>
                    <RelatedTracks id={data?.author?.id} />
                </Box>
                <Box flex={'75%'} maxW={'75%'}>
                    <Comments songId={id} />
                </Box>
            </Flex>
        </Box>
    );
};

export default MusicPage;
