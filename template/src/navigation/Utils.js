import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import Fonts from '../Utils/Fonts';
import Colors from '../Utils/Colors';
import Root from './Root';

const SIDE_MENU_ID = 'sideMenu';
const SCREEN_OVERLAY = {
  android: 'overCurrentContext',
  ios: 'overFullScreen',
};

export const defaultBottomTab = {
  textColor: Colors.tabInActiveColor,
  iconColor: Colors.tabInActiveColor,
  selectedIconColor: Colors.tabActiveColor,
  selectedTextColor: Colors.tabActiveColor,
  fontFamily: Fonts.type.regular,
  iconInsets: {
    top: 3,
    left: 0,
    bottom: 0,
    right: 0,
  },
  fontSize: 10,
  drawBehind: true,
  disableIconTint: true, // set true if you want to disable the icon tinting
  disableSelectedIconTint: true,
};

export const defaultTopBar = {
  visible: true,
  drawBehind: false,
  hideOnScroll: false,
  noBorder: true, // no border for ios
  elevation: 0, // no border for android
  title: {
    fontFamily: Fonts.type.semiBold,
    alignment: 'center',
    fontSize: 16,
  },
  background: {
    color: Colors.default,
  },
};

class NavigationUtils {
  sideMenuVisible = false;

  currentScreenId = '';

  showingOverlay = false;

