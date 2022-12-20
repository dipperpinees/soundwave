import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
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
import useDeleteSong from '../../hooks/useDeleteSong';
import useUpdateSong from '../../hooks/useUpdateSong';
import useUserSongs from '../../hooks/useUserSongs';
import { GenreContext, UserContext } from '../../stores';
import { LoadingContext } from '../../stores/loadingStore';
import { DEFAULT_SONG_THUMBNAIL } from '../../utils/image';
import Pagination from '../Pagination';
import SongPreview from '../SongPreview';
import SongSkeleton from '../SquareSkeleton';

export default function SongsLibrary() {
    const user = useContext(UserContext)[0];
    const [editedTrack, setEditedTrack] = useState(null);
    const [deleteTrack, setDeleteTrack] = useState(null);
    const { data: tracks } = useUserSongs(user.id);
    const { mutate: deleteSong } = useDeleteSong();
    const [paginate, setPaginate] = useState({ page: 1, totalPages: 1 });

    useEffect(() => {
        if (tracks) {
            setPaginate({ page: 1, totalPages: Math.ceil(tracks.length / 12) });
        }
    }, [tracks]);

    return (
        <>
            <Text as="h3" fontSize="1.25rem" fontWeight={600} mb={1}>
                Songs Library
            </Text>
            <Grid
                templateColumns={{
                    base: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(4, minmax(0, 1fr))',
                    lg: 'repeat(6, minmax(0, 1fr))',
                }}
                gap={6}
            >
                {!tracks
                    ? [...Array(12).keys()].map((id) => <SongSkeleton key={id} />)
                    : tracks
                          .slice(12 * (paginate.page - 1), 12 * (paginate.page - 1) + 12)
                          .map((song) => (
                              <SongPreview
                                  key={song.id}
                                  song={song}
                                  isOwner={true}
                                  onDelete={() => setDeleteTrack(song.id)}
                                  onEdit={() => setEditedTrack(song)}
                              />
                          ))}
            </Grid>
            {tracks?.length === 0 && <Text>You haven't uploaded any songs yet</Text>}
            {editedTrack && <EditTrack editedTrack={editedTrack} onClose={() => setEditedTrack(null)} />}
            {deleteTrack && (
                <DeleteTrackAlert onClose={() => setDeleteTrack(null)} onDelete={() => deleteSong(deleteTrack)} />
            )}
            {paginate.totalPages > 1 && (
                <Pagination
                    onChangePage={(page) => setPaginate({ ...paginate, page })}
                    paginator={{
                        totalPages: paginate.totalPages,
                        page: paginate.page,
                    }}
                />
            )}
        </>
    );
}

const DeleteTrackAlert = ({ onClose, onDelete }) => {
    return (
        <AlertDialog isOpen={true} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent bgColor="blackAlpha.800" color="white">
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Track
                    </AlertDialogHeader>

                    <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onClose} color="black">
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                onDelete();
                                onClose();
                            }}
                            ml={3}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

const EditTrack = ({ editedTrack, onClose, onUpdate }) => {
    const [title, setTitle] = useState(editedTrack.title);
    const [genre, setGenre] = useState(editedTrack.genre?.id);
    const [thumbnail, setThumbnail] = useState({ src: editedTrack.thumbnail });
    const [isChanged, setIsChanged] = useState({});
    const toast = useToast();
    const setLoading = useContext(LoadingContext)[1];
    const [genres] = useContext(GenreContext);
    const mutation = useUpdateSong();

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
            await mutation.mutate(
                { id: editedTrack.id, formData },
                {
                    onSettled: onClose,
                }
            );
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
                    <Flex
                        justifyContent="space-between"
                        gap={8}
                        mb={8}
                        align="center"
                        direction={{ base: 'column', sm: 'row' }}
                    >
                        <Box
                            position="relative"
                            _hover={{ opacity: 0.6, cursor: 'pointer' }}
                            onClick={handleChangeThumbnail}
                        >
                            <Image
                                src={thumbnail.src || DEFAULT_SONG_THUMBNAIL}
                                boxSize="136px"
                                borderRadius={8}
                                objectFit="cover"
                                alt="Dan Abramov"
                            />
                            <Center position="absolute" top={0} bottom={0} left={0} right={0}>
                                <AiFillCamera fontSize="1.5rem" />
                            </Center>
                        </Box>
                        <Stack flex={1} width={{ base: '100%', sm: 'auto' }}>
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
