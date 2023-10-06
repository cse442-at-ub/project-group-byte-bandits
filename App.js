import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./src/screens/Onboarding";
// import { UserContext } from "./src/context/UserContext";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // will be added in future for global user state
    // <UserContext.Provider value={{ /* your value here */ }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={Onboarding}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </UserContext.Provider>
  );
};

export default App;
