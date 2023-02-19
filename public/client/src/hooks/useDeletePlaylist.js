import { useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { UserContext } from '../stores';
import { LoadingContext } from '../stores/loadingStore';
import fetchAPI from '../utils/fetchAPI';

export default function useDeletePlaylist() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const setLoading = useContext(LoadingContext)[1];
    const user = useContext(UserContext)[0];

    const deletePlaylist = async (id) => {
        setLoading(true);
        try {
            await fetchAPI(`/playlist/${id}`, { method: 'DELETE' });
            setLoading(false);
        } catch (e) {
            setLoading(false);
            throw e;
        }
        return id;
    };

    return useMutation(deletePlaylist, {
        onSuccess: (id) => {
            queryClient.setQueryData(['user-playlists', user.id], (oldData) => {
                return oldData.filter((data) => data.id !== id);
            });
            toast({
                title: 'Delete playlist successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: 'Delete playlist failed.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        },
    });
}
