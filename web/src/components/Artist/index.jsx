import { Avatar, Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BsCheckCircleFill, BsSoundwave } from 'react-icons/bs';
import { IoIosPersonAdd, IoMdPeople } from 'react-icons/io';
import { MdDone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import fetchAPI from '../../utils/fetchAPI';

export default function Artist({ id, name, avatar, followerNumber, trackNumber, size, isFollowed, isVerified }) {
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
                <Flex align="center" gap={1} overflow="hidden">
                    <Link to={`/profile/${id}`}>
                        <Avatar name={name} src={avatar} size="md" />
                    </Link>
                    <Stack overflow="hidden">
                        <Link to={`/profile/${id}`}>
                            <Flex align="center" gap={1}>
                                <Text fontSize="0.75rem" fontWeight={500} className="one-line-title">
                                    {name}
                                </Text>
                                {isVerified && <Icon as={BsCheckCircleFill} fontSize="0.75rem" />}
                            </Flex>
                        </Link>
                        <Flex fontSize="0.75rem">
                            <Icon as={IoMdPeople} fontSize="1rem" mr={1} /> {followerNumber}
                            <Icon as={BsSoundwave} fontSize="1rem" ml={2} mr={1} /> {trackNumber}
                        </Flex>
                    </Stack>
                </Flex>
                <Button
                    size="xs"
                    variant="outline"
                    alignItems="center"
                    gap={1}
                    onClick={toggleFollow}
                    _hover={{ borderColor: 'var(--primary-color)' }}
                    flex="none"
                    color="#fff"
                >
                    {isFollow ? <MdDone /> : <IoIosPersonAdd />}
                    {isFollow ? 'Following' : 'Follow'}
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
                            <Flex align="center" gap={2}>
                                <Text fontSize={{ base: '1rem', md: '1.25rem' }}>{name}</Text>
                                {isVerified && <Icon as={BsCheckCircleFill} fontSize="1rem" />}
                            </Flex>
                        </Link>
                        <Flex fontSize="0.75rem">
                            <Icon as={IoMdPeople} fontSize="1rem" mr={1} /> {followerNumber}
                            <Icon as={BsSoundwave} fontSize="1rem" ml={2} mr={1} /> {trackNumber}
                        </Flex>
                        <Button
                            size="sm"
                            variant="outline"
                            flex
                            alignItems="center"
                            gap={1}
                            onClick={toggleFollow}
                            width="120px"
                            color="#fff"
                            _hover={{ borderColor: 'var(--primary-color)' }}
                        >
                            {isFollow ? <MdDone /> : <IoIosPersonAdd />}
                            {isFollow ? 'Following' : 'Fđollow'}
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
        );
    }
    return null;
}
