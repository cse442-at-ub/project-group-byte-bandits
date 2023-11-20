// DMList.js
import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native';
import { ListItem, Avatar, Header } from 'react-native-elements';
import { useColorScheme } from 'react-native';
import theme from '../../components/theme';
import { Ionicons } from '@expo/vector-icons';


const users = [
  { id: '1', name: 'Alice', avatar: 'https://placeimg.com/140/140/any' },
  { id: '2', name: 'Bob', avatar: 'https://placeimg.com/140/140/any' },
  { id: '3', name: 'Charlie', avatar: 'https://placeimg.com/140/140/any' },
];

const DMList = ({ navigation }) => {
    const scheme = useColorScheme();
    const colors = theme(scheme);
  
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('DM', { user: item })}>
        <ListItem 
          bottomDivider 
          containerStyle={[styles.listItemContainer, { backgroundColor: colors.background }]}
          pad={20}
        >
          <Avatar 
            rounded 
            source={{ uri: item.avatar }} 
            containerStyle={styles.avatar}
          />
          <ListItem.Content>
            <ListItem.Title style={{ color: colors.text }}>{item.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={colors.text} />
        </ListItem>
      </TouchableOpacity>
    );
  
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header
          placement="left"
          leftComponent={{ icon: 'chevron-left', color: colors.iconColor, onPress: () => navigation.goBack() }}
          centerComponent={{ text: 'Direct Messages', style: { color: colors.text, fontSize: 16, fontWeight: 'bold' } }}
          containerStyle={[styles.header, { backgroundColor: colors.widget, borderBottomWidth: 0 }]}
        />
        <FlatList
          keyExtractor={item => item.id}
          data={users}
          renderItem={renderItem}
        />
        <TouchableOpacity   style={[styles.fab, { backgroundColor: colors.iconColor }]} >
          <Ionicons name="add" size={30} color={colors.background} />
        </TouchableOpacity>
      </View>
    );
  };
  
  export default DMList;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom: 10,
        elevation: 10,
        borderBottomWidth: 0,
        alignItems: 'center',
      },
    listItemContainer: {
      borderRadius: 10,
      marginVertical: 4,
      borderBottomWidth: 0,
    },
    avatar: {
      borderRadius: 25,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      borderRadius: 30,
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowColor: '#000',
      shadowOffset: { height: 2, width: 0 },
    },
  });
