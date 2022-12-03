import { Text, Flex } from '@chakra-ui/react';

const ItemDescribe = ({ name, amount }) => {
    return (
        <Flex flex={['50%', '33.33%', '100%']} justify={'space-between'}>
            <Text w={['100px', '100px', '100px']}>{name}</Text>
            <Flex flex={1} ml="auto" justify={['start', 'start', 'end']}>
                {amount}
            </Flex>
        </Flex>
    );
};

export default ItemDescribe;
