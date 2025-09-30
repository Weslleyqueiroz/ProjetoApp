import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import BottomRoutes from './Bottom.routes';
import Agendar from '../pages/agendar';
import Servicos from '../pages/servicos';

export default function Routes() {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator
            initialRouteName = "Login"
            screenOptions={{
                headerShown:false,
            
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

         <Stack.Screen
             name ="Servicos"
             component={Servicos}
         />

         <Stack.Screen
             name ="Agendar"
             component={Agendar}
         />
        </Stack.Navigator>
        
    )

}