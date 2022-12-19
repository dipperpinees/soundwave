import { AspectRatio, Box, Center, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { BsPlay } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import waveGif from '../../assets/animated.gif';
import { PlayerContext } from '../../stores/playerStore';
import { DEFAULT_SONG_THUMBNAIL } from '../../utils/image';
import { LikeIcon } from '../Icon';
import './styles.scss';

const Song = ({ ...props }) => {
    const { data } = props;
    const { id, title, thumbnail, author, playCount } = data[props.index];

    const [{songPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);

    const addAndPlay = () => setPlayer({ type: 'Add', payload: data[props.index] });

    const togglePlay = () => setPlayer({ type: 'Toggle' });

    const isPlayThisSong = id === songPlayed?.id;
    const showPauseIcon = id === songPlayed?.id && isPlayed;

    const { isLikeIcon, isViewIcon } = props;

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
                        <Link to={`/music/${id}`}>{title}</Link>
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
