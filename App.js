import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Onboarding/Login";
import Register from "./src/screens/Onboarding/Register";
// import { UserContext } from "./src/context/UserContext";

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
          name="Register"
          options={{ headerShown: false }}
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </UserContext.Provider>
  );
};

export default App;
