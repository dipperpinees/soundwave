import { useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { UserContext } from '../stores';
import { LoadingContext } from '../stores/loadingStore';
import fetchAPI from '../utils/fetchAPI';

export default function useUpdateSong() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const setLoading = useContext(LoadingContext)[1];
    const user = useContext(UserContext)[0];

    const updateSong = async ({ id, formData }) => {
        setLoading(true);
        const data = await fetchAPI(`/song/${id}`, {
            method: 'PUT',
            body: formData,
        });
        setLoading(false);
        return { updateData: data, id };
    };
    return useMutation(updateSong, {
        onSuccess: ({ updateData, id }) => {
            queryClient.setQueryData(['user-songs', user.id], (oldData) => {
                return oldData.map((data) => {
                    if (data.id === id) return { ...data, ...updateData };
                    return data;
                });
            });
            toast({
                title: 'Update song successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: 'Update song failed.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        },
    });
}
