import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PlaylistPageHeader from '../components/PlaylistPageHeader';
import PlaylistSongList from '../components/PlaylistSongList';
import usePlaylist from '../hooks/usePlaylist';
import { PageHeaderSkeleton } from '../components/SquareSkeleton';

const PlaylistPage = () => {
    const { id } = useParams();
    const { data, isLoading } = usePlaylist(id);

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
                {isLoading ? <PageHeaderSkeleton /> : <PlaylistPageHeader {...data} isLoading={isLoading} />}
            </Box>
            <Box>
                <PlaylistSongList songs={data?.songs} isLoading={isLoading} />
            </Box>
        </Box>
    );
};

export default PlaylistPage;
