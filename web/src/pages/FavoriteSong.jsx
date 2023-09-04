import { Flex, Grid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SongPreview from '../components/SongPreview';
import SongSkeleton from '../components/SquareSkeleton';
import { APP_NAME } from '../utils/constant';
import fetchAPI from '../utils/fetchAPI';

export default function FavoriteSongs() {
    const [songs, setSongs] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAPI('/user/favorite');
                setSongs(data);
            } catch (e) {}
        })();
    }, []);

    const removeSong = (songID) => {
        return () => setSongs(songs.filter(({ id }) => songID !== id));
    };

    return (
        <Flex
            marginTop="var(--header-height)"
            marginLeft="var(--navbar-width)"
            color="white"
            direction="column"
            paddingBottom={40}
            paddingRight={{ base: 4, md: 12 }}
            paddingLeft={{ base: 4, md: 0 }}
            minHeight={'calc(100vh - var(--header-height))'}
        >
            <Helmet>
                <title>{APP_NAME} - Favorite Songs</title>
            </Helmet>
            <Text as="h4" fontWeight={600} mb={2} fontSize="1.25rem" mt={4}>
                Favorite Songs
            </Text>
            <Grid
                templateColumns={{
                    base: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(4, minmax(0, 1fr))',
                    lg: 'repeat(6, minmax(0, 1fr))',
                }}
                gap={6}
            >
                {songs
                    ? songs.map((song) => (
                          <SongPreview key={song.id} song={{ ...song, isLiked: true }} onUnlike={removeSong(song.id)} />
                      ))
                    : [...Array(12).keys()].map((id) => <SongSkeleton key={id} />)}
            </Grid>
            {songs && songs.length === 0 && <Text>You don't have any favorite songs</Text>}
        </Flex>
    );
}
