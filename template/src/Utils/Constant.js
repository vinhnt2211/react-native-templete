import { Dimensions } from 'react-native';

const EVENTS = {
  STORE_LOAD_SUCCESSFUL: 'STORE_LOAD_SUCCESSFUL',
};

const { height: SCREEN_WIDTH, width: SCREEN_HEIGHT } = Dimensions.get('window');

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  EVENTS,
};
