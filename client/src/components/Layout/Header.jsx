import { Avatar, Button, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useContext } from "react";
import { API_ENDPOINT } from "../../config";
import { UserContext } from "../../stores";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import {BiSearchAlt} from "react-icons/bi"
import { useLocation } from "react-router-dom";

export default function Header() {
    const [user, userDispatch] = useContext(UserContext);
    const location = useLocation();
    if (location.pathname === '/signin' || location.pathname === '/signup') return null;

    async function logOut() {
        await fetch(API_ENDPOINT + "/logout", {
            method: "POST",
            credentials: "include"
        })
        userDispatch({ type: "Delete" })
    }

    return (
        <Flex alignItems="center" className="header white-color" zIndex={3}>
            <Avatar className="header-avatar" size='md' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
            <IoIosArrowBack className="header-back" />
            <IoIosArrowForward className="header-forward" />
            <InputGroup width="50%" marginLeft="8px">
                <InputLeftElement
                    pointerEvents='none'
                    children={<BiSearchAlt color='gray.300' />}
                />
                <Input type='tel' placeholder='Search for artists, song,...'  borderRadius="40px" />
            </InputGroup>

        </Flex>
    )
}
