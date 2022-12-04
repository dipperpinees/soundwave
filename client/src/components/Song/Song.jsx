import { Flex, Image, Box, Text, Center, Icon, AspectRatio } from '@chakra-ui/react';
import { LikeIcon } from '../Icon';
import { BsPlay } from 'react-icons/bs';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PlayerContext } from '../../stores/playerStore';
import './styles.scss';
import waveGif from '../../assets/animated.gif';
import { DEFAULT_SONG_THUMBNAIL } from '../../utils/image';

const Song = ({ ...props }) => {
    const { data } = props;
    const { id, title, thumbnail, author, playCount } = data[props.index];

    const [{ songList, indexSongPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);

    const addAndPlay = () => setPlayer({ type: 'Add', payload: data[props.index] });

    const togglePlay = () => setPlayer({ type: 'Toggle' });

    const isPlayThisSong = id === songList[indexSongPlayed]?.id;
    const showPauseIcon = id === songList[indexSongPlayed]?.id && isPlayed;

    const { isLikeIcon, isViewIcon } = props;
    const [songName, singerName] = title.split(' - ');

    return (
        <Box id={id} borderBottom="1px solid rgba(255, 255, 255, 0.2)" padding="12px 0">
            <Flex h="42px" overflow="hidden" justify="space-between">
                <Box
                    className="image-song"
                    pos={'relative'}
                    boxSize="42px"
                    overflow={'hidden'}
                    borderRadius={2}
                    cursor={'pointer'}
                >
                    <AspectRatio maxW={'100%'} ratio={1}>
                        <Image
                            src={thumbnail}
                            fallbackSrc={DEFAULT_SONG_THUMBNAIL}
                            alt="song image"
                            boxSize="100%"
                            objectFit={'cover'}
                            borderRadius={2}
                        />
                    </AspectRatio>
                    <Flex
                        align={'end'}
                        width={'100%'}
                        height={'60%'}
                        bottom={0}
                        left={0}
                        pos={'absolute'}
                        display={showPauseIcon ? 'flex' : 'none'}
                        overflow={'hidden'}
                    >
                        <Image src={waveGif} objectFit={'cover'} />
                        <Image src={waveGif} objectFit={'cover'} />
                    </Flex>
                    <Center
                        className="play-btn"
                        top={'0'}
                        left={'0'}
                        boxSize={'100%'}
                        _hover={{ color: 'var(--primary-color)' }}
                        onClick={isPlayThisSong ? togglePlay : addAndPlay}
                    >
                        <Icon as={showPauseIcon ? AiFillPauseCircle : AiFillPlayCircle} fontSize="24px" />
                    </Center>
                </Box>
                <Box ml={2} flex="1" maxW={'80%'}>
                    {/* Song name */}
                    <Text
                        textOverflow={'ellipsis'}
                        overflow="hidden"
                        whiteSpace={'nowrap'}
                        maxW={['90%', '90%']}
                        fontSize="md"
                    >
                        <Link to={`/music/${id}`}>{songName}</Link>
                    </Text>
                    <Flex
                        fontSize="xs"
                        color={'text'}
                        fontWeight={'600'}
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                        maxW={['90%', '90%']}
                    >
                        <Link to={`/profile/${author?.id}`}>{author?.name}</Link>
                        <Text m="0 4px">-</Text>
                        <Text textOverflow={'ellipsis'} overflow="hidden">
                            <Link to={''}>{singerName}</Link>
                        </Text>
                        {/* singer */}
                    </Flex>
                </Box>
                {isLikeIcon && (
                    <Flex alignItems="center" margin="0">
                        <LikeIcon {...props} />
                    </Flex>
                )}
                {isViewIcon && (
                    <Flex display={['none', 'flex', 'none', 'flex']} alignItems="center" margin="0 12px">
                        <BsPlay fontSize={'24px'} />
                        <Text minW={'36px'} ml={'8px'}>
                            {playCount}
                        </Text>
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default Song;
