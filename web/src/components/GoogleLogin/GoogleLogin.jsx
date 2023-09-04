import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from 'react-icons/fc';
import fetchAPI from "../../utils/fetchAPI";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../stores";

export default function GoogleLogin() {
    const toast = useToast();
    const navigate = useNavigate();
    const userDispatch = useContext(UserContext)[1];

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
        <div>
            <Button
                colorScheme="primary"
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
        </div>
    );
}
