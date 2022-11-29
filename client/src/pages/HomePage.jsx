import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { IoMdPeople } from 'react-icons/io';
import Artist from '../components/Artist/index.';
import ListSongPreview from '../components/ListSongPreview';
import useSongs from '../hooks/useSongs';
import useUsers from '../hooks/useUsers';

export default function HomePage() {
    // const [lastestSongs, setLastestSongs] = useState(null);
    // const [mostStreamedSong, setMostStreamedSong] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data } = await fetchAPI('/song/?limit=4');
    //             setLastestSongs(data);
    //         } catch (e) {
    //             console.error(e.message);
    //         }
    //     })();
    // }, []);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data } = await fetchAPI('/user/?limit=4');
    //             setUserList(data);
    //         } catch (e) {
    //             console.error(e.message);
    //         }
    //     })();
    // }, []);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data } = await fetchAPI('/song/?limit=4&orderBy=listen');
    //             setMostStreamedSong(data);
    //         } catch (e) {
    //             console.error(e.message);
    //         }
    //     })();
    // }, []);

    return (
        <Flex
            className="home-page"
            color="white"
            gap={{ base: 4, lg: 10 }}
            direction={{ base: 'column', lg: 'row' }}
            px={{ base: 6, md: 0 }}
        >
            <Box flex={3} pr={{ base: 0, md: 6, xl: 0 }}>
                <LastestSongs />
                <MostStreamedSong />
            </Box>
            <RecommendArtist />
        </Flex>
    );
}

const LastestSongs = () => {
    const { data: lastestSongs, isLoading } = useSongs('limit=4');
    return <ListSongPreview songs={isLoading ? null : lastestSongs.data} title="Lastest songs" moreUrl="/search" />;
};

const MostStreamedSong = () => {
    const { data: mostStreamedSong, isLoading } = useSongs('limit=4&orderBy=listen');
    return <ListSongPreview songs={isLoading ? null : mostStreamedSong.data} title="Lastest songs" moreUrl="/search" />;
};

const RecommendArtist = () => {
    const { data: userList, isLoading } = useUsers('limit=4');
    return (
        <Flex flex={1} py={4} pr={{ base: 0, md: 6 }} direction="column">
            <Flex align="center" gap={2}>
                <Icon as={IoMdPeople} fontSize={24} /> <Text>Artists you should follow</Text>
            </Flex>
            <Divider my={2} borderColor="gray" />
            {!isLoading && userList.data?.map((user) => (
                <Artist {...user} key={user.id} size="md" />
            ))}
        </Flex>
    );
};
