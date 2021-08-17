import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import registerScreens from './navigation/RegisterScreens';
import { store } from './redux/store';
import { startUp } from './redux/AppRedux/operations';

const App = () => {
  useEffect(() => {
    if (store?.getState().nav.initSuccess) {
      store.dispatch(startUp());
    } else {
      registerScreens();
    }
    setTimeout(() => {
      Platform.OS === 'android' && RNBootSplash.hide();
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color="black" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
