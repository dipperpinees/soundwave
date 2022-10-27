import { Box, Button, Container, HStack, Input, Link, Text, VStack, Modal, ModalContent} from "@chakra-ui/react"
import '../styles/SignIn.scss'

import {useForm} from 'react-hook-form';
import { useState } from "react";

export default function SignIn() {

    const {register, handleSubmit} = useForm();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (data) => {
        console.log(data)
    }

    return <Container>
            <VStack display='flex' justifyContent='center' alignItems='center' height='100%'>
                <Box className="logo">
                    <Text fontSize='2xl' fontWeight='bold' textAlign='center' mt='2' ><Link href="/" color='#F25467' style={{textDecoration: 'none'}}>SOUNDGROUND</Link></Text>
                </Box>
                <Box fontSize='4xl' fontFamily='Deezer, san-serif' style={{marginBottom:'30px'}}>
                    <h1>Log in</h1>
                </Box>
                <Box fontSize='2md'>
                    <Text>Not register on Deezer yet? <Link href="/signup" color='#F25467' outline='none' style={{textDecoration: 'none'}}>SIGN UP</Link></Text>
                </Box> 
                <HStack maxW='100%' display='grid' gap = '5px' gridTemplateColumns='repeat(auto-fit, minmax(52px, 1fr))' justifyItems='stretch' className="social"
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
                        
                        <Box>
                            <Text className="inputLabel">Email address</Text>
                            <Input type='email'{...register("email", { required: true})} className="inputUser" style={{height: '58px', fontSize: '14px'}}/>
                        </Box>
                        <Box>
                            <Text className="inputLabel">Password</Text>
                            <Input type='password' {...register('password', {required: true})} className="inputUser"  style={{height: '58px', fontSize: '14px'}}/>
                        </Box>
                    </Box>
                    <Button type="submit" id="but-login" style={{marginLeft: '10px', marginTop:'30px'}} borderRadius='50px' fontSize='14px' fontWeight='700' backgroundColor='#EF5466' color='#FFF'>
                            <Text>Log in</Text>
                    </Button>
                </form>

                    <Box id='gtp'>
                        <Link style={{textDecoration:'none'}} href = '/signup'>FORGOT YOUR PASSWORD?</Link>
                    </Box>
                <Box id="service">
                    <Text>
                    This site is protected by reCAPTCHA. Google PRIVACY POLICY and TERMS OF SERVICE apply.
                    </Text>
                </Box>
            </VStack>
    </Container>
}