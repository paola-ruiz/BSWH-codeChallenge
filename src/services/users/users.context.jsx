import React, { createContext, useState } from "react";
import { infoUsers, albumsPerUser } from "./users.service";
import { useSelector } from "react-redux";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [complete, setComplete] = useState(false);
    const deletedAlbum = useSelector((state) => state.album);

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

    const albumsInformation = async() => {
        setIsLoading(true);
        setAlbums([]);
        setError(false);
        let temp = [];
        /*for(var a=0; a<users.length; a++){
            albumsPerUser(A[i].id).then((A) => {
                for(var i = 0; i<A.length; i++){
                    temp.push(A[i].title);
                }
                albums.push(temp);
            })
        }*/
        albumsPerUser(1).then((A) => {
            for(var i = 0; i<A.length; i++){
                temp.push(A[i].title);
            }
            if(deletedAlbum >= 0){
                temp.splice(deletedAlbum, 1);
            }
            setAlbums(temp);
            setComplete(true);
            console.log(albums);
        })
        setIsLoading(false);
    }

    return(
        <UserContext.Provider
            value={{
                users,
                albums,
                error, 
                isLoading,
                complete,
                usersInformation, 
                albumsInformation
            }}>
            {children}
        </UserContext.Provider>
    )
}