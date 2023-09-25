import { StyleSheet, Text,Button, View, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { useLinkProps } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form';

const LinkButton = ({to,action, children, ...rest}) => {
  const {onPress, ...props} = useLinkProps({to,action})
  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
function Home() {
  return <LinkButton to={{ screen: 'Login'}}>Login</LinkButton>
}
const RegisterForm = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <View>
      <Text style={styles.title}>Forms</Text>
      <Controller
        control={control}
        name="register"
        render={({ field }) => <TextInput {...field} style={styles.input} placeholder="Enter your data"/>}
        />
      <Button title="submit" onpress={handleSubmit(onSubmit)}/>
    </View>
  )
}
const Chatroom = ({navigation}) => {
  return (
    <View style={{
      flex:1, backgroundColor:'darkgrey'}}>
      <View style={{
        alignItems:'center',
        backgroundColor:'white',
        flex:6,
        borderRadius:30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
      }}>
        <Text style={{fontSize:20, 
                      marginTop:50}}>
                        Register</Text>
        <RegisterForm/>
      </View>
    </View>
  )
}

export default Chatroom

const styles = StyleSheet.create({})