import {
    Avatar,
    Box,
    Button,
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
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import useUsers from '../../hooks/useUsers';
import fetchAPI from '../../utils/fetchAPI';
import formatDate from '../../utils/formatDate';

export default function UserAdmin() {
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState('lastest');
    const { data: users } = useUsers(`limit=9999999&orderBy=${orderBy}&search=${search}`);
    const [selected, setSelected] = useState({});
    const debounce = useRef();

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

    return (
        <>
            <Flex justifyContent="end" gap={4} mb={4}>
                <InputGroup width={360}>
                    <InputLeftElement pointerEvents="none" children={<BiSearchAlt color="gray.300" />} />
                    <Input placeholder="Search" onChange={handleSearch} />
                </InputGroup>
                <Select width={180} className="select-white" onChange={handleSort}>
                    <option value="lastest">Lastest</option>
                    <option value="follow">Most followers</option>
                    <option value="track">Most tracks</option>
                </Select>
            </Flex>
            <Box borderWidth={1} borderRadius={12}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                {/* <Th>
                                    <Checkbox
                                        onChange={(e) => {
                                            users?.data.forEach(({ id }) => {
                                                selected[id] = e.target.checked;
                                            });
                                            setSelected({ ...selected });
                                        }}
                                    ></Checkbox>
                                </Th> */}
                                <Th>ID</Th>
                                <Th>User</Th>
                                <Th>Number of songs</Th>
                                <Th>Followers</Th>
                                <Th>Followings</Th>
                                <Th>Join Date</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users?.data.map((user) => (
                                <Row key={user.id} {...{ ...user, handleCheck, isChecked: !!selected[user.id] }} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

const Row = ({
    id,
    name,
    avatar,
    followerNumber,
    followingNumber,
    trackNumber,
    createdAt,
    isBanned: _isBanned,
    handleCheck,
    isChecked,
}) => {
    const [isBanned, setIsBanned] = useState(_isBanned);
    const toggleBan = async () => {
        setIsBanned(!isBanned);
        await fetchAPI(`/admin/ban/${id}`, {
            method: isBanned ? 'DELETE' : 'POST',
        });
    };

    return (
        <Tr key={id}>
            {/* <Td>
                <Checkbox onChange={(e) => handleCheck(e.target.checked, id)} isChecked={isChecked}></Checkbox>
            </Td> */}
            <Td>{id}</Td>
            <Td>
                <Flex align="center" gap={2}>
                    <Avatar name={name} src={avatar} /> {name}
                </Flex>
            </Td>
            <Td>{trackNumber}</Td>
            <Td>{followerNumber}</Td>
            <Td>{followingNumber}</Td>
            <Td>{formatDate(createdAt)}</Td>
            <Td>
                {isBanned ? (
                    <Button onClick={toggleBan}>Unban</Button>
                ) : (
                    <Button colorScheme="red" onClick={toggleBan}>
                        Ban
                    </Button>
                )}
            </Td>
        </Tr>
    );
};
