import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import { API_ENDPOINT } from "../config";
import { UserContext } from "../store/userStore";

export default function SignUp() {
    const [user, userDispatch] = useContext(UserContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const response = await fetch(API_ENDPOINT + "/signup", {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password, name})
        })
        const responseJSON = await response.json();
        
        if (response.ok) {
            const {email, name, id} = responseJSON;
            userDispatch({type: "Update", payload: {email, name, id}})
        } else {
            alert(responseJSON)
        }
    }

    return <form className="sign-up" onSubmit={handleSubmit}>
        <TextField label="Email" name="email" variant="standard" />
        <TextField label="Password" name="password" type="password" variant="standard" />
        {/* <TextField label="Confirm password" type="password" variant="standard" /> */}
        <TextField label="Name" name="name" variant="standard" />
        <Button variant="contained" type="submit">Submit</Button>
    </form>
}