import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../stores';
import { LoadingContext } from '../stores/loadingStore';
import '../styles/SignUp.scss';
import { APP_NAME } from '../utils/constant';
import fetchAPI from '../utils/fetchAPI';

export default function SignUp() {
    const [user, userDispatch] = useContext(UserContext);
    const setLoading = useContext(LoadingContext)[1];
    const toast = useToast();
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();

    if (user.id) {
        navigate('/');
    }

    const onSubmit = async ({ email, password, name }) => {
        setLoading(true);
        try {
            const { avatar, id } = await fetchAPI('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });
            userDispatch({ type: 'Update', payload: { avatar, name, id } });
        } catch (e) {
            if (e.message.includes('Error 1062')) e.message = 'This account already exists';
            toast({
                title: e.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        setLoading(false);
    };

    return (
        <Flex width="100%" justify="center" align="center" direction="column" minHeight="100vh" color="white">
            <Helmet>
                <title>Sign Up - {APP_NAME}</title>
            </Helmet>
            <Box fontSize="4xl">
                <h1>Sign up</h1>
            </Box>
            <Text my={3}>
                Already have an account?
                <Link to="/signin">
                    <Text
                        display="inline"
                        ml={1}
                        fontWeight={600}
                        color="var(--primary-color)"
                        outline="none"
                        textDecoration="none"
                    >
                        SIGN IN
                    </Text>
                </Link>
            </Text>
            <Box width={{ base: '92%', md: 480 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box width="100%">
                        <FormControl isInvalid={errors.email}>
                            <FormLabel fontSize="0.875rem" mb={1}>
                                Email address
                            </FormLabel>
                            <Input
                                type="email"
                                id="email"
                                {...register(
                                    'email',
                                    { required: 'Email is required' },
                                    {
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Please enter a valid email',
                                        },
                                    }
                                )}
                                color="black"
                                fontSize="0.875rem"
                                bgColor="white"
                                py={6}
                            />
                            <FormErrorMessage mt={1}>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={3} isInvalid={errors.password}>
                            <FormLabel fontSize="0.875rem" mb={1}>
                                Password
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
                        <FormControl mt={3} isInvalid={errors.name}>
                            <FormLabel fontSize="0.875rem" mb={1}>
                                Name
                            </FormLabel>
                            <Input
                                type="text"
                                id="name"
                                {...register('name', {
                                    required: 'Name is required',
                                })}
                                color="black"
                                fontSize="0.875rem"
                                bgColor="white"
                                py={6}
                            />
                            <FormErrorMessage mt={1}>{errors.name && errors.name.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Button
                        type="submit"
                        fontSize="0.875rem"
                        fontWeight={700}
                        colorScheme="primary"
                        variant="solid"
                        width="100%"
                        mt={6}
                        size="lg"
                        _hover={{ opacity: 0.8 }}
                    >
                        <Text>Sign Up</Text>
                    </Button>
                </form>
            </Box>
        </Flex>
    );
}
