import { Box, Flex, Heading, Image, Text, AspectRatio, Icon } from '@chakra-ui/react';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { useContext } from 'react';
import { PlayerContext } from '../../stores/playerStore';
import defaultPreview from '../../assets/song_preview.jpg';
import { DEFAULT_PLAYLIST_THUMBNAIL } from '../../utils/image';

const PlaylistPageHeader = ({ id, name, songs, thumbnail }) => {
    const [{ isPlayed, playlistID }, dispatch] = useContext(PlayerContext);

    const playPlaylist = () => dispatch({ type: 'PlayPlaylist', payload: { id, songs } });

    const togglePlay = () => dispatch({ type: 'Toggle' });

    const playlistDuration = songs.reduce((duration, song) => {
        return duration + song.duration / 60;
    }, 0);

    const minutes = parseInt(playlistDuration) % 60;
    const hours = (parseInt(playlistDuration) - minutes) / 60;

    return (
        <Flex id={id}>
            <Box
                _hover={{ '.play-playlist': { visibility: 'visible' } }}
                flex={['30%', '25%']}
                maxW={['30%', '25%']}
                pos={'relative'}
            >
                <AspectRatio maxW={'100%'} ratio={1}>
                    <Image
                        src={thumbnail || DEFAULT_PLAYLIST_THUMBNAIL}
                        fallbackSrc={defaultPreview}
                        alt="song image"
                        boxSize="100%"
                        objectFit="cover"
                        borderRadius={'10px'}
                    />
                </AspectRatio>
                <Box
                    pos={'absolute'}
                    top={0}
                    left={0}
                    boxSize={'100%'}
                    bg={'rgba(0, 0, 0, 0.1)'}
                    visibility={'hidden'}
                    borderRadius={'10px'}
                    className={'play-playlist'}
                    cursor={'pointer'}
                >
                    <Icon
                        bgColor="var(--primary-color)"
                        position="absolute"
                        top="50%"
                        left="50%"
                        boxSize={'5rem'}
                        padding={2}
                        as={playlistID === id && isPlayed ? MdPause : MdPlayArrow}
                        transform="translate(-50%, -50%)"
                        borderRadius="50%"
                        onClick={playlistID === id ? togglePlay : playPlaylist}
                    />
                </Box>
            </Box>
            <Box flex={['70%', '75%']} maxW={['70%', '75%']} pl={['12px', '24px', '48px']}>
                <Heading
                    textOverflow={'ellipsis'}
                    overflow="hidden"
                    whiteSpace={'nowrap'}
                    width={'90%'}
                    fontSize={['0.8rem', '1rem', '1.2rem']}
                    m={['12px 0 0 0', '24px 0 12px 0']}
                    fontWeight={'400'}
                >
                    Playlist
                </Heading>
                <Heading mb={['24px']} fontSize={['3rem']}>
                    {name}
                </Heading>
                <Text color={'whiteAlpha.600'}>
                    {songs.length +
                        ' songs - about ' +
                        (hours === 0 ? '' : hours + (hours === 1 ? 'hour' : ' hours ')) +
                        (minutes < 10 ? '0' + minutes : minutes) +
                        ' minutes'}
                </Text>
            </Box>
        </Flex>
    );
};

export default PlaylistPageHeader;
