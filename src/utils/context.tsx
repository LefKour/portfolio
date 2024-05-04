import React, {createContext, useContext, useState} from "react";
import {Project} from "./types.ts";

interface GlobalData {
    project: Project | null
}

const GlobalContext = createContext<{
    globalData: GlobalData, setGlobalData: React.Dispatch<React.SetStateAction<GlobalData>>
}>({
    globalData: {project: null},
    setGlobalData: () => null,
});

interface GlobalContextProps {
    children: JSX.Element
}

export const GlobalContextProvider = ({children}:GlobalContextProps) => {
    const [globalData, setGlobalData] =
        useState<GlobalData>({project: null});

    return (
        <GlobalContext.Provider value={{globalData, setGlobalData}} >
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);