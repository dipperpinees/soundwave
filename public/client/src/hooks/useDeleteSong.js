import { useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { UserContext } from '../stores';
import { LoadingContext } from '../stores/loadingStore';
import fetchAPI from '../utils/fetchAPI';

export default function useDeleteSong() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const setLoading = useContext(LoadingContext)[1];
    const user = useContext(UserContext)[0];

    const deleteSong = async (id) => {
        setLoading(true);
        try {
            await fetchAPI(`/song/${id}`, { method: 'DELETE' });
            setLoading(false);
        } catch (e) {
            setLoading(false);
            throw e;
        }
        return id;
    };

    return useMutation(deleteSong, {
        onSuccess: (id) => {
            queryClient.setQueryData(['user-songs', user.id], (oldData) => {
                return oldData.filter((data) => data.id !== id);
            });
            toast({
                title: 'Delete song successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: 'Delete song failed.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        },
    });
}
