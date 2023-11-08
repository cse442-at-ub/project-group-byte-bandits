import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Onboarding/Onboarding/Login";
import Register from "./src/screens/Onboarding/Onboarding/Register";
import EmailorUsernameLogin from "./src/screens/Onboarding/Onboarding/emailOrUsernameLogin";
import HomePage from "./src/screens/Homepage/HomePage";
import Settings from "./src/screens/Settings/Settings";
import UserDashboard from "./src/screens/Settings/UserDashboard";
import GetUsername from "./src/screens/Onboarding/GetUsername";
import EmailRegister from "./src/screens/Onboarding/Onboarding/emailRegister";
import { Chatroom } from "./src/screens/Chatroom/Chatroom";
import { ChatroomUsers } from "./src/screens/Chatroom/ChatroomUsers";
import store from "./redux/configureStore";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="Login"
            options={{ headerShown: false, gestureEnabled: false }}
            component={Login}
          /> */}
          <Stack.Screen
            name="HomePage"
            options={{
              headerShown: false,
              animation: "none",
              gestureEnabled: false,
            }}
            component={HomePage}
          />
          <Stack.Screen
            name="Chatroom"
            options={{
              headerShown: false,
              animation: "slide_from_left",
              gestureEnabled: false,
            }}
            component={Chatroom}
          />
          <Stack.Screen
            name="ChatroomUsers"
            options={{
              headerShown: false,
              animation: "slide_from_right",
              gestureEnabled: false,
            }}
            component={ChatroomUsers}
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
            component={EmailRegister}
          />
          <Stack.Screen
            name="GetUsername"
            options={{ headerShown: false, gestureEnabled: false }}
            component={GetUsername}
          />
          <Stack.Screen
            name="UserDashboard"
            options={{
              headerShown: false,
              gestureEnabled: true,
              animation: "slide_from_left",
            }}
            component={UserDashboard}
          />
          <Stack.Screen
            name="Settings"
            options={{
              headerShown: false,
              gestureEnabled: true,
              animation: "slide_from_right",
            }}
            component={Settings}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
