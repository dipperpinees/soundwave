import { Grid, Text, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../stores";
import fetchAPI from "../../utils/fetchAPI";
import PlaylistPreview from "../Playlists/PlaylistPreview";
import SongSkeleton from "../SquareSkeleton";

const PlaylistLibrary = () => {
    const user = useContext(UserContext)[0];
    const toast = useToast();
    const [playlists, setPlaylists] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setPlaylists(await fetchAPI(`/user/${user.id}/playlists`));
            } catch (e) {}
        })();
    }, [user]);

    const handleDelete = async (playlistID) => {
        try {
            await fetchAPI(`/playlist/${playlistID}`, { method: 'DELETE' });
            setPlaylists(playlists.filter(({id}) => playlistID !== id));
            toast({
                title: 'Delete playlist successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (e) {
            toast({
                title: e.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Text as="h3" fontSize="1.25rem" fontWeight={600}>
                Playlist Library
            </Text>
            <Grid templateColumns={{ base: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(4, minmax(0, 1fr))', lg: 'repeat(6, minmax(0, 1fr))' }} gap={6}>
                {playlists
                    ? playlists.map((playlist) => (
                          <PlaylistPreview key={playlist.id} {...playlist} onDelete={handleDelete} />
                      ))
                    : [...Array(12).keys()].map((id) => <SongSkeleton key={id} />)}
            </Grid>
            {playlists?.length === 0 && <Text>You don't have any playlist yet</Text>}
        </>
    );
};

export default PlaylistLibrary;