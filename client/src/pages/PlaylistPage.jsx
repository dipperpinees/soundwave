import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchAPI from '../utils/fetchAPI';
import { Helmet } from 'react-helmet';
import PlaylistPageHeader from '../components/PlaylistPageHeader';
import PlaylistSongList from '../components/PlaylistSongList';

const PlaylistPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [playlist, setPlaylist] = useState();

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const data = await fetchAPI(`/playlist/${id}`);
                setData(data);
            } catch (e) {}
        };
        if (id !== undefined) fetchSong();
    }, [id]);

    if (!data) {
        return;
    }

    return (
        <Box
            p={'calc(var(--header-height) + 24px) 0 0 var(--navbar-width) '}
            m={['0 24px', '0 24px', '0 48px 0 0']}
            minH={'100vh'}
            color={'white'}
        >
            <Helmet>
                <title>Playlist Page</title>
            </Helmet>
            <Box mb={['24px']}>
                <PlaylistPageHeader {...data} />
            </Box>
            <Box>
                <PlaylistSongList songs={data.songs} />
            </Box>
        </Box>
    );
};

export default PlaylistPage;
