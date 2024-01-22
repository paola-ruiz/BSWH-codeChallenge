import React, { createContext, useState } from "react";
import { infoUsers, albumsPerUser } from "./users.service";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const usersInformation = async() => {
        setIsLoading(true);
        setUsers([]);
        setError(false)
        infoUsers().then((U) => {
            setUsers(U);
            setIsLoading(false);
        }).catch((e) => {
            setIsLoading(false);
            setError(true);
        })
    }

    const albumsInformation = async(idUser) => {
        setAlbums([]);
        setError(false);
        await albumsPerUser(idUser).then((A) => {
            setAlbums(A);
        }).catch((e) => {
            setError(true);
        })
        
    }

    return(
        <UserContext.Provider
            value={{
                users,
                albums,
                error, 
                isLoading,
                usersInformation, 
                albumsInformation
            }}>
            {children}
        </UserContext.Provider>
    )
}