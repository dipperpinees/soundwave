import { Box } from '@chakra-ui/react';
import CurrentSong from '../components/CurrentSong';

const MusicPage = () => {
    return (
        <Box className="music-page">
            <CurrentSong />
        </Box>
    );
};

export default MusicPage;
