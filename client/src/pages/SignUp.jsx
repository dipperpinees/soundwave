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
import '../styles/SignUp.scss';
import fetchAPI from '../utils/fetchAPI';

export default function SignUp() {
    const [user, userDispatch] = useContext(UserContext);

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
            toast({
                title: e.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Container>
            <VStack display="flex" justifyContent="center" alignItems="center" height="100%">
                <Box className="logo">
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center" mt="2">
                        <Link href="/" color="#f48004" style={{ textDecoration: 'none' }}>
                            SOUNDGROUND
                        </Link>
                    </Text>
                </Box>
                <Box fontSize="4xl" color="#FFF" fontFamily="Deezer, san-serif" style={{ marginBottom: '30px' }}>
                    <h1>Sign up</h1>
                </Box>
                <Box fontSize="2md" color="#FFF">
                    <Text>
                        Already have an account?{' '}
                        <Link href="/signin" color="#f48004" outline="none" style={{ textDecoration: 'none' }}>
                            SIGN IN
                        </Link>
                    </Text>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box id="inputInfo">
                        <FormControl isInvalid={errors.name}>
                            <FormLabel className="inputLabel">Name</FormLabel>
                            <Input
                                type="text"
                                id="name"
                                {...register(
                                    'name',
                                    { required: 'Name is required' },
                                    { minLength: { value: 4, message: 'Name must have at least 4 characters' } }
                                )}
                                className="inputUser"
                                style={{ height: '58px', fontSize: '14px', backgroundColor: '#FFFFFF' }}
                            />
                            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.email}>
                            <FormLabel className="inputLabel">Email address</FormLabel>
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
                                    required: {
                                        value: true,
                                        message: 'This field cannot be empty',
                                    },
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
                        <FormControl isInvalid={errors.confirmPassword}>
                            <FormLabel className="inputLabel">Confirm password</FormLabel>
                            <Input
                                type="password"
                                {...register('confirmPassword', {
                                    validate: (value) => {
                                        if (value !== watch('password')) return 'Your passwords does not match';
                                    },
                                })}
                                className="inputUser"
                                style={{ height: '58px', fontSize: '14px', backgroundColor: '#FFFFFF' }}
                            />
                            <FormErrorMessage>
                                {errors.confirmPassword && errors.confirmPassword.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Button
                        type="submit"
                        id="but-login"
                        style={{ marginLeft: '10px', marginTop: '30px', marginBottom: '60px' }}
                        borderRadius="0.375rem"
                        fontSize="14px"
                        fontWeight="700"
                        backgroundColor="#f48004"
                        color="#FFF"
                    >
                        <Text>Sign Up</Text>
                    </Button>
                </form>
            </VStack>
        </Container>
    );
}
