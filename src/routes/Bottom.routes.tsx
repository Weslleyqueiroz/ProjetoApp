import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import List from "../pages/list";
import User from "../pages/user";
import list from "../pages/list";
const Tab = createBottomTabNavigator();

export default function bottomRoutes(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="list" component={List}
        />
       
        
        <Tab.Screen name="user" component={User}
        />
        </Tab.Navigator>

    );
}