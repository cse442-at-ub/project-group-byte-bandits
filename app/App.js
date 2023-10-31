import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Onboarding/Onboarding/Login";
import Register from "./src/screens/Onboarding/Onboarding/Register";
import UsernameLogin from "./src/screens/Onboarding/Onboarding/usernameLogin";
import UsernameRegister from "./src/screens/Onboarding/Onboarding/usernameRegister";
import HomePageSocial from "./src/screens/Homepage/HomePageSocial";
import HomePageNearby from "./src/screens/Homepage/HomePageNearby";
import Settings from './src/screens/Settings/Settings'
import UserDashboard from "./src/screens/Settings/UserDashboard";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // will be added in future for global user state
    // <UserContext.Provider value={{ /* your value here */ }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="HomePageSocial"
          options={{ headerShown: false, animation: "none" }}
          component={HomePageSocial}
        />
        <Stack.Screen
          name="HomePageNearby"
          options={{ headerShown: false, animation: "none" }}
          component={HomePageNearby}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={Register}
        />
        <Stack.Screen
          name="UsernameLogin"
          options={{ headerShown: false }}
          component={UsernameLogin}
        />
        <Stack.Screen
          name="UsernameRegister"
          options={{ headerShown: false }}
          component={UsernameRegister}
        />
        <Stack.Screen name = "UserDashboard.js" options = {{headerShown: false}} component = {UserDashboard} />
        <Stack.Screen name = "Settings" options = {{headerShown: false}} component = {Settings} />
      </Stack.Navigator>
    </NavigationContainer>
    // </UserContext.Provider>
  );
};

export default App;
