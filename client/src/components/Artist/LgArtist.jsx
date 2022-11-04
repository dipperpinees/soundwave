import { Icon } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { BsSoundwave } from 'react-icons/bs';
import { IoIosPersonAdd, IoMdPeople } from 'react-icons/io';

export default function LgArtist({ name, avatar, followerNumber, trackNumber }) {
    return (
        <Flex align="center" my={2} width="100%">
            <Flex align="center" gap={1}>
                <Avatar name={name} src={avatar} size="2xl" mr={4}/>
                <Stack>
                    <Text fontSize={20}>{name}</Text>
                    <Flex fontSize={12}>
                        <Icon as={IoMdPeople} fontSize={16} mr={1} /> {followerNumber}
                        <Icon as={BsSoundwave} fontSize={16} ml={2} mr={1} /> {trackNumber}
                    </Flex>
                    <Button
                        size="sm"
                        variant="outline"
                        _hover={{ color: 'var(--primary-color)' }}
                        flex
                        alignItems="center"
                        gap={1}
                    >
                        <IoIosPersonAdd />
                        Follow
                    </Button>
                </Stack>
            </Flex>
        </Flex>
    );
}
