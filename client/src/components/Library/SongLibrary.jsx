import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { GenreContext, UserContext } from '../../stores';
import { LoadingContext } from '../../stores/loadingStore';
import { DEFAULT_THUMBNAIL } from '../../utils/constant';
import fetchAPI from '../../utils/fetchAPI';
import SongPreview from '../SongPreview';
import SongSkeleton from '../SquareSkeleton';

export default function SongsLibrary() {
    const user = useContext(UserContext)[0];
    const [tracks, setTracks] = useState(null);
    const [editedTrack, setEditedTrack] = useState(null);

    useEffect(() => {
        if (!user.id) return;
        (async () => {
            try {
                const data = await fetchAPI(`/user/${user.id}/songs`);
                setTracks(data);
            } catch (e) {}
        })();
    }, [user]);

    const updateTrack = (updateID, data = {}) => {
        setTracks(
            tracks.map((track) => {
                if (updateID === track.id) {
                    return { ...track, ...data };
                }
                return track;
            })
        );
    };

    const handleDelete = async (deleteID) => {
        try {
            setTracks(tracks.filter(({ id }) => id !== deleteID));
            await fetchAPI(`/song/${deleteID}`, { method: 'DELETE' });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Text as="h3" fontSize={20} fontWeight={600}>
                Songs Library
            </Text>
            <Grid templateColumns="repeat(6, 1fr)" gap={6}>
                {tracks
                    ? tracks.map((song, id) => (
                          <SongPreview
                              key={id}
                              song={song}
                              isOwner={true}
                              onDelete={() => handleDelete(song.id)}
                              onEdit={() => setEditedTrack(song)}
                          />
                      ))
                    : [...Array(12).keys()].map((id) => <SongSkeleton key={id} />)}
            </Grid>
            {tracks?.length === 0 && <Text>You haven't uploaded any songs or albums yet</Text>}
            {editedTrack && (
                <EditTrack editedTrack={editedTrack} onClose={() => setEditedTrack(null)} onUpdate={updateTrack} />
            )}
        </>
    );
}

const EditTrack = ({ editedTrack, onClose, onUpdate }) => {
    const [title, setTitle] = useState(editedTrack.title);
    const [genre, setGenre] = useState(editedTrack.genre?.id);
    const [thumbnail, setThumbnail] = useState({ src: editedTrack.thumbnail });
    const [isChanged, setIsChanged] = useState({});
    const toast = useToast();
    const setLoading = useContext(LoadingContext)[1];
    const [genres] = useContext(GenreContext);

    const handleChangeThumbnail = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = (e) => {
            const file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function () {
                setThumbnail({ src: this.result, file });
            };
            reader.readAsDataURL(file);
        };
        input.click();
    };

    useEffect(() => {
        setIsChanged(
            title !== editedTrack.title || genre !== editedTrack.genre?.id || thumbnail.src !== editedTrack.thumbnail
        );
    }, [title, genre, thumbnail, editedTrack]);

    const submit = async () => {
        const formData = new FormData();
        if (title !== editedTrack.title) formData.append('title', title);
        if (genre !== editedTrack.genre?.id) formData.append('genreID', genre);
        if (thumbnail.src !== editedTrack.thumbnail) formData.append('thumbnail', thumbnail.file);

        setLoading(true);
        try {
            await fetchAPI(`/song/${editedTrack.id}`, {
                method: 'PUT',
                body: formData,
            });
            toast({
                title: 'Update song successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onUpdate(editedTrack.id, { title, genre: { id: genre }, thumbnail: thumbnail.src });
            onClose();
        } catch (e) {
            toast({
                title: e.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }

        setLoading(false);
    };

    return (
        <Modal isOpen={true} size="xl" onClose={onClose}>
            <ModalOverlay />
            <ModalContent bgColor="blackAlpha.900" color="white">
                <ModalHeader>Edit Song</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex justifyContent="space-between" gap={8} mb={8}>
                        <Box
                            position="relative"
                            _hover={{ opacity: 0.6, cursor: 'pointer' }}
                            onClick={handleChangeThumbnail}
                        >
                            <Image
                                src={thumbnail.src || DEFAULT_THUMBNAIL}
                                boxSize="136px"
                                borderRadius={8}
                                objectFit="cover"
                                alt="Dan Abramov"
                            />
                            <Center position="absolute" top={0} bottom={0} left={0} right={0}>
                                <AiFillCamera fontSize={24} />
                            </Center>
                        </Box>
                        <Stack flex={1}>
                            <Input
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <Select
                                placeholder="Select Genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                required
                            >
                                {genres.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Select>
                            <Button onClick={submit} colorScheme="primary" disabled={!isChanged}>
                                Save
                            </Button>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
