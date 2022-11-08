import { Flex, Grid, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import SongPreview from '../components/SongPreview';
import SongSkeleton from '../components/SquareSkeleton';
import { UserContext } from '../stores';
import fetchAPI from '../utils/fetchAPI';

export default function TrackLibrary() {
    const [tracks, setTracks] = useState(null);
    const user = useContext(UserContext)[0];
    
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
            setTracks(tracks.filter(({id}) => id !== deleteID))
            await fetchAPI(`/song/${deleteID}`, {method: "DELETE"})
        } catch (e) {
            console.log(e)
        }
    }

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
            <Text as="h3" fontSize={20} fontWeight={600}>
                Songs Library
            </Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={12}>
                {tracks
                    ? tracks.map((song, id) => <SongPreview key={id} song={song} isOwner={true} onDelete={() => handleDelete(song.id)}/>)
                    : [...Array(12).keys()].map((id) => <SongSkeleton key={id} />)}
            </Grid>
        </Flex>
    );
}
