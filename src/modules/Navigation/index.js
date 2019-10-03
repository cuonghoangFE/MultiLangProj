import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../Home';
import SettingsScreen from '../Settings';
import AboutScreen from '../About';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Settings: {
    screen: SettingsScreen
  },
  About: {
    screen: AboutScreen
  }
});

export default createAppContainer(TabNavigator);
