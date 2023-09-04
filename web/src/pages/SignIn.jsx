import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast
} from '@chakra-ui/react';
import { googleLogout } from '@react-oauth/google';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../stores';
import { LoadingContext } from '../stores/loadingStore';
import '../styles/SignIn.scss';
import { APP_NAME } from '../utils/constant';
import fetchAPI from '../utils/fetchAPI';
import GoogleLogin from '../components/GoogleLogin/GoogleLogin';
import { GOOGLE_CLIENT_ID } from '../config';

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const userDispatch = useContext(UserContext)[1];
    const [forgotEmail, setForgotEmail] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    const setLoading = useContext(LoadingContext)[1];
    const [isOpenForgotModal, setIsOpenForgotModal] = useState(false);

    const forgetPassword = async () => {
        setLoading(true);
        try {
            if (!forgotEmail) return;
            await fetchAPI('/password/forget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotEmail }),
            });
            setLoading(false);
            toast({
                title: 'Send email successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            setLoading(false);
            toast({
                title: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

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

    

    return (
        <Flex width="100%" justify="center" align="center" direction="column" height="100vh" color="white">
            <Helmet>
                <title>Sign In - {APP_NAME}</title>
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
                                type="email"
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
                                    <Text
                                        fontSize="0.875rem"
                                        color="var(--primary-color)"
                                        onClick={() => setIsOpenForgotModal(true)}
                                        _hover={{ cursor: 'pointer' }}
                                    >
                                        Forgot Password
                                    </Text>
                                    <Modal isOpen={isOpenForgotModal} onClose={() => setIsOpenForgotModal(false)}>
                                        <ModalOverlay />
                                        <ModalContent bgColor="blackAlpha.900" color="white">
                                            <ModalHeader>Forgot password</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Text>Email address</Text>
                                                <Input
                                                    type="email"
                                                    required
                                                    onChange={(event) => {
                                                        setForgotEmail(event.target.value);
                                                    }}
                                                    bgColor="white"
                                                    color="black"
                                                />
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button
                                                    mr={3}
                                                    onClick={() => setIsOpenForgotModal(false)}
                                                    color="black"
                                                >
                                                    Close
                                                </Button>
                                                <Button
                                                    bgColor="var(--primary-color)"
                                                    onClick={forgetPassword}
                                                    _hover={{ opacity: 0.8 }}
                                                >
                                                    Submit
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
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
                {GOOGLE_CLIENT_ID && <>
                    <Text textAlign="center" fontSize="0.875rem" fontWeight={600} margin={4}>
                        OR
                    </Text>
                    <GoogleLogin />
                </>}
            </Box>
        </Flex>
    );
}
