import { Navigation } from 'react-native-navigation';
import { startUp } from '../redux/AppRedux/operations';
import { store, withReduxProvider } from '../redux/store';
import Home from '../screen/Home';
import Login from '../screen/Login';

const SCREENS_WITH_REDUX = {
  Login,
  Home,
};
const SCREENS = {};

function registerScreens() {
  Object.keys(SCREENS_WITH_REDUX).map((screenName) => {
    Navigation.registerComponent(
      screenName,
      () => withReduxProvider(SCREENS_WITH_REDUX[screenName]),
      () => SCREENS_WITH_REDUX[screenName],
    );
  });
  Object.keys(SCREENS).map((screenName) => {
    Navigation.registerComponent(
      screenName,
      () => SCREENS_WITH_REDUX[screenName],
      () => SCREENS_WITH_REDUX[screenName],
    );
  });
  store.dispatch(startUp());
}

export default registerScreens;
