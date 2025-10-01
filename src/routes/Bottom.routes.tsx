import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import List from "../pages/list";
import User from "../pages/user";
import Cadastro from "../pages/user";
import CustomTabbar from "../components/CustomTabbar";

const Tab = createBottomTabNavigator();

export default function BottomRoutes(){
    return(
        <Tab.Navigator
        screenOptions={{
            headerShown:false,

        }}
        tabBar={pros=><CustomTabbar {...pros}   />}

        >
            <Tab.Screen 
            name="List" 
            component={List}
        />
       
        
        <Tab.Screen name="User" 
        component={User}
        />
            <Tab.Screen name="Cadastro" 
        component={Cadastro}
        />
        </Tab.Navigator>
        

    );
}