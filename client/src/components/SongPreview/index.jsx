import { AspectRatio, Box, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import {
    MdDeleteOutline,
    MdDownload,
    MdModeEditOutline,
    MdOutlineContentCopy,
    MdOutlineLibraryAdd,
    MdOutlineMoreHoriz,
    MdPause,
    MdPlayArrow,
    MdPlaylistAdd
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import waveGif from "../../assets/animated.gif";
import defaultPreview from '../../assets/song_preview.jpg';
import { UserContext } from '../../stores';
import { PlayerContext } from '../../stores/playerStore';
import { PlaylistContext } from '../../stores/playlistStore';
import fetchAPI from '../../utils/fetchAPI';

export default function SongPreview({ song, isOwner, onDelete, onEdit, onUnlike }) {
    const [isLiked, setIsLiked] = useState(song.isLiked);
    const [{ songList, indexSongPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);
    const user = useContext(UserContext)[0];
    const playlistDispatch = useContext(PlaylistContext)[1];

    const addAndPlay = () => setPlayer({ type: 'Add', payload: song });
    const togglePlay = () => setPlayer({ type: 'Toggle' });
    const isPlayThisSong = song.id === songList[indexSongPlayed]?.id;
    const showPauseIcon = song.id === songList[indexSongPlayed]?.id && isPlayed;
    const download = () => window.open(song.url.replace('/upload/', '/upload/fl_attachment/'), '_blank');

    const likeSong = async () => {
        try {
            if (isLiked && onUnlike) onUnlike() 
            setIsLiked(!isLiked);
            await fetchAPI(`/song/like/${song.id}`, {
                method: isLiked ? 'DELETE' : 'POST',
            });
        } catch (e) {}
    };

    return (
        <Box width="100%">
            <Box position="relative" className="song-preview-thumbnail">
                <AspectRatio width="100%" ratio={1}>
                    <Image
                        objectFit="cover"
                        src={song.thumbnail || defaultPreview}
                        alt={song.title}
                        borderRadius={16}
                    />
                </AspectRatio>
                <div className="song-preview-control">
                    <Icon
                        bgColor="var(--primary-color)"
                        width={12}
                        height={12}
                        padding={2}
                        color="white"
                        as={showPauseIcon ? MdPause : MdPlayArrow}
                        fontSize="3.75rem"
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        borderRadius="50%"
                        onClick={isPlayThisSong ? togglePlay : addAndPlay}
                    />
                    <Flex position="absolute" bottom={1} right={1} gap={1} align="center">
                        <Icon as={AiFillHeart} color={isLiked ? 'tomato' : 'white'} fontSize="0.75rem" onClick={likeSong} />
                        <Icon as={MdPlaylistAdd} />
                        <Menu strategy="fixed">
                            <MenuButton>
                                <Icon as={MdOutlineMoreHoriz} display="flex" />
                            </MenuButton>
                            <MenuList bgColor="blackAlpha.900" border="none" fontSize="0.75rem" marginTop={-3} minWidth={36}>
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
                </div>
            </Box>
            <Flex direction="column" mt={1}>
                {!isOwner && (
                    <Text fontSize="0.875rem" fontWeight={600} className="one-line-title">
                        {isPlayThisSong && <Image width={3} mr={1} src={waveGif} display="inline"/>}
                        {song.title}
                    </Text>
                )}
                {isOwner && (
                    <Flex justify="space-between">
                        <Text fontSize="0.875rem" fontWeight={600} className="one-line-title">
                            {song.title}
                        </Text>
                        <Menu>
                            <MenuButton>
                                <Icon as={FiEdit} display="flex" fontSize="1.5rem" />
                            </MenuButton>
                            <MenuList minWidth={24} maxWidth={30} bgColor="blackAlpha.900" border="none" fontSize="0.75rem">
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
                    <Text as="span" fontSize="0.75rem" color="gray" fontWeight={600}>
                        <Link to={`/profile/${song.author.id}`}>{song.author.name}</Link>
                    </Text>
                )}
            </Flex>
        </Box>
    );
}
