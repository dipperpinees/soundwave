import { Flex, Image, Box, Text, Center, Icon, background } from '@chakra-ui/react';
import { LikeIcon } from '../Icon';
import { FaRegEye } from 'react-icons/fa';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { PlayerContext } from '../../stores/playerStore';
import './styles.scss';

const Song = ({ ...props }) => {
    const { id, title, thumbnail, author, playCount, genre } = props;

    const [{ songList, indexSongPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);

    const addAndPlay = () => setPlayer({ type: 'Add', payload: props });

    const togglePlay = () => setPlayer({ type: 'Toggle' });

    const isPlayThisSong = id === songList[indexSongPlayed]?.id;
    const showPauseIcon = id === songList[indexSongPlayed]?.id && isPlayed;

    const { isLikeIcon, isViewIcon } = props;
    const { borderBottom } = props;
    const [songName, singerName] = title.split(' - ');
    // const [likeNum, setLikeNumber] = useState(likeNumber);
    // const [viewNumber, setViewNumber] = useState(playCount);

    // useEffect(() => {
    //     setViewNumber(playCount);
    // }, [playCount]);

    // console.log('song' + id);

    return (
        <Box id={id} borderBottom={borderBottom} padding="12px 0">
            <Flex h="42px" overflow="hidden">
                <Box
                    className="image-song"
                    pos={'relative'}
                    boxSize="42px"
                    bg="white"
                    overflow={'hidden'}
                    borderRadius={'2px'}
                    cursor={'pointer'}
                >
                    <Image src={thumbnail} alt="song image" boxSize="100%" />
                    <Center
                        className="play-btn"
                        // pos={'absolute'}
                        // visibility={'hidden'}
                        // _hover={{ background: 'rgba(0, 0, 0, 0.1)', visibility: 'visible' }}
                        top={'0'}
                        left={'0'}
                        boxSize={'100%'}
                        onClick={isPlayed ? togglePlay : addAndPlay}
                    >
                        <Icon as={showPauseIcon ? AiFillPauseCircle : AiFillPlayCircle} fontSize="24px" />
                    </Center>
                </Box>
                <Box ml={2} flex="1" width={'70%'}>
                    {/* Song name */}
                    <Text
                        textOverflow={'ellipsis'}
                        overflow="hidden"
                        whiteSpace={'nowrap'}
                        width={['90%', '50%']}
                        fontSize="md"
                    >
                        <Link to={`/music/${id}`}>{songName}</Link>
                    </Text>
                    <Flex fontSize="xs" overflow={'hidden'} whiteSpace={'nowrap'} width={['80%', '50%']}>
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
                    <Flex alignItems="center" margin="0 12px">
                        <FaRegEye fontSize={'20px'} />
                        <Text minW={'30px'} ml={'8px'}>
                            {playCount}
                        </Text>
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default Song;
