import { Box, Button, Flex, Heading, Image, Link, HStack } from '@chakra-ui/react';
import { GiPauseButton } from 'react-icons/gi';
import { FaPlay } from 'react-icons/fa';
import { BsDownload, BsThreeDotsVertical } from 'react-icons/bs';
import { LikeIcon } from '../Icon';
import { useState, useContext, Fragment } from 'react';
import { PlayerContext } from '../../stores/playerStore';

const CurrentSong = () => {
    // const [showPlay, setShowPlay] = useState(false);
    // const [{ songList, indexSongPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);

    // const addAndPlay = () => setPlayer({ type: 'Add', payload: song });

    // const togglePlay = () => setPlayer({ type: 'Toggle' });

    // const isPlayThisSong = song.id === songList[indexSongPlayed]?.id;
    // const showPauseIcon = song.id === songList[indexSongPlayed]?.id && isPlayed;

    // const download = () => window.open(song.url.replace('/upload/', '/upload/fl_attachment/'), '_blank');

    const [isPlayed, hasPlayed] = useState(false);

    return (
        <Flex>
            <Box boxSize="260px" bg="white" borderRadius={'10px'} overflow="hidden">
                {/* current song image */}
                <Image
                    src={
                        'https://images.macrumors.com/t/hi1_a2IdFGRGMsJ0x31SdD_IcRk=/1600x/article-new/2018/05/apple-music-note.jpg'
                    }
                    alt="song image"
                    boxSize="100%"
                    objectFit="cover"
                />
            </Box>
            <Flex flex={1} m={'0 48px'} flexDirection={'column'}>
                <Flex align={'center'}>
                    <Heading fontSize="3xl" mb={'12px'}>
                        Hãy Trao Cho Anh
                    </Heading>
                    {/* <Link fontSize={'3xl'}>Sơn Tùng M-TP</Link> */}
                </Flex>
                <HStack mb={'24px'} color={'text'} fontSize="md">
                    <Link href="#">user name</Link>
                    <Box m="0 4px">-</Box>
                    <Link href="#">artist</Link>
                </HStack>
                <Flex justify={'space-between'} align={'center'}>
                    <Flex gap={'16px'}>
                        <Button
                            borderRadius={'full'}
                            // display={'flex'}
                            // alignItems="center"
                            // justify="center"
                            colorScheme={'red'}
                            onClick={() => hasPlayed(!isPlayed)}
                            width={'120px'}
                        >
                            {isPlayed ? (
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
                            <LikeIcon />
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
