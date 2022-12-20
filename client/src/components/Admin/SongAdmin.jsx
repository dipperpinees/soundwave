import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Avatar,
    Box,
    Button,
    Checkbox,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import useDeleteSong from '../../hooks/useDeleteSong';
import useSongs from '../../hooks/useSongs';
import fetchAPI from '../../utils/fetchAPI';
import formatDate from '../../utils/formatDate';

export default function SongAdmin() {
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState('lastest');
    const { data: songs, refetch } = useSongs(`limit=9999999&orderBy=${orderBy}&search=${search}`);
    const [selected, setSelected] = useState({});
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const debounce = useRef();
    const toast = useToast();

    const handleCheck = (isChecked, id) => {
        selected[id] = isChecked;
        setSelected({ ...selected });
    };

    const handleSearch = (e) => {
        clearTimeout(debounce.current);
        debounce.current = setTimeout(() => {
            setSearch(e.target.value);
        }, 500);
    };

    const handleSort = (e) => {
        setOrderBy(e.target.value);
    };

    const handleDelete = async () => {
        await Promise.all(Object.keys(selected).map((id) => fetchAPI(`/song/${id}`, { method: 'DELETE' })));
        await refetch();
        setOpenDeleteAlert(false);
        toast({
            title: 'Delete successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <>
            <AlertDialog isOpen={openDeleteAlert} onClose={() => setOpenDeleteAlert(false)}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete songs
                        </AlertDialogHeader>

                        <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClose={() => setOpenDeleteAlert(false)}>Cancel</Button>
                            <Button
                                colorScheme="red"
                                onClose={() => setOpenDeleteAlert(false)}
                                ml={3}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Flex justifyContent="end" gap={4} mb={4}>
                <InputGroup width={360}>
                    <InputLeftElement pointerEvents="none" children={<BiSearchAlt color="gray.300" />} />
                    <Input placeholder="Search" onChange={handleSearch} />
                </InputGroup>
                <Select width={180} className="select-white" onChange={handleSort}>
                    <option value="lastest">Lastest</option>
                    <option value="like">Most likes</option>
                    <option value="listen">Most listens</option>
                </Select>
                <Button
                    colorScheme="red"
                    onClick={() => setOpenDeleteAlert(true)}
                    disabled={!Object.keys(selected).length}
                >
                    Delete
                </Button>
            </Flex>
            <Box borderWidth={1} borderRadius={12}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>
                                    <Checkbox
                                        onChange={(e) => {
                                            songs?.data.forEach(({ id }) => {
                                                selected[id] = e.target.checked;
                                            });
                                            setSelected({ ...selected });
                                        }}
                                    ></Checkbox>
                                </Th>
                                <Th>ID</Th>
                                <Th>Title</Th>
                                <Th>Number of likes</Th>
                                <Th>Number of listens</Th>
                                <Th>Genre</Th>
                                <Th>Author</Th>
                                <Th>Create at</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {songs?.data.map((song) => (
                                <Row
                                    key={song.id}
                                    {...song}
                                    handleCheck={handleCheck}
                                    isChecked={!!selected[song.id]}
                                />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

const Row = ({ id, thumbnail, title, likeNumber, playCount, genre, author, createdAt, handleCheck, isChecked }) => {
    return (
        <Tr key={id}>
            <Td>
                <Checkbox onChange={(e) => handleCheck(e.target.checked, id)} isChecked={isChecked}></Checkbox>
            </Td>
            <Td>{id}</Td>
            <Td>
                <Flex align="center" gap={2}>
                    <Avatar name={title} src={thumbnail} /> {title}
                </Flex>
            </Td>
            <Td>{likeNumber}</Td>
            <Td>{playCount}</Td>
            <Td>{genre.name}</Td>
            <Td>
                <Flex align="center" gap={2}>
                    <Avatar name={author.name} src={author.avatar} /> {author.name}
                </Flex>
            </Td>
            <Td>{formatDate(createdAt)}</Td>
        </Tr>
    );
};
