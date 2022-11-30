import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Checkbox,
    Avatar,
    Flex,
} from '@chakra-ui/react';

export default function UserAdmin() {
    return (
        <>
            <Box borderWidth={1} borderRadius={12}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>
                                    <Checkbox></Checkbox>
                                </Th>
                                <Th>User</Th>
                                <Th>Description</Th>
                                <Th>Number of songs</Th>
                                <Th>Followers</Th>
                                <Th>Followings</Th>
                                <Th>Join Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <Checkbox></Checkbox>
                                </Td>
                                <Td>
                                    <Flex align="center" gap={2}>
                                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" /> Nguyen van a
                                    </Flex>
                                </Td>
                                <Td>description</Td>
                                <Td>1</Td>
                                <Td>1</Td>
                                <Td>1</Td>
                                <Td>8/10/2020</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Checkbox></Checkbox>
                                </Td>
                                <Td>
                                    <Flex align="center" gap={2}>
                                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" /> Nguyen van a
                                    </Flex>
                                </Td>
                                <Td>description</Td>
                                <Td>1</Td>
                                <Td>1</Td>
                                <Td>1</Td>
                                <Td>8/10/2020</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Checkbox></Checkbox>
                                </Td>
                                <Td>
                                    <Flex align="center" gap={2}>
                                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" /> Nguyen van a
                                    </Flex>
                                </Td>
                                <Td>description</Td>
                                <Td>1</Td>
                                <Td>1</Td>
                                <Td>1</Td>
                                <Td>8/10/2020</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
