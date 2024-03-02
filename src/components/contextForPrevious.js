import { faLadderWater } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useContext } from "react";
import { useState } from "react";

const AppContext2 = React.createContext();

export default function AppProvider2({ children }) {

    const [prevPage, setPrevPage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    return (
        <AppContext2.Provider
            value={{ prevPage, setPrevPage, isLoggedIn, setIsLoggedIn }}
        >
            {children}
        </AppContext2.Provider>
    )
}

export function useGlobalContext2() {
    return useContext(AppContext2);
}