import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
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
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();

    if (user.id) navigate('/');

    const forgotPassword = () => {
        console.log('forgotPassword')
    }

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
        <Flex width="100%" justify="center" align="center" direction="column" height="100vh" color="white">
            <Box fontSize="4xl" mb={8}>
                <h1>Log in</h1>
            </Box>
            <Text mb={4}>
                Not register yet?{' '}
                <Link
                    href="/signup"
                    fontWeight={600}
                    color="var(--primary-color)"
                    outline="none"
                    style={{ textDecoration: 'none' }}
                >
                    SIGN UP
                </Link>
            </Text>
            <Box width={{ base: '92%', lg: 480 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box width="100%">
                        <FormControl isInvalid={errors.email}>
                            <FormLabel fontSize={14} mb={1}>
                                Email address
                            </FormLabel>
                            <Input
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
                                color="black"
                                fontSize={14}
                                bgColor="white"
                                py={6}
                            />
                            <FormErrorMessage mt={1}>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.password} mt={4}>
                            <FormLabel mb={1} fontSize={14}>
                                Password
                            </FormLabel>
                            <Input
                                type="password"
                                {...register('password', {
                                    required: { value: true, message: 'This field cannot be empty' },
                                    minLength: {
                                        value: 6,
                                        message: 'This field has a minimum length of 6',
                                    },
                                })}
                                color="black"
                                fontSize={14}
                                bgColor="white"
                                py={6}
                            />
                            <FormErrorMessage mt={1}>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Button
                        type="submit"
                        fontSize={14}
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
            </Box>
            <Box id='gtp'>
                        <Button style={{textDecoration:'none', color: '#f48004', backgroundColor: 'transparent'}} onClick={onOpen} >FORGOT YOUR PASSWORD?</Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                            <FormControl isInvalid = {errors.email}>
                            <FormLabel className="inputLabel" color='black'>Email address</FormLabel>
                                <Input type='email'
                                id = 'email'
                                {...register('email', {required: 'Email is required'},
                                {pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Please enter a valid email',
                                }}
                                )}
                                className="inputUser" style={{height: '58px', fontSize: '14px', backgroundColor:'#FFFFFF', border:"1px solid #000"}}/>
                                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='red' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button colorScheme='green'onClick={forgotPassword}>Send code</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                </Box>
        </Flex>
    );
}
