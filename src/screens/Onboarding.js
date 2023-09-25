import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { DarkTheme, useLinkProps } from '@react-navigation/native';

const LinkButton = ({to,action, children, ...rest}) => {
  const {onPress, ...props} = useLinkProps({to,action})
  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
function Chatroom() {
  return <LinkButton to={{ screen: 'Chatroom'}}>Demo Chatroom</LinkButton>
}

const Onboarding = ({navigation}) => {
  return (
    <View style={{
      flex:1, backgroundColor:'darkgrey'}}>
      <View style={{
        alignItems:'center',
        backgroundColor:'white',
        flex:1,
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
                        Onboarding</Text>
      </View>
      <View style={{
        justifyContent:'space-evenly',
        alignItems:'center',
        flex:1
      }}>
        <Chatroom/>
      </View>
    </View>
    
  )
}

export default Onboarding

const styles = StyleSheet.create({})