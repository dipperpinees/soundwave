import { AspectRatio, Box, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AiFillHeart, AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import {
    MdDeleteOutline,
    MdDownload,
    MdModeEditOutline,
    MdOutlineContentCopy,
    MdOutlineLibraryAdd,
    MdOutlineMoreHoriz,
    MdPlaylistAdd,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import defaultPreview from '../../assets/song_preview.jpg';
import { UserContext } from '../../stores';
import { PlayerContext } from '../../stores/playerStore';
import { PlaylistContext } from '../../stores/playlistStore';

export default function SongPreview({ song, isOwner, onDelete, onEdit }) {
    const [showPlay, setShowPlay] = useState(false);
    const [{ songList, indexSongPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);
    const user = useContext(UserContext)[0];
    const playlistDispatch = useContext(PlaylistContext)[1];
    const addAndPlay = () => setPlayer({ type: 'Add', payload: song });

    const togglePlay = () => setPlayer({ type: 'Toggle' });

    const isPlayThisSong = song.id === songList[indexSongPlayed]?.id;
    const showPauseIcon = song.id === songList[indexSongPlayed]?.id && isPlayed;

    const download = () => window.open(song.url.replace('/upload/', '/upload/fl_attachment/'), '_blank');

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
                {showPlay && (
                    <Flex position="absolute" bottom={1} right={1} gap={1} align="center">
                        <Icon as={AiFillHeart} fontSize={12} />
                        <Icon as={MdPlaylistAdd} />
                        <Menu>
                            <MenuButton>
                                <Icon as={MdOutlineMoreHoriz} display="flex" />
                            </MenuButton>
                            <MenuList minWidth={24} bgColor="blackAlpha.900" border="none" fontSize={12} marginTop={-3}>
                                <MenuItem
                                    _focus={{ color: 'var(--primary-color)' }}
                                    _active={{}}
                                    _hover={{}}
                                    padding="2px 8px"
                                    onClick={download}
                                >
                                    <Icon as={MdDownload} marginRight={1} />
                                    Download
                                </MenuItem>
                                <MenuItem
                                    _focus={{ color: 'var(--primary-color)' }}
                                    _active={{}}
                                    _hover={{}}
                                    padding="2px 8px"
                                >
                                    <Icon as={MdOutlineContentCopy} marginRight={1} />
                                    Copy link
                                </MenuItem>
                                {!!user.id && (
                                    <MenuItem
                                        _focus={{ color: 'var(--primary-color)' }}
                                        _active={{}}
                                        _hover={{}}
                                        padding="2px 8px"
                                        onClick={() => playlistDispatch({ type: 'ShowAddSong', payload: song.id })}
                                    >
                                        <Icon as={MdOutlineLibraryAdd} marginRight={1} />
                                        Add to playlist
                                    </MenuItem>
                                )}
                            </MenuList>
                        </Menu>
                    </Flex>
                )}
            </Box>

            <Flex direction="column" mt={1}>
                {!isOwner && (
                    <Text fontSize={14} fontWeight={600}>
                        {song.title}
                    </Text>
                )}
                {isOwner && (
                    <Flex justify="space-between">
                        <Text fontSize={14} fontWeight={600}>
                            {song.title}
                        </Text>
                        <Menu>
                            <MenuButton>
                                <Icon as={FiEdit} display="flex" fontSize={20} />
                            </MenuButton>
                            <MenuList minWidth={24} bgColor="blackAlpha.900" border="none" fontSize={12}>
                                <MenuItem
                                    _focus={{ color: 'var(--primary-color)' }}
                                    _active={{}}
                                    padding="2px 8px"
                                    onClick={onEdit}
                                    _hover={{}}
                                >
                                    <Icon as={MdModeEditOutline} marginRight={1} />
                                    Edit
                                </MenuItem>
                                <MenuItem
                                    _focus={{ color: 'var(--primary-color)' }}
                                    _active={{}}
                                    _hover={{}}
                                    padding="2px 8px"
                                    onClick={onDelete}
                                >
                                    <Icon as={MdDeleteOutline} marginRight={1} />
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                )}
                {!isOwner && (
                    <Text as="span" fontSize={11} color="gray" fontWeight={600}>
                        <Link to={`/profile/${song.author.id}`}>{song.author.name}</Link>
                    </Text>
                )}
            </Flex>
        </Box>
    );
}
