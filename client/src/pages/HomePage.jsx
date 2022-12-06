import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { IoMdPeople } from 'react-icons/io';
import Artist from '../components/Artist/index.';
import ListSongPreview from '../components/ListSongPreview';
import useRecentlyPlayed from '../hooks/useRecentlyPlayed';
import useSongs from '../hooks/useSongs';
import useUsers from '../hooks/useUsers';

export default function HomePage() {
    return (
        <Flex
            className="home-page"
            color="white"
            gap={{ base: 4, lg: 10 }}
            direction={{ base: 'column', lg: 'row' }}
            px={{ base: 6, md: 0 }}
        >
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <Box flex={3} pr={{ base: 0, md: 6, xl: 0 }}>
                <RecentlyPlayed />
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
    return (
        <ListSongPreview
            songs={isLoading ? null : mostStreamedSong.data}
            title="Most-streamed songs"
            moreUrl="/search?order=listen"
        />
    );
};

const RecommendArtist = () => {
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

const RecentlyPlayed = () => {
    const {data, isLoading, isError} = useRecentlyPlayed();
    if (isError || isLoading || !data) return;
    return (
        <ListSongPreview
            songs={isLoading ? null : data?.map(({value}) => value)}
            title="Recently Played"
            moreUrl=""
        />
    )
};


