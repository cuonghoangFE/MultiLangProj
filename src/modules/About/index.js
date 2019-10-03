import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withTranslation } from '../Language';

const AboutScreen = ({ t, language, updateLanguage }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>About!</Text>
    <View style={{height: 50}} />
    <TouchableOpacity
      onPress={() => updateLanguage(language === 'en' ? 'vi' : (language === 'vi' ? 'it' : 'en'))}>
      <Text>{t('change')}</Text>
    </TouchableOpacity>
    <View style={{height: 50}} />
    <Text>{t('common.currentLanguage', { lng: language })}</Text>
  </View>
);

export default withTranslation(AboutScreen);
