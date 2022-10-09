import { useContext } from "react";
import { API_ENDPOINT } from "../../config";
import { UserContext } from "../../stores";

export default function Header() {
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
                <button onClick={logOut}>Log out</button>
            </div>}
            
        </div>
    )
}
