import { Box, Flex } from '@chakra-ui/react';
import CurrentSong from '../components/CurrentSong';
import Comments from '../components/Comments';
import RelatedTracks from '../components/RelatedTracks/RelatedTracks';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchAPI from '../utils/fetchAPI';

const MusicPage = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAPI(`/song/${id}`);
                setData(data);
            } catch (e) {}
        })();
    }, [id]);

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
