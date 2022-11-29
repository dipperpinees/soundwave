import { Icon } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { BsSoundwave } from 'react-icons/bs';
import { IoIosPersonAdd, IoMdPeople } from 'react-icons/io';
import { Link } from 'react-router-dom';
import fetchAPI from '../../utils/fetchAPI';

export default function Artist({ id, name, avatar, followerNumber, trackNumber, size, isFollowed }) {
    const [isFollow, setIsFollow] = useState(isFollowed);
    const toggleFollow = async () => {
        setIsFollow(!isFollow);
        if (isFollow) {
            await fetchAPI(`/user/unfollow/${id}`, {
                method: 'POST',
            });
        } else {
            await fetchAPI(`/user/follow/${id}`, {
                method: 'POST',
            });
        }
    };
    if (size === 'md') {
        return (
            <Flex align="center" justify="space-between" my={2} width="100%" gap={3}>
                <Flex align="center" gap={1}>
                    <Link to={`/profile/${id}`}>
                        <Avatar name={name} src={avatar} size="lg" />
                    </Link>
                    <Stack>
                        <Link to={`/profile/${id}`}>
                            <Text
                                fontSize={14}
                                width={{ base: 160, md: 36 }}
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                            >
                                {name}
                            </Text>
                        </Link>
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
                    onClick={toggleFollow}
                >
                    <IoIosPersonAdd />
                    {isFollow ? 'Unfollow' : 'Follow'}
                </Button>
            </Flex>
        );
    }
    if (size === 'lg') {
        return (
            <Flex align="center" my={2} width="100%">
                <Flex align="center" gap={1}>
                    <Link to={`/profile/${id}`}>
                        <Avatar name={name} src={avatar} size={{ base: 'xl', md: '2xl' }} mr={4} />
                    </Link>
                    <Stack>
                        <Link to={`/profile/${id}`}>
                            <Text fontSize={{ base: 16, md: 20 }}>{name}</Text>
                        </Link>
                        <Flex fontSize={12}>
                            <Icon as={IoMdPeople} fontSize={16} mr={1} /> {followerNumber}
                            <Icon as={BsSoundwave} fontSize={16} ml={2} mr={1} /> {trackNumber}
                        </Flex>
                        <Button
                            size="sm"
                            variant="outline"
                            _hover={!isFollow && { color: 'var(--primary-color)' }}
                            flex
                            alignItems="center"
                            gap={1}
                            onClick={toggleFollow}
                            width="120px"
                            bgColor={isFollow && 'primary.500'}
                        >
                            <IoIosPersonAdd />
                            {isFollow ? 'Unfollow' : 'Follow'}
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
        );
    }
    return null;
}
