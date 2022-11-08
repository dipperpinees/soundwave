import { Icon } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { BsSoundwave } from 'react-icons/bs';
import { IoIosPersonAdd, IoMdPeople } from 'react-icons/io';

export default function MdArtist({name, avatar, followerNumber, trackNumber}) {
    return (
        <Flex align="center" justify="space-between" my={2} width="100%">
            <Flex align="center" gap={1}>
                <Avatar name={name} src={avatar} size="lg" />
                <Stack>
                    <Text fontSize={14}>{name}</Text>
                    <Flex fontSize={12}>
                        <Icon as={IoMdPeople} fontSize={16} mr={1} /> {followerNumber}
                        <Icon as={BsSoundwave} fontSize={16} ml={2} mr={1} /> {trackNumber}
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
