import { AspectRatio, Box, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline, MdModeEditOutline, MdPause, MdPlayArrow } from 'react-icons/md';
import { PlayerContext } from '../../stores';
import { DEFAULT_PLAYLIST_THUMBNAIL } from '../../utils/image';
import { Link } from 'react-router-dom';

export default function PlaylistPreview({ id, name, songs, onDelete, thumbnail, showSettings, author }) {
    const [showPlay, setShowPlay] = useState(false);
    const [{ isPlayed, playlistID }, dispatch] = useContext(PlayerContext);

    const playPlaylist = () => dispatch({ type: 'PlayPlaylist', payload: { id, songs } });

    const togglePlay = () => dispatch({ type: 'Toggle' });

    return (
        <Box width="100%">
            <Box
                position="relative"
                _hover={{ cursor: 'pointer' }}
                onMouseEnter={() => setShowPlay(true)}
                onMouseLeave={() => setShowPlay(false)}
            >
                 <Link to={`/playlist/${id}`}>
                <AspectRatio width="100%" ratio={1}>
                    <Image
                        objectFit="cover"
                        src={thumbnail || DEFAULT_PLAYLIST_THUMBNAIL}
                        alt={name}
                        borderRadius={16}
                    />
                </AspectRatio>
                </Link>
                {showPlay && (
                    <Icon
                        bgColor="var(--primary-color)"
                        fontSize="3.75rem"
                        position="absolute"
                        top="50%"
                        left="50%"
                        width={12}
                        height={12}
                        padding={2}
                        as={playlistID === id && isPlayed ? MdPause : MdPlayArrow}
                        transform="translate(-50%, -50%)"
                        borderRadius="50%"
                        onClick={playlistID === id ? togglePlay : playPlaylist}
                    />
                )}
            </Box>
            <Flex direction="column" mt={1}>
                <Flex justify="space-between">
                    <Link to={`/playlist/${id}`}>
                        <Text fontSize="0.875rem" fontWeight={600} className="one-line-title">
                            {name}
                        </Text>
                    </Link>
                    {showSettings && (
                        <Menu>
                            <MenuButton>
                                <Icon as={FiEdit} display="flex" fontSize="1.25rem" />
                            </MenuButton>
                            <MenuList minWidth={24} border="none" fontSize="0.75rem">
                                <MenuItem padding="2px 8px">
                                    <Icon as={MdModeEditOutline} marginRight={1} />
                                    Edit
                                </MenuItem>
                                <MenuItem padding="2px 8px" onClick={() => onDelete(id)}>
                                    <Icon as={MdDeleteOutline} marginRight={1} />
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </Flex>
                {/* <Text fontSize="0.75rem" fontWeight={600} color="whiteAlpha.700" as="span">HIep Nguyen</Text> */}
                <Text fontSize="0.75rem" fontWeight={600} color="whiteAlpha.700" as="span">
                    {author?.name} • {songs.length} songs
                </Text>
            </Flex>
        </Box>
    );
}
