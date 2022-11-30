import { Box, Button, Flex, Heading, Image, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GiPauseButton } from 'react-icons/gi';
import { FaPlay } from 'react-icons/fa';
import { BsDownload, BsThreeDotsVertical } from 'react-icons/bs';
import { LikeIcon } from '../Icon';
import { useState, useContext, Fragment } from 'react';
import { PlayerContext } from '../../stores/playerStore';

const CurrentSong = (props) => {
    const [data, setData] = useState([props]);
    const { id, title, url, thumbnail, author, likeNumber, playCount, genre } = props;

    const [{ songList, indexSongPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);

    const addAndPlay = () => setPlayer({ type: 'Add', payload: props });

    const togglePlay = () => setPlayer({ type: 'Toggle' });

    const isPlayThisSong = id === songList[indexSongPlayed]?.id;
    const showPauseIcon = id === songList[indexSongPlayed]?.id && isPlayed;
    console.log('title', title);
    let songName;
    let singerName;
    if (title) {
        [songName, singerName] = title?.split(' - ');
    }
    // const [isPlayed, hasPlayed] = useState(false);
    const download = () => window.open(url.replace('/upload/', '/upload/fl_attachment/'), '_blank');

    return (
        <Flex id={id}>
            <Box boxSize="260px" bg="white" borderRadius={'10px'} overflow="hidden">
                {/* current song image */}
                <Image src={thumbnail} alt="song image" boxSize="100%" objectFit="cover" />
            </Box>
            <Flex flex={1} m={'0 48px'} flexDirection={'column'}>
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
                            <LikeIcon index={0} data={data} setData={setData} showLikeNumber={false} />
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
