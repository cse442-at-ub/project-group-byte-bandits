const lightTheme = {
    background: '#F6F6F6',
    text: '#6E9DF7',
    subText: '#505151',
    primary: '#6E9DF7',
    secondary: '#4B4B4B',
    buttonBackground: '#6E9DF7',
    buttonText: '#FFFFFF',
    widget: '#F6F6F6',
    homeBackground: '#6E9DF7',
    iconColor: '#F6F6F6',
    modalBackground: '#FFFFFF',
    modalText: '#000000',
    modalInputBackground: '#F0F0F0',
    modalButtonBackground: '#6E9DF7',
  };
  
  const darkTheme = {
    background: '#303438',
    text: '#FFF1DD',
    subText: '#BFBEBE',
    primary: '#FFF1DD',
    secondary: '#BFBEBE',
    buttonBackground: '#D9D9D9',
    buttonText: '#394F7A',
    widget: '#1A1919',
    homeBackground: '#303438',
    iconColor: '#BFBEBE',
    modalBackground: '#424242',
    modalText: '#FFF1DD',
    modalInputBackground: '#303030',
    modalButtonBackground: '#5A5A5A',
  };
  
  const theme = mode => (mode === 'light' ? lightTheme : darkTheme);
  
  export default theme;
  