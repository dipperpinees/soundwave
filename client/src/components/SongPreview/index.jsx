import { Flex } from '@chakra-ui/react';
import { AspectRatio, Box, Icon, Image, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import defaultPreview from '../../assets/song_preview.jpg';
import { PlayerContext } from '../../stores/playerStore';

export default function SongPreview({ song }) {
    const [showPlay, setShowPlay] = useState(false);
    const [{ songList, indexSongPlayed }, setPlayer] = useContext(PlayerContext);
    const play = () => {
        setPlayer({ type: 'Add', payload: song });
    };
    return (
        <Box width="22%">
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
                        as={AiFillPlayCircle}
                        fontSize={60}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        borderRadius="50%"
                        onClick={play}
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
