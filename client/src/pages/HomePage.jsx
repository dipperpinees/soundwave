import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
import { MdArtist } from '../components/Artist';
import ListSongPreview from '../components/ListSongPreview';
import fetchAPI from '../utils/fetchAPI';

export default function HomePage() {
    const [lastestSongs, setLastestSongs] = useState(null);
    const [userList, setUserList] = useState(null);
    const [mostStreamedSong, setMostStreamedSong] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetchAPI('/song/?limit=4');
                setLastestSongs(data);
            } catch (e) {
                console.error(e.message);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetchAPI('/user/?limit=4');
                setUserList(data);
            } catch (e) {
                console.error(e.message);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetchAPI('/song/?limit=4&orderBy=listen');
                setMostStreamedSong(data);
            } catch (e) {
                console.error(e.message);
            }
        })();
    }, [])
    
    return (
        <Flex className="home-page" color="white" gap={4} direction={{ base: 'column', md: 'row' }} px={{base: 6, md: 0}}>
            <Box flex={3}>
                <ListSongPreview songs={lastestSongs} title="Lastest songs" moreUrl="/search" />
                <ListSongPreview songs={mostStreamedSong} title="Most streamed songs" moreUrl="/search?order=listen" />
            </Box>
            <Flex flex={1} py={4} px={{base: 0, md: 6}} direction="column">
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
