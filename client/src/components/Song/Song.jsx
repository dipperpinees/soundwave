import { Flex, Image, Box, Text, Center, Icon, background, AspectRatio } from '@chakra-ui/react';
import { LikeIcon } from '../Icon';
import { BsPlay } from 'react-icons/bs';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PlayerContext } from '../../stores/playerStore';
import './styles.scss';

const Song = ({ ...props }) => {
    const { data } = props;
    const { id, title, thumbnail, author, playCount, genre } = data[props.index];

    const [{ songList, indexSongPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);

    const addAndPlay = () => setPlayer({ type: 'Add', payload: data[props.index] });

    const togglePlay = () => setPlayer({ type: 'Toggle' });

    const isPlayThisSong = id === songList[indexSongPlayed]?.id;
    const showPauseIcon = id === songList[indexSongPlayed]?.id && isPlayed;

    const { isLikeIcon, isViewIcon } = props;
    const { borderBottom } = props;
    const [songName, singerName] = title.split(' - ');

    return (
        <Box id={id} borderBottom={borderBottom} padding="12px 0">
            <Flex h="42px" overflow="hidden" justify="space-between">
                <Box
                    className="image-song"
                    pos={'relative'}
                    boxSize="42px"
                    bg="white"
                    overflow={'hidden'}
                    borderRadius={2}
                    cursor={'pointer'}
                >
                    <AspectRatio maxW={'100%'} ratio={1}>
                        <Image src={thumbnail} alt="song image" boxSize="100%" objectFit={'cover'} borderRadius={2} />
                    </AspectRatio>
                    <Center
                        className="play-btn"
                        top={'0'}
                        left={'0'}
                        boxSize={'100%'}
                        onClick={isPlayed ? togglePlay : addAndPlay}
                    >
                        <Icon
                            as={showPauseIcon ? AiFillPauseCircle : AiFillPlayCircle}
                            fontSize="24px"
                            _focus={{ color: 'var(--primary-color)' }}
                            _active={{}}
                            _hover={{}}
                        />
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
                    <Flex fontSize="xs" overflow={'hidden'} whiteSpace={'nowrap'} maxW={['90%', '90%']}>
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
