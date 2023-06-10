import { createContext } from "react";

export const AuthContext = createContext({
    loggedInUser: null,
    token: null,
    login: () => {},
    logout: () => {},
})