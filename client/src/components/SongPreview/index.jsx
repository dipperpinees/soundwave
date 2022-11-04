import { Flex } from '@chakra-ui/react';
import { AspectRatio, Box, Icon, Image, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import defaultPreview from '../../assets/song_preview.jpg';
import { PlayerContext } from '../../stores/playerStore';

export default function SongPreview({ song }) {
    const [showPlay, setShowPlay] = useState(false);
    const [{ songList, indexSongPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);

    const addAndPlay = () => {
        setPlayer({ type: 'Add', payload: song });
    };

    const togglePlay = () => {
        setPlayer({ type: 'Toggle' });
    };

    const isPlayThisSong = song.id === songList[indexSongPlayed]?.id;
    const showPauseIcon = song.id === songList[indexSongPlayed]?.id && isPlayed;

    return (
        <Box width="100%">
            <Box
                position="relative"
                _hover={{ cursor: 'pointer' }}
                onMouseEnter={() => setShowPlay(true)}
                onMouseLeave={() => setShowPlay(false)}
            >
                <AspectRatio width="100%" ratio={1}>
                    <Image
                        objectFit="cover"
                        src={song.thumbnail || defaultPreview}
                        alt="Dan Abramov"
                        borderRadius={16}
                        opacity={showPlay && 0.6}
                    />
                </AspectRatio>
                {showPlay && (
                    <Icon
                        color="var(--primary-color)"
                        as={showPauseIcon ? AiFillPauseCircle : AiFillPlayCircle}
                        fontSize={60}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        borderRadius="50%"
                        onClick={isPlayThisSong ? togglePlay : addAndPlay}
                    />
                )}
            </Box>

            <Flex direction="column" mt={1}>
                <Text fontSize={14} fontWeight={600}>
                    {song.title}
                </Text>
                <Text as="span" fontSize={11} color="gray" fontWeight={600}>
                    {song.author.name}
                </Text>
            </Flex>
        </Box>
    );
}
