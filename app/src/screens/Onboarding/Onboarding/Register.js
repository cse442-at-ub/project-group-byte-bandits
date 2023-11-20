import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import theme from '../../../components/theme'; 
import { Header } from 'react-native-elements';
import {Entypo} from '@expo/vector-icons'
import * as AppleAuthentication from "expo-apple-authentication";
import axios from "axios";
import qs from "qs";
import { logIn } from "../../../../redux/user";
import { secure_signup } from "../../../bubble_api/bubble_api";

const Register = ({navigation}) => {
  const scheme = useColorScheme();
  const colors = theme(scheme);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  async function SecureSignup() {
    const data = await secure_signup(email, password, confirmPassword);
    console.log(data.response);
    setErrorMessage(data.response);
    if (data == '') {
      navigation.navigate("GetUsername");
    }
  }

  // function for fetching apple info
  const fetchAppleInfo = async () => {
    try {
      const response = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const apple_user = response.user;
      const email = response.email;

      try {
        const data = qs.stringify({
          user_email: email,
          apple_user: apple_user,
        });
        const response = await axios.post(
          "https://cse.buffalo.edu/~jjalessi/auth/apple_register",
          data,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        // if apple information was successfully updated in database, send user to GetUsername

        // SETTING USERID into REDUX
        dispatch(logIn(response.data.user_info.user_id));

        setErrorMessage("");
        navigation.navigate("GetUsername");
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    } catch (error) {
      if (error.code === "ERR_REQUEST_CANCELED") {
        console.log("Error while fetching apple data");
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

 
  return (
    <>
    <Header
        leftComponent={
          <Entypo 
            name="chevron-with-circle-left" 
            size={32} 
            color={colors.primary} 
            onPress={() => {navigation.goBack()}}
          />
        }
        containerStyle={{
          backgroundColor: colors.background,
          borderBottomWidth: 0,
        }}
      />
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container,  { backgroundColor: colors.background }]}>
      <View style={[styles.content]}>
        <Text style={[styles.title, { color: colors.text }]}>Let's get you signed up.</Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>Start chatting with bubble today!</Text>
        <View style={[styles.individualInputContainer, { backgroundColor: 'transparent', borderColor: colors.secondary }]}>
        <TextInput
    placeholder="Email Address"
    keyboardType='email-address'
    placeholderTextColor='gray'
    style={[styles.textInput, { color: colors.text }]}
    value={email}
    onChangeText={setEmail} 
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
        <View style={[styles.individualInputContainer, { backgroundColor: 'transparent', borderColor: colors.secondary }]}>
        <TextInput
    placeholder="Confirm Password"
    placeholderTextColor='gray'
    secureTextEntry
    style={[styles.textInput, { color: colors.text }]}
    value={confirmPassword}
    onChangeText={setConfirmPassword}
  />
        </View>

        <TouchableOpacity
    style={[styles.button, { backgroundColor: colors.buttonBackground }]}
    onPress={SecureSignup} 
  >
    <Text style={[styles.buttonText, { color: colors.buttonText }]}>Sign Up</Text>

  </TouchableOpacity>

  {errorMessage ? (
    <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10, }}>
      {errorMessage}
    </Text>
  ) : null}

        <TouchableOpacity
  onPress={() => navigation.navigate('Login')} // Replace 'Login' with your login screen's route name
  style={styles.loginPromptContainer}
>
  <Text style={[styles.loginPrompt, { color: colors.primary }]}>
    Already have an account? Login here
  </Text>
</TouchableOpacity>
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={[styles.orText, { color: colors.subText }]}>OR</Text>
          <View style={styles.line} />
        </View>


        <AppleAuthentication.AppleAuthenticationButton
    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
    cornerRadius={5}
    style={styles.appleButton}
    onPress={fetchAppleInfo}
/>
              </View>
            </KeyboardAvoidingView>
</>
  );
};

export default Register;

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
