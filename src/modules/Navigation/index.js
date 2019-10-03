import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../Home';
import SettingsScreen from '../Settings';
import AboutScreen from '../About';
import Libi18n from '../Libi18n';
import Libi18n2 from '../Libi18n2';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Settings: {
    screen: SettingsScreen
  },
  About: {
    screen: AboutScreen
  },
  Libi18n: {
    screen: Libi18n
  },
  Libi18n2: {
    screen: Libi18n2
  }
});

export default createAppContainer(TabNavigator);
