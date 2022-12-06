import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Icon,
    Input,
    Text,
    useToast,
} from '@chakra-ui/react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../stores';
import { LoadingContext } from '../stores/loadingStore';
import '../styles/SignIn.scss';
import fetchAPI from '../utils/fetchAPI';

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const userDispatch = useContext(UserContext)[1];
    const navigate = useNavigate();
    const toast = useToast();
    const setLoading = useContext(LoadingContext)[1];

    const onSubmit = async ({ email, password }) => {
        setLoading(true);
        try {
            const { avatar, name, id, role } = await fetchAPI('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            googleLogout();
            userDispatch({ type: 'Update', payload: { avatar, name, id, role, isAuth: true } });
            if (role === 'admin') navigate('/admin');
            else navigate('/');
        } catch (e) {
            toast({
                title: e.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        setLoading(false);
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const { id, name, avatar, role } = await fetchAPI('/google/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(tokenResponse),
                });
                userDispatch({ type: 'Update', payload: { avatar, name, id } });
                if (role === 'admin') navigate('/admin');
                else navigate('/');
            } catch (e) {
                toast({
                    title: e.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        },
    });

    return (
        <Flex width="100%" justify="center" align="center" direction="column" height="100vh" color="white">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <Box fontSize="4xl" mb={8}>
                <h1>Sign in</h1>
            </Box>
            <Text mb={4}>
                Not register yet?
                <Link to="/signup">
                    <Text
                        display="inline"
                        ml={1}
                        fontWeight={600}
                        color="var(--primary-color)"
                        outline="none"
                        textDecoration="none"
                    >
                        SIGN UP
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
                                name="email"
                                id="email"
                                {...register(
                                    'email',
                                    {
                                        required: {
                                            value: true,
                                            message: 'This field cannot be empty',
                                        },
                                    },
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
                        <FormControl isInvalid={errors.password} mt={4}>
                            <FormLabel fontSize="0.875rem" mb={1} mr={0}>
                                <Flex align="center" justify="space-between">
                                    <Text>Password</Text>
                                    <Text fontSize="0.875rem" color="var(--primary-color)">
                                        Forgot Password
                                    </Text>
                                </Flex>
                            </FormLabel>

                            <Input
                                type="password"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'This field cannot be empty',
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
                    </Box>
                    <Button
                        type="submit"
                        fontSize="0.875rem"
                        fontWeight={700}
                        colorScheme="primary"
                        variant="solid"
                        width="100%"
                        mt={8}
                        size="lg"
                        _hover={{ opacity: 0.8 }}
                    >
                        <Text>Log in</Text>
                    </Button>
                </form>
                <Text textAlign="center" fontSize="0.875rem" fontWeight={600} margin={4}>
                    OR
                </Text>
                <Button
                    colorSheme="primary"
                    variant="outline"
                    width="100%"
                    color="white"
                    _active={{}}
                    _hover={{}}
                    onClick={loginGoogle}
                >
                    <Icon as={FcGoogle} fontSize={24} mr={2} />
                    Sign in with google
                </Button>
            </Box>
        </Flex>
    );
}
