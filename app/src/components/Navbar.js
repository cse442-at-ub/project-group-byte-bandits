// NavBar.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import theme from './theme';

const NavBar = ({ navigation, currentScreen }) => {
  const scheme = useColorScheme();
  const colors = theme(scheme);

  return (
    <View style={[styles.navBar, { backgroundColor: colors.widget }]}>
    <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
        <FontAwesome
          name="home"
          size={32}
          color={currentScreen === 'HomePage' ? colors.primary : colors.secondary}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('UserDashboard')}>
        <AntDesign
          name="user"
          size={32}
          color={currentScreen === 'UserDashboard' ? colors.primary : colors.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 30,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0, // Changed this line to 0
      },
  });

export default NavBar;
