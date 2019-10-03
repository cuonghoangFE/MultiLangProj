import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { withTranslation } from 'react-i18next';
import { withTranslation, TFunction } from '../Language';
import { compose } from 'recompose'
import withNavigationEventsHOC from '../Navigation/withNavigationEvents';

interface TProps {
  t: TFunction
  language: String
  updateLanguage: Function
}

const HomeScreen = ({ t, language, updateLanguage }: TProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <View style={{height: 50}} />
      <TouchableOpacity onPress={() => updateLanguage(language === 'en' ? 'vi' : (language === 'vi' ? 'it' : 'en'))}>
        <Text>{t('change')}</Text>
      </TouchableOpacity>
      <View style={{height: 50}} />
      <Text style={{ fontSize: 20, marginBottom: 20 }}>{t('hello', { world: language === 'en' ? 'en world' : (language === 'vi' ? 'vi world' : 'it world')}) } )}</Text>
    </View>
  );
}

export default compose(
  withTranslation,
  withNavigationEventsHOC({
    onWillFocus: props => () => {
      console.log('on will focus');
    },
    onDidFocus: props => () => {
      console.log('on did focus');
    },
    onWillBlur: props => () => {
      console.log('on will blur');
    },
    onDidBlur: props => () => {
      console.log('on did blur');
    }
  })
)(HomeScreen);
