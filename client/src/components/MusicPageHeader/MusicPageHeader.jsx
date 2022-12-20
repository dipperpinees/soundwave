import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    HStack,
    Text,
    AspectRatio,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GiPauseButton } from 'react-icons/gi';
import { FaPlay } from 'react-icons/fa';
import { BsDownload, BsThreeDotsVertical } from 'react-icons/bs';
import { LikeIcon } from '../Icon';
import { useContext, Fragment } from 'react';
import { PlayerContext } from '../../stores/playerStore';
import { PlaylistContext } from '../../stores/playlistStore';
import defaultPreview from '../../assets/song_preview.jpg';
import { UserContext } from '../../stores';

const MusicPageHeader = (props) => {
    const { id, title, url, thumbnail, author, genre } = props.data;

    const [{ songPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);
    const playlistDispatch = useContext(PlaylistContext)[1];
    const user = useContext(UserContext)[0];

    const addAndPlay = () => setPlayer({ type: 'Add', payload: props.data });

    const togglePlay = () => setPlayer({ type: 'Toggle' });

    const isPlayThisSong = id === songPlayed?.id;
    const showPauseIcon = isPlayThisSong && isPlayed;

    const download = () => window.open(url.replace('/upload/', '/upload/fl_attachment/'), '_blank');

    return (
        <Flex id={id}>
            <Box flex={['30%', '25%']} maxW={['30%', '25%']}>
                <AspectRatio maxW={'100%'} ratio={1}>
                    <Image
                        src={thumbnail}
                        fallbackSrc={defaultPreview}
                        alt="song image"
                        boxSize="100%"
                        objectFit="cover"
                        borderRadius={'10px'}
                    />
                </AspectRatio>
            </Box>
            <Flex
                flex={['70%', '75%']}
                maxW={['70%', '75%']}
                p={['0 0 0 12px', '0 0 0 24px', ' 0 48px']}
                flexDirection={'column'}
            >
                <Heading
                    textOverflow={'ellipsis'}
                    overflow="hidden"
                    whiteSpace={'nowrap'}
                    width={'90%'}
                    fontSize={['1.2rem', '1.5rem', '1.9rem']}
                    mb={[0, '12px']}
                >
                    {title}
                </Heading>
                <HStack
                    whiteSpace={'nowrap'}
                    width={'90%'}
                    mb={['8px', '24px']}
                    color={'text'}
                    fontSize={['0.875rem', '1rem']}
                >
                    <Text>
                        <Link to={`/profile/${author?.id}`}>{author?.name} • {genre?.name}</Link>
                    </Text>
                </HStack>
                <Flex justify={'space-between'} align={'center'}>
                    <Flex gap={['10px']}>
                        <Button
                            borderRadius={'full'}
                            colorScheme={'red'}
                            onClick={isPlayThisSong ? togglePlay : addAndPlay}
                            width={['106px', '120px']}
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
                                    <FaPlay fontSize={['16px']} />
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
                            display={['none', 'none', 'flex']}
                            colorScheme="whiteAlpha"
                            _hover={{ background: 'hoverColor' }}
                            variant="outline"
                            borderRadius={'full'}
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
                            <Menu autoSelect="false">
                                <MenuButton fontSize="md" cursor={'pointer'}>
                                    <BsThreeDotsVertical fontSize={'20px'} />
                                </MenuButton>
                                <MenuList zIndex={'1000'} minW="20px" mt={'8px'} fontSize={'0.875rem'}>
                                    {!!user.id && (
                                        <>
                                            <MenuItem
                                                onClick={() => playlistDispatch({ type: 'ShowAddSong', payload: id })}
                                            >
                                                Add playlist
                                            </MenuItem>

                                            <MenuItem onClick={() => {}}>Report</MenuItem>
                                        </>
                                    )}
                                    <MenuItem display={['initial', 'initial', 'none']} onClick={download}>
                                        Download
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default MusicPageHeader;
