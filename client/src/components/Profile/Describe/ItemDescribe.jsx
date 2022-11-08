import { Box, Text, ListItem, Flex } from '@chakra-ui/react';

const ItemDescribe = ({ name, amount }) => {
    return (
        <ListItem>
            <Flex justify={'space-between'}>
                <Text>{name}</Text>
                <Box>{amount}</Box>
            </Flex>
        </ListItem>
    );
};

export default ItemDescribe;
