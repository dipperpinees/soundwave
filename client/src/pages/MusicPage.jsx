import { Box, Flex } from '@chakra-ui/react';
import CurrentSong from '../components/CurrentSong';
import Comments from '../components/Comments';
import RelatedTracks from '../components/RelatedTracks/RelatedTracks';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useLayoutEffect, useContext } from 'react';
import fetchAPI from '../utils/fetchAPI';
import { UserContext } from '../stores/userStore';

const MusicPage = () => {
    const { id } = useParams();
    const [user, userDispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useLayoutEffect(() => {
        (async () => {
            try {
                const data = await fetchAPI(`/song/${id}`);
                setData(data);
            } catch (e) {}
        })();
    }, [id]);

    // chuyển hướng nếu chưa đăng nhập
    useLayoutEffect(() => {
        if (!user.id) {
            navigate('/signin');
            return;
        }
    }, []);

    return (
        <Box className="music-page">
            <Box mb={'24px'}>
                <CurrentSong {...data} />
            </Box>
            <Flex>
                {/* width = image width */}
                <Box width="260px">
                    <RelatedTracks id={data?.author?.id} />
                </Box>
                <Box flex={1}>
                    <Comments />
                </Box>
            </Flex>
        </Box>
    );
};

export default MusicPage;
