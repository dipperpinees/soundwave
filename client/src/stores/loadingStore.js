import { CircularProgress, Box } from "@mui/material";
import { createContext, useReducer } from "react";

const initialState = false;

export const LoadingContext = createContext(initialState);

export function LoadingStore({children}) {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "Open": {
                return true;
            }
            case "Close": {
                return false;
            }
            default:
                return state;
        }
    }, initialState);
    
    return <LoadingContext.Provider value={[state, dispatch]}>
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
        {children}
    </LoadingContext.Provider>
} 