import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { API_ENDPOINT } from "../../config";
import { UserContext } from "../../stores";

export default function NavBar() {
    const [user, userDispatch] = useContext(UserContext);

    async function logOut () {
        await fetch(API_ENDPOINT + "/logout", {
            method: "POST",
            credentials: "include"
        })
        userDispatch({type: "Delete"})
    }

    return (
        <div>
            {user.name && <div>
                Hello, {user.name}
                <Button colorScheme="teal" onClick={logOut}>Log out</Button>
            </div>}
            
        </div>
    )
}
