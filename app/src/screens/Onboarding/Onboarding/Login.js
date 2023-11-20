import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import theme from '../../../components/theme'; 
import * as AppleAuthentication from "expo-apple-authentication";
import axios from "axios";
import qs from "qs";
import { logIn } from "../../../../redux/user";
import { secure_login, handle_auto_login } from "../../../bubble_api/bubble_api";

const Login = ({ navigation }) => {
  const scheme = useColorScheme();
  const colors = theme(scheme);
  const dispatch = useDispatch();
  
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  async function SecureLogin() {
    const data = await secure_login(emailOrUsername, password);
    console.log(data.response);
    setErrorMessage(data.response);
    if (data == '') {
      navigation.navigate("HomePage");
    }
  };



  /*const fetchAppleInfo = async () => {
    try {
      const response = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const apple_user = response.user;
      const data = qs.stringify({
        apple_user: apple_user,
      });
      const csrf_response = await axios.get("https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/generate_csrf");
      csrf_data = csrf_response.data;
      response = await axios.post(
        "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/apple_login",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Csrf-Token": csrf_data.csrf_token,
          },
        }
      );
      // if valid data was entered, navigate user to HomePage
      console.log(response.data);

      if (response.data == '') {
        navigation.navigate("HomePage")
      }
    } catch (error) {
      if (error.code === "ERR_REQUEST_CANCELED") {
        console.log("Error while fetching apple data");
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };*/

  return (
    <>
    
      <KeyboardAvoidingView
        onLayout={() => handle_auto_login(navigation)}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container,  { backgroundColor: colors.background }]}>
        <View style={[styles.content]}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome back,</Text>
          <Text style={[styles.subtitle, { color: colors.subText }]}>It's good to see you again. Sign in to start chatting!</Text>
          <View style={[styles.individualInputContainer, { backgroundColor: 'transparent', borderColor: colors.secondary }]}>

          <TextInput
            placeholder="Email Address"
            keyboardType='email-address'
            placeholderTextColor='gray'
            style={[styles.textInput, { color: colors.text }]}
            value={emailOrUsername}
            onChangeText={setEmailOrUsername} 
          />
          
          </View>
          <View style={[styles.individualInputContainer, { backgroundColor: 'transparent', borderColor: colors.secondary }]}>
          <TextInput
            placeholder="Password"
            placeholderTextColor='gray'
            secureTextEntry
            style={[styles.textInput, { color: colors.text }]}
            value={password}
            onChangeText={setPassword} 
          />

          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.buttonBackground }]}
            onPress={() => SecureLogin()} 
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Log In</Text>
          </TouchableOpacity>

          {errorMessage ? (
            <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10, }}>
              {errorMessage}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')} // Navigate to the register screen
            style={styles.loginPromptContainer}
          >
            <Text style={[styles.loginPrompt, { color: colors.primary }]}>
              Don't have an account? Sign up here
            </Text>
          </TouchableOpacity>
          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={[styles.orText, { color: colors.subText }]}>OR</Text>
            <View style={styles.line} />
          </View>

          {/*<AppleAuthentication.AppleAuthenticationButton
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            cornerRadius={5}
            style={styles.appleButton}
            onPress={fetchAppleInfo}
          />*/}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  individualInputContainer: {
    borderRadius: 10, // Changed to 1
    padding: 20,
    marginBottom: 10, // Adjust space between input fields
    borderWidth: 1,
  },
  textInput: {
    fontSize: 16,
  },
  button: {
    marginTop: 15,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15, 
    justifyContent: 'center',
  },
  line: {
    flex: .1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 8,
  },
  appleButton: {
    height: 50,
    width: '100%',
    alignSelf: 'center'
  },
  loginPromptContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  loginPrompt: {
    fontSize: 14,
    fontWeight: '500',
  },
});
