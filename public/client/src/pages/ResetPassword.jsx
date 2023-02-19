import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingContext } from '../stores/loadingStore';
import fetchAPI from '../utils/fetchAPI';

export default function ResetPassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [searchParams] = useSearchParams();
    const setLoading = useContext(LoadingContext)[1];
    const toast = useToast();
    const navigate = useNavigate();

    const onSubmit = async ({ password }) => {
        setLoading(true);

        try {
            await fetchAPI('/password/reset', {
                method: "POST",
                body: JSON.stringify({
                    userID: parseInt(searchParams.get('userID')),
                    newPassword: password,
                    code: searchParams.get('code'),
                }),
            });
            setLoading(false);
            setTimeout(() => {
                navigate('/signin');
            }, 4000);
            toast({
                title: 'Reset password successfully. Please login again',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (e) {
            setLoading(false);
            toast({
                title: e.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    return (
        <Flex color="white" minHeight="100vh" align="center" justify="center" direction="column">
            <Helmet>
                <title>Reset password</title>
            </Helmet>
            <Box width={{ base: '92%', md: 480 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl mt={3} isInvalid={errors.password}>
                        <FormLabel fontSize="0.875rem" mb={1}>
                            New Password
                        </FormLabel>
                        <Input
                            type="password"
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Password is required',
                                },
                                minLength: {
                                    value: 6,
                                    message: 'This field has a minimum length of 6',
                                },
                            })}
                            color="black"
                            fontSize="0.875rem"
                            bgColor="white"
                            py={6}
                        />
                        <FormErrorMessage mt={1}>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl mt={3} isInvalid={errors.confirmPassword}>
                        <FormLabel fontSize="0.875rem" mb={1}>
                            Confirm password
                        </FormLabel>
                        <Input
                            type="password"
                            {...register('confirmPassword', {
                                validate: (value) => {
                                    if (value !== watch('password')) return 'Your passwords does not match';
                                },
                            })}
                            color="black"
                            fontSize="0.875rem"
                            bgColor="white"
                            py={6}
                        />
                        <FormErrorMessage mt={1}>
                            {errors.confirmPassword && errors.confirmPassword.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button type="submit" width="100%" bgColor="var(--primary-color)" mt={6} _hover={{ opacity: 0.8 }}>
                        Submit
                    </Button>
                </form>
            </Box>
        </Flex>
    );
}
