import { Divider, Flex, Icon, Text } from "@chakra-ui/react";
import { IoMdPeople } from "react-icons/io";
import useUsers from "../../hooks/useUsers";
import Artist from "../Artist";

export const RecommendArtist = () => {
    const { data: userList, isLoading } = useUsers('limit=4');
    return (
        <Flex flex={1} py={4} pr={{ base: 0, md: 6 }} direction="column" maxW={{ base: 'auto', lg: '28%' }}>
            <Flex align="center" gap={2}>
                <Icon as={IoMdPeople} fontSize="1.5rem" /> <Text>Artists you should follow</Text>
            </Flex>
            <Divider my={2} borderColor="gray" />
            {!isLoading && userList?.data?.map((user) => <Artist {...user} key={user.id} size="md" />)}
        </Flex>
    );
};