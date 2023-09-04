import {
    AspectRatio,
    Box,
    Flex,
    Icon,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useToast,
} from '@chakra-ui/react';
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
    MdPlaylistAdd,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import waveGif from '../../assets/animated.gif';
import defaultPreview from '../../assets/song_preview.jpg';
import { UserContext } from '../../stores';
import { PlayerContext } from '../../stores/playerStore';
import { PlaylistContext } from '../../stores/playlistStore';
import fetchAPI from '../../utils/fetchAPI';

export default function SongPreview({ song, isOwner, onDelete, onEdit, onUnlike }) {
    const [isLiked, setIsLiked] = useState(song.isLiked);
    const [{ songPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);
    const user = useContext(UserContext)[0];
    const playlistDispatch = useContext(PlaylistContext)[1];
    const toast = useToast();
    const addAndPlay = () => setPlayer({ type: 'Add', payload: song });
    const togglePlay = () => setPlayer({ type: 'Toggle' });
    const isPlayThisSong = song.id === songPlayed?.id;
    const showPauseIcon = song.id === songPlayed?.id && isPlayed;
    const download = () => window.open(song.url.replace('/upload/', '/upload/fl_attachment/'), '_blank');

    const likeSong = async () => {
        try {
            if (isLiked && onUnlike) onUnlike();
            setIsLiked(!isLiked);
            await fetchAPI(`/song/like/${song.id}`, {
                method: isLiked ? 'DELETE' : 'POST',
            });
        } catch (e) {}
    };

    const addToNextUp = () => {
        setPlayer({ type: 'AddToNextUp', payload: song });
        toast({
            position: 'top-right',
            title: `Add ${song.title} to Next-Up successfully.`,
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <Box width="100%">
            <Box position="relative" className="song-preview-thumbnail">
                <Link to={`/music/${song.id}`}>
                    <AspectRatio width="100%" ratio={1}>
                        <Image
                            objectFit="cover"
                            src={song.thumbnail || defaultPreview}
                            alt={song.title}
                            borderRadius={16}
                        />
                    </AspectRatio>
                </Link>
                <div className="song-preview-control">
                    <Icon
                        bgColor="var(--primary-color)"
                        width={12}
                        height={12}
                        padding={2}
                        color="#201725"
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
                        <Icon
                            as={AiFillHeart}
                            color={isLiked ? 'tomato' : 'white'}
                            fontSize="1rem"
                            onClick={likeSong}
                        />
                        <Icon as={MdPlaylistAdd} onClick={addToNextUp} fontSize="1.25rem" />
                        <Menu strategy="fixed" fontSize="1.25rem">
                            <MenuButton>
                                <Icon as={MdOutlineMoreHoriz} display="flex" />
                            </MenuButton>
                            <MenuList border="none" fontSize="0.75rem" marginTop={-3} minWidth={36}>
                                <MenuItem padding="2px 8px" onClick={download}>
                                    <Icon as={MdDownload} marginRight={1} />
                                    Download
                                </MenuItem>
                                <MenuItem padding="2px 8px">
                                    <Icon as={MdOutlineContentCopy} marginRight={1} />
                                    Copy link
                                </MenuItem>
                                {!!user.id && (
                                    <MenuItem
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
                        <Link to={`/music/${song.id}`}>
                            {isPlayThisSong && isPlayed && <Image width={3} mr={1} src={waveGif} display="inline" />}
                            {song.title}
                        </Link>
                    </Text>
                )}
                {isOwner && (
                    <Flex justify="space-between">
                        <Text fontSize="0.875rem" fontWeight={600} className="one-line-title">
                            <Link to={`/music/${song.id}`}>{song.title}</Link>
                        </Text>
                        <Menu>
                            <MenuButton>
                                <Icon as={FiEdit} display="flex" fontSize="1.5rem" />
                            </MenuButton>
                            <MenuList minWidth={24} maxWidth={30} fontSize="0.75rem" border="none">
                                <MenuItem padding="2px 8px" onClick={onEdit} _hover={{}}>
                                    <Icon as={MdModeEditOutline} marginRight={1} />
                                    Edit
                                </MenuItem>
                                <MenuItem padding="2px 8px" onClick={onDelete}>
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
