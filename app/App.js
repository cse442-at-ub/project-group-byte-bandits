import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Onboarding/Onboarding/Login";
import Register from "./src/screens/Onboarding/Onboarding/Register";
import EmailorUsernameLogin from "./src/screens/Onboarding/Onboarding/emailOrUsernameLogin";
import EmailRegister from "./src/screens/Onboarding/Onboarding/emailRegister";
import HomePageSocial from "./src/screens/Homepage/HomePageSocial";
import HomePageNearby from "./src/screens/Homepage/HomePageNearby";
import Settings from "./src/screens/Settings/Settings";
import UserDashboard from "./src/screens/Settings/UserDashboard";
import GetUsername from "./src/screens/Onboarding/GetUsername";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // will be added in future for global user state
    // <UserContext.Provider value={{ /* your value here */ }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false, gestureEnabled: false }}
          component={Login}
        />
        <Stack.Screen
          name="HomePageSocial"
          options={{
            headerShown: false,
            animation: "none",
            gestureEnabled: true,
          }}
          component={HomePageSocial}
        />
        <Stack.Screen
          name="HomePageNearby"
          options={{
            headerShown: false,
            animation: "none",
            gestureEnabled: false,
          }}
          component={HomePageNearby}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false, gestureEnabled: false }}
          component={Register}
        />
        <Stack.Screen
          name="EmailorUsernameLogin"
          options={{ headerShown: false, gestureEnabled: false }}
          component={EmailorUsernameLogin}
        />
        <Stack.Screen
          name="EmailRegister"
          options={{ headerShown: false, gestureEnabled: false }}
          component={UsernameRegister}
        />
                <Stack.Screen
          name="GetUsername"
          options={{ headerShown: false, gestureEnabled: false }}
          component={GetUsername}
        />
        <Stack.Screen
          name="UserDashboard.js"
          options={{ headerShown: false, gestureEnabled: false }}
          component={UserDashboard}
        />
        <Stack.Screen
          name="Settings"
          options={{ headerShown: false, gestureEnabled: false }}
          component={Settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </UserContext.Provider>
  );
};

export default App;
