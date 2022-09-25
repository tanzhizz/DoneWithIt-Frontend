import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import MessageScreen from "../screens/MessageScreen";
import ListingsUserScreen from "../screens/ListingsUserScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen
      name="ListingsUser"
      component={ListingsUserScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Messages"
      component={MessageScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
