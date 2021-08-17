import { Navigation } from 'react-native-navigation';

const introScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

const login = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

const mainTab = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

export function showConfirmAlert(options = {}) {
  Navigation.showOverlay({
    component: {
      name: 'ConfirmAlert',
      options: {
        overlay: {
          interceptTouchOutside: true,
        },
        layout: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        statusBar: {
          style: 'light',
        },
      },
      passProps: options,
    },
  });
}

export default {
  introScreen,
  login,
  mainTab,
};
