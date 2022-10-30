import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
import Artist from '../components/Artist';
import ListSongPreview from '../components/ListSongPreview';
import { API_ENDPOINT } from '../config';

export default function HomePage() {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        (async () => {
            const { data } = await fetch(API_ENDPOINT + '/song/').then((response) => response.json());
            setSongs(data);
        })();
    }, []);
    return (
        <Flex className="home-page" color="white" gap={4}>
            <Box flex={3}>
                <ListSongPreview songs={songs} />
                <ListSongPreview songs={songs} />
                <ListSongPreview songs={songs} />
                <ListSongPreview songs={songs} />
                <ListSongPreview songs={songs} />
            </Box>
            <Flex flex={1} padding="24px 16px" direction="column">
                <Flex align="center" gap={2}>
                    <Icon as={IoMdPeople} fontSize={24} /> <Text>Artists you should follow</Text>
                </Flex>
                <Divider my={2} borderColor="gray" />
                <Artist />
                <Artist />
                <Artist />
            </Flex>
        </Flex>
    );
}