  constructor() {
    Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
      if (componentId === 'inAppNotification' || componentId === 'defaultOverlay') {
        return;
      }
      console.log(componentId);

      this.currentScreenId = componentId;
    });

    Navigation.events().registerComponentDidDisappearListener(({ componentId }) => {
      if (componentId === SIDE_MENU_ID) {
        this.sideMenuVisible = false;
      }
      console.log();
    });

    Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
      if (buttonId === 'backBtt') {
        Navigation.pop(this.currentScreenId);
      }
      if (buttonId === 'closeBtt') {
        this.dismissModal();
      }
      if (buttonId === 'SideMenu') {
        this.openSideMenu();
      }
    });

    Navigation.events().registerModalDismissedListener((item) => {
      this.currentScreenId = this.backupCurrentScreenId[this.backupCurrentScreenId.length - 1];
      this.backupCurrentScreenId.pop();
    });

    this.allowPush = true;
    this.allowModal = true;
  }

  openSideMenu() {
    this.push({ screen: 'Menu', isTopBarEnable: false });
  }

  closeSideMenu() {
    this.sideMenuVisible = false;
    Navigation.mergeOptions(SIDE_MENU_ID, {
      sideMenu: {
        left: {
          visible: false,
          enabled: true,
        },
      },
    });
  }

  toggleSizeMenu() {
    this.sideMenuVisible = !this.sideMenuVisible;
    Navigation.mergeOptions(SIDE_MENU_ID, {
      sideMenu: {
        left: {
          visible: this.sideMenuVisible,
          enabled: true,
        },
      },
    });
  }

  startIntoContent() {
    Root.introScreen();
  }

  startLoginContent() {
    // Root.introScreen();
    Root.login();
    // Navigation.setRoot(routes.rootLoginRoute);
  }

  startMainContent(profileScreen) {
    Root.mainTab();
    // Root.mainTab(profileScreen);
  }

  push({
    id,
    screen,
    title,
    passProps,
    isBack = true,
    isTopBarEnable,
    leftButtons,
    rightButtons,
    noBorder,
    isBottomTabsEnable = false,
  }) {
    if (this.allowPush) {
      this.allowPush = false;
      setTimeout(() => {
        this.allowPush = true;
      }, 500);
      Navigation.push(this.currentScreenId, {
        component: {
          name: screen,
          id: id,
          passProps,
          options: {
            bottomTabs: {
              visible: isBottomTabsEnable,
              drawBehind: !isBottomTabsEnable,
            },
            topBar: {
              visible: isTopBarEnable,
              drawBehind: false,
              noBorder: noBorder || true,
              title: {
                text: title,
                fontSize: 16,
                color: 'white',
                fontFamily: Fonts.type.bold,
              },
              background: {
                color: Colors.primary,
              },
              buttonColor: 'white',
              leftButtons: isBack
                ? [
                    {
                      id: 'backBtt',
                      text: 'Back',
                      // icon: Images.icBack,
                      color: Platform.OS === 'android' ? 'white' : '',
                    },
                  ]
                : leftButtons || [],
              rightButtons: rightButtons || [],
            },
          },
        },
      });
    }
  }

  pop = () => {
    Navigation.pop(this.currentScreenId);
  };

  popToRoot = () => {
    Navigation.popToRoot(this.currentScreenId);
  };

  showModal = ({ screen, title, isClose, isSave, rightButtons = [], passProps }) => {
    if (this.allowModal) {
      this.allowModal = false;
      setTimeout(() => {
        this.allowModal = true;
      }, 300);

      if (isSave) {
        rightButtons = [
          {
            id: 'doneBtt',
            text: 'Save',
            color: Colors.primary,
          },
        ];
      }
      if (!_.isArray(this.backupCurrentScreenId)) {
        this.backupCurrentScreenId = [];
        this.backupCurrentScreenId.push(this.currentScreenId);
      } else {
        this.backupCurrentScreenId.push(this.currentScreenId);
      }
      Navigation.showModal({
        stack: {
          children: [
            {
              component: {
                name: screen,
                passProps,
                options: {
                  topBar: {
                    visible: true,
                    noBorder: true,
                    buttonColor: 'black',
                    title: {
                      text: title,
                    },
                    leftButtons: isClose
                      ? [
                          {
                            id: 'closeBtt',
                            text: 'Close',
                            // icon: iconsMap['ios-close'],
                            color: 'black',
                          },
                        ]
                      : [],
                    rightButtons,
                  },
                },
              },
            },
          ],
        },
      });
    }
  };

  dismissModal() {
    Navigation.dismissModal(this.currentScreenId);
  }

  showLoading = () => {
    Navigation.showModal({
      component: {
        name: 'Loading',
        options: {
          overlay: {
            interceptTouchOutside: false,
          },
          layout: {
            componentBackgroundColor: 'transparent',
            backgroundColor: 'transparent',
          },
          screenBackgroundColor: 'transparent',
          modalPresentationStyle: SCREEN_OVERLAY[Platform.OS],
          animations: {
            showModal: {
              enabled: false,
            },
            dismissModal: {
              enable: false,
              enabled: false,
            },
          },
        },
      },
    });
  };

  dismissLoading = () => {
    Navigation.dismissModal(this.currentScreenId, {
      animations: {
        showModal: {
          enabled: false,
        },
        dismissModal: {
          enable: false,
          enabled: false,
        },
      },
    });
  };

  resetTo = (componentId, { isTopBarEnable, title }) => {
    Navigation.setStackRoot(this.homeScreen, {
      component: {
        name: componentId,
        options: {
          animations: {
            setStackRoot: {
              enable: false,
            },
          },
          topBar: {
            visible: isTopBarEnable,
            title: {
              text: title,
            },
            buttonColor: 'black',
            leftButtons: [
              {
                id: 'menuBtt',
                text: 'Menu',
                color: 'black',
              },
            ],
          },
          layout: {
            backgroundColor: 'white',
            orientation: ['landscape'], // An array of supported orientations
          },
        },
      },
    });
  };

  showInAppNotification = ({ title, content, type, duration, isAutoDismiss }) => {
    if (this.showingOverlay) {
      Navigation.dismissOverlay('inAppNotification');
    }
    this.showingOverlay = true;
    Navigation.showOverlay({
      component: {
        id: 'inAppNotification',
        name: 'InAppNotification',
        passProps: {
          title,
          content,
          type,
          duration,
          isAutoDismiss,
        },
        options: {
          layout: {
            componentBackgroundColor: 'transparent',
          },
          overlay: {
            interceptTouchOutside: true,
          },
        },
      },
    });
  };

  dismissInAppNotification = () => {
    this.showingOverlay = false;
    Navigation.dismissOverlay('inAppNotification');
  };

  showOverlay = ({ screen, interceptTouchOutside }) => {
    Navigation.showOverlay({
      component: {
        id: 'overlay',
        name: screen,
        passProps: {},
        options: {
          overlay: {
            interceptTouchOutside: interceptTouchOutside || false,
          },
        },
      },
    });
  };

  dismissOverlay = () => {
    Navigation.dismissOverlay('overlay');
  };
}

export default new NavigationUtils();
