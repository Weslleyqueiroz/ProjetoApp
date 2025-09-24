import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import BottomRoutes from './Bottom.routes';

export default function Routes() {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
        
           <Stack.Screen
           name ="Login"
           component={Login}
           />

           <Stack.Screen
           name ="BottomRoutes"
           component={BottomRoutes}
           /> 


        </Stack.Navigator>
    )

}