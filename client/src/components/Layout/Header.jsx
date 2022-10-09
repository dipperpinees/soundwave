import { useContext } from "react";
import { UserContext } from "../../stores";

export default function Header() {
    const [user, userDispatch] = useContext(UserContext);

    function logOut () {
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
