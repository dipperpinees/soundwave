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
    Button,
    Icon,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
export default function SongAdmin() {
    return (
        <>
            <Button marginLeft={"auto"}>
                <Icon as = {MdDelete} />
                Delete
            </Button>
            <Box borderWidth={1} borderRadius={12}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>
                                    <Checkbox></Checkbox>
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
                            <Tr>
                                <Td>
                                    <Checkbox></Checkbox>
                                </Td>
                                <Td>
                                    00001
                                </Td>
                                <Td>song 1</Td>
                                <Td>100</Td>
                                <Td>100</Td>
                                <Td>Pop</Td>
                                <Td>Author</Td>
                                <Td>10/10/2002</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Checkbox></Checkbox>
                                </Td>
                                <Td>
                                    00002
                                </Td>
                                <Td>song 2</Td>
                                <Td>100</Td>
                                <Td>100</Td>
                                <Td>Pop</Td>
                                <Td>Author</Td>
                                <Td>10/10/2002</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Checkbox></Checkbox>
                                </Td>
                                <Td>
                                    00003
                                </Td>
                                <Td>song 3</Td>
                                <Td>100</Td>
                                <Td>100</Td>
                                <Td>Pop</Td>
                                <Td>Author</Td>
                                <Td>10/10/2002</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
