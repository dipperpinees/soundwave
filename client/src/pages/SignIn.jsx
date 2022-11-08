import {
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Link,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../stores';
import '../styles/SignIn.scss';
import fetchAPI from '../utils/fetchAPI';

export default function SignIn() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [user, userDispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const toast = useToast();

    if (user.id) navigate('/');

    const onSubmit = async ({ email, password }) => {
        try {
            const { avatar, name, id } = await fetchAPI('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            userDispatch({ type: 'Update', payload: { avatar, name, id } });
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
        <Container height="50em" width="100%">
            <VStack display="flex" justifyContent="center" alignItems="center" height="100%">
                <Box className="logo">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center" mt="2">
                        <Link href="/" color="#f48004" style={{ textDecoration: 'none' }}>
                            SOUNDGROUND
                        </Link>
                    </Text>
                </Box>
                <Box fontSize="4xl" color="#FFF" fontFamily="Deezer, san-serif" style={{ marginBottom: '30px' }}>
                    <h1>Log in</h1>
                </Box>
                <Box fontSize="2md" color="#FFF">
                    <Text>
                        Not register on Deezer yet?{' '}
                        <Link href="/signup" color="#f48004" outline="none" style={{ textDecoration: 'none' }}>
                            SIGN UP
                        </Link>
                    </Text>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box id="inputInfo">
                        <FormControl isInvalid={errors.email}>
                            <FormLabel className="inputLabel">Email address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                {...register(
                                    'email',
                                    { required: { value: true, message: 'This field cannot be empty' } },
                                    {
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Please enter a valid email',
                                        },
                                    }
                                )}
                                className="inputUser"
                                style={{ height: '58px', fontSize: '14px', backgroundColor: '#FFFFFF' }}
                            />
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.password}>
                            <FormLabel className="inputLabel">Password</FormLabel>
                            <Input
                                type="password"
                                {...register('password', {
                                    required: { value: true, message: 'This field cannot be empty' },
                                    minLength: {
                                        value: 6,
                                        message: 'This field has a minimum length of 6',
                                    },
                                })}
                                className="inputUser"
                                style={{ height: '58px', fontSize: '14px', backgroundColor: '#FFFFFF' }}
                            />
                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Button
                        type="submit"
                        id="but-login"
                        style={{ marginLeft: '10px', marginTop: '30px' }}
                        borderRadius="0.375rem"
                        fontSize="14px"
                        fontWeight="700"
                        backgroundColor="#f48004"
                        color="#FFF"
                    >
                        <Text>Log in</Text>
                    </Button>
                </form>

                <Box id="gtp">
                    <Link style={{ textDecoration: 'none', color: '#f48004' }} href="/signup">
                        FORGOT YOUR PASSWORD?
                    </Link>
                </Box>
            </VStack>
        </Container>
    );
}
