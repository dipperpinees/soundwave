import { createContext, useEffect, useReducer } from "react";
import { API_ENDPOINT } from "../config";

const defaultState = {
    id: 0,
    avatar: "",
    name: "",
    createdAt: "",
    updatedAt: ""
}

const initialState = {...defaultState}

export const UserContext = createContext(initialState);

export function UserStore({children}) {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "Update": {
                return {...state, ...action.payload}
            }
            case "Delete": {
                return {...defaultState}
            }
            default:
                return state;
        }
    }, initialState);
    
    useEffect(() => {
        const auth = async () => {
            const response = await fetch(API_ENDPOINT + "/auth", {
                method: "POST",
                credentials: "include"
            })
            const responseJSON = await response.json();
            if (response.ok) {
                dispatch({type: "Update", payload: responseJSON})
            }
        }
        auth()
    }, [])
    
    return <UserContext.Provider value={[state, dispatch]}>
        {children}
    </UserContext.Provider>
}