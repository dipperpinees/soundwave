import { Box, Button, Flex, Heading, Image, HStack, AspectRatio } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GiPauseButton } from 'react-icons/gi';
import { FaPlay } from 'react-icons/fa';
import { BsDownload, BsThreeDotsVertical } from 'react-icons/bs';
import { LikeIcon } from '../Icon';
import { useContext, Fragment } from 'react';
import { PlayerContext } from '../../stores/playerStore';

const CurrentSong = (props) => {
    const { id, title, url, thumbnail, author, playCount, genre } = props.data;

    const [{ songList, indexSongPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);

    const addAndPlay = () => setPlayer({ type: 'Add', payload: props.data });

    const togglePlay = () => setPlayer({ type: 'Toggle' });

    const isPlayThisSong = id === songList[indexSongPlayed]?.id;
    const showPauseIcon = id === songList[indexSongPlayed]?.id && isPlayed;

    const [songName, singerName] = title?.split(' - ');

    const download = () => window.open(url.replace('/upload/', '/upload/fl_attachment/'), '_blank');

    return (
        <Flex id={id}>
            <Box flex={'25%'}>
                <AspectRatio maxW={'100%'} ratio={1}>
                    <Image src={thumbnail} alt="song image" boxSize="100%" objectFit="cover" borderRadius={'10px'} />
                </AspectRatio>
            </Box>
            <Flex flex={'75%'} padding={['0 12px', '0 24px', '0 48px']} flexDirection={'column'}>
                <Flex align={'center'}>
                    <Heading fontSize="3xl" mb={'12px'}>
                        {songName}
                    </Heading>
                    {/* <Link fontSize={'3xl'}>Sơn Tùng M-TP</Link> */}
                </Flex>
                <HStack mb={'24px'} color={'text'} fontSize="md">
                    <Link to={`/profile/${author?.id}`}>{author?.name}</Link>
                    <Box m="0 4px">-</Box>
                    <Link to={''}>{singerName}</Link>
                </HStack>
                <Flex justify={'space-between'} align={'center'}>
                    <Flex gap={'16px'}>
                        <Button
                            borderRadius={'full'}
                            colorScheme={'red'}
                            onClick={isPlayThisSong ? togglePlay : addAndPlay}
                            width={'120px'}
                        >
                            {showPauseIcon ? (
                                <Fragment>
                                    <GiPauseButton fontSize={'20px'} />
                                    <Box ml={'8px'} lineHeight={'100%'}>
                                        Pause
                                    </Box>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <FaPlay fontSize={'16px'} />
                                    <Box ml={'18px'} lineHeight={'100%'}>
                                        Play
                                    </Box>
                                </Fragment>
                            )}
                        </Button>
                        <Flex
                            boxSize={'40px'}
                            borderRadius={'full'}
                            border={'1px solid white'}
                            color="white"
                            align="center"
                            justify="center"
                        >
                            <LikeIcon index={0} data={[props.data]} showLikeNumber={false} />
                        </Flex>
                    </Flex>
                    <Flex gap={'16px'}>
                        <Button
                            colorScheme="whiteAlpha"
                            _hover={{ background: 'hoverColor' }}
                            variant="outline"
                            borderRadius={'full'}
                            display={'flex'}
                            alignItems="center"
                            justify="center"
                            color={'white'}
                            onClick={download}
                        >
                            <BsDownload />
                            <Box ml={'8px'} lineHeight={'100%'}>
                                Download
                            </Box>
                        </Button>
                        <Flex
                            boxSize={'40px'}
                            borderRadius={'full'}
                            border={'1px solid white'}
                            color="white"
                            align="center"
                            justify="center"
                            cursor={'pointer'}
                            _hover={{ background: 'hoverColor' }}
                        >
                            <BsThreeDotsVertical fontSize={'20px'} />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CurrentSong;
