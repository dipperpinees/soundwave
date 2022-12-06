import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Flex,
    Icon,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import useUsers from '../../hooks/useUsers';
import fetchAPI from '../../utils/fetchAPI';
import formatDate from '../../utils/formatDate';

export default function UserAdmin() {
    const { data: users } = useUsers("");
    const [selected, setSelected] = useState({});

    const handleCheck = (isChecked, id) => {
        selected[id] = isChecked;
        setSelected({ ...selected });
    };

    return (
        <>
            <Button marginLeft={'auto'}>
                <Icon as={MdDelete} />
                Delete
            </Button>
            <Box borderWidth={1} borderRadius={12}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>
                                    <Checkbox
                                        onChange={(e) => {
                                            users?.data.forEach(({ id }) => {
                                                selected[id] = e.target.checked;
                                            });
                                            setSelected({ ...selected });
                                        }}
                                    ></Checkbox>
                                </Th>
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
            <Td>
                <Checkbox onChange={(e) => handleCheck(e.target.checked, id)} isChecked={isChecked}></Checkbox>
            </Td>
            <Td>
                <Flex align="center" gap={2}>
                    <Avatar colorScheme={name} name="Uchiha kakashi" src={avatar} /> {name}
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
