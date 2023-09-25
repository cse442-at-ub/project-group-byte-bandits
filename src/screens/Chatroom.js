import { StyleSheet, Text,Button, View, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { useLinkProps } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from "react";


const LinkButton = ({to,action, children, ...rest}) => {
  const {onPress, ...props} = useLinkProps({to,action})
  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};
function Read_messages() {
    const url = "https://cse.buffalo.edu/~jderosa3/xhr_demo/recieve_xhr.php"
    const [rows, setRows] = useState();
    useEffect(() => {
        async function xhr_request() {
            response = await fetch(url);
            return await response.json();
        }
        xhr_request().then((rows) => setRows(rows))
    });
    return (
        <Text>{rows}</Text>
    )
}

const SendMessage = () => {
    const url = "https://cse.buffalo.edu/~jderosa3/xhr_demo/recieve_xhr.php"
    const [message, Setmessage] = useState('');
    function Send_message() {
        var xhr = new XMLHttpRequest();
        const request = "content=" + message;      // forming html post request
        xhr.addEventListener('load', function (event) {
            console.log("data sent");
        });
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(request);
    }
    return (
        <View>
            <TextInput value={message} onChangeText={Setmessage} style={styles.input} placeholder="Enter your data"/>
            <Button title="send message" onPress={Send_message}/>
        </View>
    );
}
const Chatroom = ({navigation}) => {
    return (
    <View>
        <Read_messages to={{ screen: 'Chatroom'}}/>
        <SendMessage to={{ screen: 'Chatroom'}}></SendMessage>
    </View>
    )
}

export default Chatroom
const styles = StyleSheet.create({})