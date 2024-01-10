import React from "react";
import { Text } from 'react-native';
import { Accordion } from "../components/AccordionList.component";
import { UserContextProvider } from "../services/users/users.context";

export const UsersPage = ({navigation}) => {
    return(
        <Accordion navigation={navigation}/>
    )
}