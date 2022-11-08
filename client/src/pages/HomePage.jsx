import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
import { MdArtist } from '../components/Artist';
import ListSongPreview from '../components/ListSongPreview';
import fetchAPI from '../utils/fetchAPI';

export default function HomePage() {
    const [lastestSongs, setLastestSongs] = useState(null);
    const [userList, setUserList] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await fetchAPI("/song/?limit=4");
                setLastestSongs(data);
            } catch (e) {
                console.error(e.message)
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetchAPI("/user/?limit=4");
                setUserList(data);
            } catch (e) {
                console.error(e.message)
            }
        })();
    }, []);

    return (
        <Flex className="home-page" color="white" gap={4}>
            <Box flex={3}>
                <ListSongPreview songs={lastestSongs} title="Lastest Songs" moreUrl="/search"/>
            </Box>
            <Flex flex={1} padding="24px 16px" direction="column">
                <Flex align="center" gap={2}>
                    <Icon as={IoMdPeople} fontSize={24} /> <Text>Artists you should follow</Text>
                </Flex>
                <Divider my={2} borderColor="gray" />
                {userList?.map((user) => (
                    <MdArtist {...user} key={user.id} />
                ))}
            </Flex>
        </Flex>
    );
}
