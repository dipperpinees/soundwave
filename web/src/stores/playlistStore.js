import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    useToast,
    Checkbox,
    Stack,
    Spinner,
    Flex,
    AspectRatio,
    Image,
    Center,
    Box,
} from '@chakra-ui/react';
import fetchAPI from '../utils/fetchAPI';
import { UserContext } from './userStore';
import { AiFillCamera } from 'react-icons/ai';
import { DEFAULT_PLAYLIST_THUMBNAIL } from '../utils/image';
import { LoadingContext } from './loadingStore';

const initialState = {
    playlists: [],
    isShow: false,
    type: 'add', //add or create
    isBack: false,
    songID: 0,
};
export const PlaylistContext = createContext(initialState);

export function PlaylistStore({ children }) {
    const user = useContext(UserContext)[0];
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'UpdatePlaylist': {
                return { ...state, playlists: action.payload };
            }
            case 'ShowCreate': {
                return { ...state, type: 'create', isShow: true, isBack: action.payload.isBack };
            }
            case 'ShowAddSong': {
                return { ...state, type: 'add', isShow: true, songID: action.payload };
            }
            case 'Close': {
                return { ...state, isShow: false };
            }
            default:
                return state;
        }
    }, initialState);
    const { isShow, type, isBack, songID } = state;
    return (
        <PlaylistContext.Provider value={[state, dispatch]}>
            {isShow && (
                <>
                    {type === 'add' && user.id && (
                        <AddSongPlaylist
                            userID={user?.id}
                            showCreatePlaylist={() => dispatch({ type: 'ShowCreate', payload: { isBack: true } })}
                            songID={songID}
                            onClose={() => dispatch({ type: 'Close' })}
                        />
                    )}
                    {type === 'create' && (
                        <CreatePlaylist
                            isBack={isBack}
                            showAddSong={() => dispatch({ type: 'ShowAddSong', payload: songID })}
                            onClose={() => dispatch({ type: 'Close' })}
                        />
                    )}
                </>
            )}
            {children}
        </PlaylistContext.Provider>
    );
}

const CreatePlaylist = ({ onClose, showAddSong, isBack }) => {
    const [name, setName] = useState('');
    const toast = useToast();
    const [thumbnail, setThumbnail] = useState({ src: '', file: null });
    const thumbnailRef = useRef();
    const setLoading = useContext(LoadingContext)[1];

    const submit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            if (thumbnail.src) formData.append('thumbnail', thumbnailRef.current.files[0]);
            formData.append('name', name);
            await fetchAPI('/playlist/', {
                method: 'POST',

                body: formData,
            });
            setLoading(false);
            toast({
                title: 'Create playlist successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            isBack ? showAddSong() : onClose();
        } catch (e) {
            setLoading(false);
            toast({
                title: e.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleChangeThumbnail = (e) => {
        const file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            setThumbnail({ src: this.result, file });
        };
        reader.readAsDataURL(file);
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bgColor="black" color="white">
                <ModalHeader>Playlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" flexDirection="column" alignItems="center" gap={4}>
                    <Box
                        position="relative"
                        _hover={{ opacity: 0.6, cursor: 'pointer' }}
                        onClick={() => thumbnailRef.current.click()}
                    >
                        <AspectRatio width="180px" ratio={1}>
                            <Image
                                src={thumbnail.src || DEFAULT_PLAYLIST_THUMBNAIL}
                                boxSize="180px"
                                borderRadius={8}
                                objectFit="cover"
                                alt="thumbnail"
                            />
                        </AspectRatio>
                        <Center position="absolute" top={0} bottom={0} left={0} right={0}>
                            <AiFillCamera fontSize="1.5rem" />
                        </Center>
                    </Box>
                    <Input
                        type="file"
                        display="none"
                        accept="image/*"
                        onChange={handleChangeThumbnail}
                        ref={thumbnailRef}
                    />
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Playlist name"
                        required
                    />
                </ModalBody>

                <ModalFooter>
                    {isBack && (
                        <Button variant="ghost" _hover={{}} _active={{}} onClick={showAddSong}>
                            Back
                        </Button>
                    )}
                    <Button colorScheme="primary" mr={3} onClick={submit}>
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

const AddSongPlaylist = ({ onClose, songID, userID, showCreatePlaylist }) => {
    const [playlists, setPlaylists] = useState(null);
    const [changeData, setChangeData] = useState({});
    const toast = useToast();

    useEffect(() => {
        (async () => {
            try {
                const playlists = await fetchAPI(`/user/${userID}/playlists`);
                playlists.forEach((playlist) => {
                    playlist.isChecked = false;
                    if (!!playlist.songs.find(({ id }) => id === songID)) playlist.isChecked = true;
                });
                setPlaylists(playlists);
            } catch (e) {}
        })();
    }, [userID, songID]);

    const handleChange = (playlistID, isChecked) => {
        if (playlists.find(({ id }) => id === playlistID)?.isChecked === isChecked) {
            setChangeData(() => {
                const newChangeData = { ...changeData };
                delete newChangeData[playlistID];
                return newChangeData;
            });
            return;
        }
        setChangeData({ ...changeData, [playlistID]: isChecked });
    };

    const submit = async () => {
        try {
            await Promise.all(
                Object.keys(changeData).map((key) => {
                    return fetchAPI(`/playlist/${key}/songs`, {
                        method: changeData[key] ? 'POST' : 'DELETE',
                        body: JSON.stringify({ songID }),
                    });
                })
            );
            toast({
                title: 'Add song to playlist successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onClose();
        } catch (e) {
            toast({
                title: e.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bgColor="black" color="white">
                <ModalHeader>Add song to playlist</ModalHeader>
                <ModalCloseButton />
                {playlists ? (
                    <>
                        <ModalBody>
                            <Stack>
                                {playlists.map(({ id, name, isChecked }) => (
                                    <Checkbox
                                        name="checkbox"
                                        key={id}
                                        defaultChecked={isChecked}
                                        onChange={(e) => handleChange(id, e.target.checked)}
                                    >
                                        {name}
                                    </Checkbox>
                                ))}
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="ghost" _hover={{}} color="#fff" _active={{}} onClick={showCreatePlaylist}>
                                Create new playlist
                            </Button>
                            <Button
                                colorScheme="primary"
                                mr={3}
                                type="submit"
                                onClick={submit}
                                disabled={!Object.keys(changeData).length}
                            >
                                Add
                            </Button>
                        </ModalFooter>
                    </>
                ) : (
                    <Flex pt={4} pb={8}>
                        <Spinner size="lg" m="auto" />
                    </Flex>
                )}
            </ModalContent>
        </Modal>
    );
};
