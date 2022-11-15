import {
    Button, Flex,
    Grid,
    Icon, Text
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { BsFillPeopleFill, BsSoundwave } from 'react-icons/bs';
import { Link, useSearchParams } from 'react-router-dom';
import { SongsLibrary } from '../components/Library';
import PlaylistPreview from '../components/Playlists/PlaylistPreview';
import SongSkeleton from '../components/SquareSkeleton';
import { UserContext } from '../stores';
import fetchAPI from '../utils/fetchAPI';

export default function Library() {
    const [searchParams] = useSearchParams();
    const [type, setType] = useState('songs');

    useEffect(() => {
        if (searchParams.get('q') === 'playlists') setType('playlists');
        else setType('songs');
    }, [searchParams]);

    return (
        <Flex
            marginTop="var(--header-height)"
            marginLeft="var(--navbar-width)"
            color="white"
            direction="column"
            paddingBottom={40}
            paddingRight={12}
            minHeight={'calc(100vh - var(--header-height))'}
        >
            <Flex gap={2} mb={4}>
                <Link to="/library?q=songs">
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{}}
                        colorScheme="primary"
                        bgColor={type === 'songs' && 'var(--primary-color)'}
                    >
                        <Icon as={BsSoundwave} marginRight={1} />
                        Songs
                    </Button>
                </Link>
                <Link to="/library?q=playlists">
                    <Button
                        variant="ghost"
                        color="white"
                        _hover={{}}
                        colorScheme="primary"
                        bgColor={type === 'playlists' && 'var(--primary-color)'}
                    >
                        <Icon as={BsFillPeopleFill} marginRight={1} />
                        Playlists
                    </Button>
                </Link>
            </Flex>
            {type === 'songs' && <SongsLibrary />}
            {type === 'playlists' && <PlaylistLibrary />}
        </Flex>
    );
}

const PlaylistLibrary = () => {
    const user = useContext(UserContext)[0];
    const [playlists, setPlaylists] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                setPlaylists(await fetchAPI(`/user/${user.id}/playlists`));
            } catch (e) {}
        })();
    }, [user]);
    return (
        <>
            <Text as="h3" fontSize={20} fontWeight={600}>
                Playlist Library
            </Text>
            <Grid templateColumns="repeat(6, 1fr)" gap={6}>
                {playlists
                    ? playlists.map((playlist, index) => <PlaylistPreview key={index} {...playlist} />)
                    : [...Array(12).keys()].map((id) => <SongSkeleton key={id} />)}
            </Grid>
        </>
    );
};
