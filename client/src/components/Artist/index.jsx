import { Icon } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { BsSoundwave } from 'react-icons/bs';
import { IoIosPersonAdd, IoMdPeople } from 'react-icons/io';

export default function Artist() {
    return (
        <Flex align="center" justify="space-between" my={2}>
            <Flex align="center" gap={1}>
                <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" size="lg" />
                <Stack>
                    <Text>TINLE</Text>
                    <Flex fontSize={12}>
                        <Icon as={IoMdPeople} fontSize={16} mr={1} /> 11.2K
                        <Icon as={BsSoundwave} fontSize={16} ml={2} mr={1} /> 24
                    </Flex>
                </Stack>
            </Flex>
            <Button
                size="xs"
                variant="outline"
                _hover={{ color: 'var(--primary-color)' }}
                flex
                alignItems="center"
                gap={1}
            >
                <IoIosPersonAdd />
                Follow
            </Button>
        </Flex>
    );
}
