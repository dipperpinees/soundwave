import { Box, Button, Container, HStack, Input, Link, Text, VStack, Modal, ModalContent, Stack, FormControl, FormLabel} from "@chakra-ui/react"
import '../styles/SignIn.scss'
import {useForm} from 'react-hook-form';
import { UserContext } from "../stores";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function SignIn() {  
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [user, userDispatch] = useContext(UserContext);
    const navigate = useNavigate();
    if (user.id) {
        navigate('/');
    }
    const onSubmit = (data) => {
        console.log(data)
    }

    return <Container>
        <Stack>
            <VStack display='flex' justifyContent='center' alignItems='center' height='100%'>
                <Box className="logo">
                    <Text fontSize='2xl' fontWeight='bold' textAlign='center' mt='2' >
                        <Link href="/" color='#f48004' style={{textDecoration: 'none'}}>SOUNDGROUND</Link>
                    </Text>
                </Box>
                <Box fontSize='4xl' color='#FFF' fontFamily='Deezer, san-serif' style={{marginBottom:'30px'}}>
                    <h1>Log in</h1>
                </Box>
                <Box fontSize='2md' color='#FFF'>
                    <Text>Not register on Deezer yet? <Link href="/signup" color='#f48004' outline='none' style={{textDecoration: 'none'}}>SIGN UP</Link></Text>
                </Box> 
                <HStack 
                maxW='100%' display='grid' gap = '5px' gridTemplateColumns='repeat(auto-fit, minmax(52px, 1fr))' 
                justifyItems='stretch' className="social"
                style={{marginTop:'30px'}}>
                        <Button className="but-social" style={{
                            borderRadius: '100px',
                            marginLeft: '5px'
                        }}>
                            Facebook
                        </Button>
                        <Button className="but-social" style={{
                            borderRadius: '100px',
                            marginLeft: '5px'
                        }}>
                            Google
                        </Button>
                        <Button className="but-social" style={{
                            borderRadius: '100px',
                            marginLeft: '5px'
                        }}>
                            Apple
                        </Button>
                </HStack>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box id="inputInfo">
                        
                        <FormControl>
                            <FormLabel className="inputLabel">Email address</FormLabel>
                            <Input type='email'
                            {...register("email", { required: true}, 
                            {pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },})} 
                            className="inputUser" style={{height: '58px', fontSize: '14px', backgroundColor:'#FFFFFF'}}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel className="inputLabel">Password</FormLabel>
                            <Input type='password' 
                            {...register('password', {required: true})} className="inputUser"  
                            style={{height: '58px', fontSize: '14px', backgroundColor:'#FFFFFF'}}/>
                        </FormControl>
                    </Box>
                    <Button type="submit" id="but-login" 
                    style={{marginLeft: '10px', marginTop:'30px'}} 
                    borderRadius='50px' fontSize='14px' fontWeight='700' backgroundColor='#f48004' color='#FFF'>
                            <Text>Log in</Text>
                    </Button>
                </form>

                    <Box id='gtp'>
                        <Link style={{textDecoration:'none', color: '#f48004'}} href = '/signup'>FORGOT YOUR PASSWORD?</Link>
                    </Box>
                <Box id="service">
                    <Text color='#f48004'>
                    This site is protected by reCAPTCHA. Google PRIVACY POLICY and TERMS OF SERVICE apply.
                    </Text>
                </Box>
            </VStack>
        </Stack>
    </Container>
}