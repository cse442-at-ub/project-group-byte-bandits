import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./src/screens/Onboarding/Onboarding/OnboardingScreen";
import Login from "./src/screens/Onboarding/Onboarding/Login";
import Register from "./src/screens/Onboarding/Onboarding/Register";
import EmailorUsernameLogin from "./src/screens/Onboarding/Onboarding/emailOrUsernameLogin";
import HomePage from "./src/screens/Homepage/HomePage";
import Settings from "./src/screens/Settings/Settings";
import UserDashboard from "./src/screens/Settings/UserDashboard";
import GetUsername from "./src/screens/Onboarding/GetUsername";
import EmailRegister from "./src/screens/Onboarding/Onboarding/emailRegister";
import { Chatroom } from "./src/screens/Chatroom/Chatroom";
import { ChatroomUsers } from "./src/screens/Chatroom/ChatroomUsers"
import store from "./redux/configureStore";
import { Provider } from "react-redux";
import DM from "./src/screens/DM/DM";
import DMList from "./src/screens/DM/DMList";
import Notification from "./src/screens/Notification/Notification";
import { ChatroomTemp } from "./src/screens/Chatroom/ChatroomTemp";
import CreateChatroom from "./src/screens/Homepage/CreateChatroom";
import DeleteAccount from "./src/screens/Settings/DeleteAccount";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false, gestureEnabled: false }}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false, gestureEnabled: false }}
            component={Login}
          />
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
              gestureEnabled: true,
            }}
            component={ChatroomTemp}
          />
          <Stack.Screen
            name="ChatroomUsers"
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
              gestureEnabled: true,
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
            options={{ headerShown: false, gestureEnabled: true }}
            component={GetUsername}
          />
          <Stack.Screen
            name="UserDashboard"
            options={{
              headerShown: false,
              gestureEnabled: true,
              animation: "none",
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
          <Stack.Screen
            name="DMList"
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
            component={DMList}
          />
          <Stack.Screen
            name="DM"
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
            component={DM}
          />
          <Stack.Screen
            name="Notification"
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
            component={Notification}
          />
            <Stack.Screen
            name="CreateChatroom"
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
            component={CreateChatroom}
          />
          <Stack.Screen
            name="DeleteAccount"
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
            component={DeleteAccount}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
