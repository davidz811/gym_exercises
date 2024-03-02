import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

export default function AppProvider({ children }) {

    const [selectedBodyPart, setSelectedBodyPart] = useState('all');
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        console.log(selectedBodyPart);
    }, [selectedBodyPart])

    return (
        <AppContext.Provider
            value={{ selectedBodyPart, setSelectedBodyPart, exercises, setExercises }}
        >
            {children}
        </AppContext.Provider>
    )
}


export function useGlobalContext() {
    return useContext(AppContext);
}