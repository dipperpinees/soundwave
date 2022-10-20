import { Avatar, Button, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useContext } from "react";
import { API_ENDPOINT } from "../../config";
import { UserContext } from "../../stores";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import {BiSearchAlt} from "react-icons/bi"

export default function Header() {
    const [user, userDispatch] = useContext(UserContext);

    async function logOut() {
        await fetch(API_ENDPOINT + "/logout", {
            method: "POST",
            credentials: "include"
        })
        userDispatch({ type: "Delete" })
    }

    return (
        <Flex alignItems="center" className="header">
            {user.name && <div>
                Hello, {user.name}
                <Button colorScheme="teal" onClick={logOut}>Log out</Button>
            </div>}
            <Avatar className="header-avatar" size='lg' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
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
