import { Button, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { BsFillPeopleFill, BsSoundwave } from 'react-icons/bs';
import { Link, useSearchParams } from 'react-router-dom';
import SongPreview from '../components/SongPreview';
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
            {type === "songs" && <SongsLibrary />}
            {type === "playlists" && <PlaylistLibrary />}
        </Flex>
    );
}

const SongsLibrary = () => {
    const user = useContext(UserContext)[0];
    const [tracks, setTracks] = useState(null);

    useEffect(() => {
        if (!user.id) return;
        (async () => {
            try {
                const data = await fetchAPI(`/user/${user.id}/songs`);
                setTracks(data);
            } catch (e) {}
        })();
    }, [user]);

    const handleDelete = async (deleteID) => {
        try {
            setTracks(tracks.filter(({ id }) => id !== deleteID));
            await fetchAPI(`/song/${deleteID}`, { method: 'DELETE' });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Text as="h3" fontSize={20} fontWeight={600}>
                Songs Library
            </Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={12}>
                {tracks
                    ? tracks.map((song, id) => (
                          <SongPreview key={id} song={song} isOwner={true} onDelete={() => handleDelete(song.id)} />
                      ))
                    : [...Array(12).keys()].map((id) => <SongSkeleton key={id} />)}
            </Grid>
            {tracks?.length === 0 && <Text>You haven't uploaded any songs or albums yet</Text>}
        </>
    );
};

const PlaylistLibrary = () => {
    const user = useContext(UserContext)[0];
    const [playlist, setPlaylist] = useState([])
    useEffect(() => {

    }, [])

    return (
        <>
        </>
    )
}