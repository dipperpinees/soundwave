import { Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { IoMdPeople } from 'react-icons/io';
import useUsers from '../../hooks/useUsers';
import { UserContext } from '../../stores';
import Artist from '../Artist';

export const RecommendArtist = () => {
    const user = useContext(UserContext)[0];
    const { data, isLoading } = useUsers(`limit=${user.id ? 9999999 : 5}&orderBy=follower`, { enabled: user.isAuth });
    let userList = user.id ? data?.data.filter((user) => !user.isFollowed).slice(0, 5) : data?.data;
    return (
        <Flex flex={1} py={4} pr={{ base: 0, md: 6 }} direction="column" maxW={{ base: 'auto', lg: '28%' }}>
            <Flex align="center" gap={2}>
                <Icon as={IoMdPeople} fontSize="1.5rem" /> <Text>Artists you should follow</Text>
            </Flex>
            <Divider my={2} borderColor="gray" />
            {!isLoading && userList?.map((user) => <Artist {...user} key={user.id} size="md" />)}
        </Flex>
    );
};
